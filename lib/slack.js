const {
  TOKEN: token,
  CHANNEL_ID: channelId,
} = require('config');

const logger = require('../logger');

const postMessage = async ({ app, text }) => {
  try {
    const result = await app.client.chat.postMessage({
      token,
      channel: channelId,
      text,
    });
    logger.debug(result);
  } catch (error) {
    logger.error('Error when posting message', error);
  }
};

const scheduleMessage = async ({ app, time, text }) => {
  try {
    const result = await app.client.chat.scheduleMessage({
      token,
      channel: channelId,
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
