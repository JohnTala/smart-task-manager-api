function promiseAndUncaught_funct() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('[UNHANDLED REJECTION at]:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (err) => {
    console.error('[UNCAUGHT EXCEPTION]:', err.stack || err);
    process.exit(1);
  });
}

module.exports = promiseAndUncaught_funct;
