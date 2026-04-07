const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const userRouter=require('./routes/userRoutes');
const taskRouter=require('./routes/taskRoutes');
const promiseErrorAndUncaught_funct = require('./utils/promiseErrorAndUncaughtError');
require('dotenv').config();

// Global error handlers: unhandled rejections & exceptions
promiseErrorAndUncaught_funct();

const app = express();
const PORT = process.env.PORT || 6000;

// Middleware 
app.use(express.json());

//Routes
app.use('/',(req,res)=>{
  res.setHeader('content-type','text/html')
  res.send('<h2>Welcome to smart-task-manager-api</h2>')
})
app.use('/users',userRouter)
app.use('/tasks',taskRouter)

// Connect to MongoDB & start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('MongoDB connected successfully');
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
  })
  .catch(err => logger.error(`MongoDB connection error: ${err}`));
