// server.js
const express = require('express');
const mongoose = require('mongoose');

mongoose.set('toObject', { virtuals: true });
mongoose.set('toJSON', { virtuals: true });//these lines help to fully enable virtual populate globally.
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
// Session & Passport (MOVED UP - BEFORE ROUTES)
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
// Routes (NOW AFTER PASSPORT)
// --------------------
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);
app.use('/api-docs', swaggerRouter);
app.use('/auth', oAuthRouter);
app.use('/profile', profileRouter);

// Welcome route
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('<h2>Welcome to Smart Task Manager API </h2>');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server first
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));
