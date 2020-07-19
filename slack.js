const {
  TOKEN: token,
  CHANNEL_ID: channelId,
} = require('config');

const postMessage = async ({ app, text }) => {
  try {
    const result = await app.client.chat.postMessage({
      token,
      channel: channelId,
      text,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
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
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postMessage,
  scheduleMessage,
};
