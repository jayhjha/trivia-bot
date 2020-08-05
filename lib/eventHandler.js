const {
  CHANNEL_ID: channelId,
} = require('config');

const logger = require('../logger');
const { handleDirectMessages } = require('./questions');
const { handleTriviaAnswer } = require('./trivia');

const handleMessage = ({ app }) => {
  app.event('message', async ({ event }) => {
    logger.info('Incoming event %j', event);

    const {
      text,
      channel,
      channel_type: channelType,
    } = event;

    if (channelType === 'im') {
      handleDirectMessages({ app, event });
      return;
    }

    if (channelType === 'message' && channel === channelId) {
      logger.error('Incoming message from the wrong channel');
      return;
    }

    handleTriviaAnswer({ app, text });
  });
};

module.exports = {
  handleMessage,
};
