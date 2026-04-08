// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Handle global errors
promiseErrorAndUncaught_funct();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*', // allow all if not specified
    credentials: true,
  })
);

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/api-docs', swaggerRouter);

// Welcome route
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('<h2>Welcome to Smart Task Manager API </h2>');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server first
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));
