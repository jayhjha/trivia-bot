const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'trivia-bot' });

module.exports = logger;
