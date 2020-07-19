const triviaState = require('./triviaState');
const { postMessage } = require('./slack');
const logger = require('../logger');
const {
  scheduleNextQuestion,
  verifyAnswer,
} = require('./trivia');

const handleMessage = ({ app }) => {
  app.event('message', async ({ event }) => {
    logger.info('Incoming event %j', event);

    const {
      text,
    } = event;

    if (triviaState.isActive && verifyAnswer({ text })) {
      await postMessage({ app, text: `${text} is the correct answer :tada:` });
      await scheduleNextQuestion({ app });
    }
  });
};

module.exports = {
  handleMessage,
};
