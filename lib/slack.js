const {
  TOKEN: token,
} = require('config');

const logger = require('../logger');

const postMessage = async ({ app, text, channel }) => {
  try {
    const result = await app.client.chat.postMessage({
      token,
      channel,
      text,
    });
    logger.debug(result);
  } catch (error) {
    logger.error('Error when posting message', error);
  }
};

const scheduleMessage = async ({
  app, channel, time, text,
}) => {
  try {
    const result = await app.client.chat.scheduleMessage({
      token,
      channel,
      post_at: time,
      text,
    });
    logger.debug(result);
  } catch (error) {
    logger.error('Error when scheduling message', error);
  }
};

module.exports = {
  postMessage,
  scheduleMessage,
};
