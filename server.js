const express = require('express');
const mongoose = require('mongoose');

// This ensures that virtual fields are included when converting documents to plain JavaScript objects
mongoose.set('toObject', { virtuals: true });

// This ensures that virtual fields are included when converting documents to JSON (e.g. API responses)
mongoose.set('toJSON', { virtuals: true });


const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('./config/passport-setup');
require('dotenv').config();

// Utils & middleware
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const promiseErrorAndUncaught_funct = require('./utils/promiseErrorAndUncaughtError');

// Routes
const swaggerRouter = require('./swagger');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const commentRouter = require('./routes/commentRoutes');
const oAuthRouter = require('./routes/oAuthRoutes');
const profileRouter = require('./routes/profileRoutes');

// Handle global errors
promiseErrorAndUncaught_funct();

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

// Trust proxy for Render (HTTPS)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// --------------------
// Session & Passport 
// --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Routes
// --------------------
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);
app.use('/api-docs', swaggerRouter);
app.use('/auth', oAuthRouter);
app.use('/profile', profileRouter);

// Welcome route
//Keeping one homepage to avoid anyconfusion
app.get('/', (req, res) => {
  res.redirect('/auth');
});


// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// --------------------
// CONDITIONAL START 
// --------------------
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

// --------------------
// CONDITIONAL DB CONNECT 
// --------------------
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => logger.info('MongoDB connected successfully'))
    .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));
}

// Export app for testing
module.exports = app;
