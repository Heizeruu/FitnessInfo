// backend/logger/logger.js
const log = (level, message) => {
    console.log(`[${level.toUpperCase()}] ${message}`);
  };
  
  module.exports = {
    info: (message) => log('info', message),
    warn: (message) => log('warn', message),
    error: (message) => log('error', message),
  };
  