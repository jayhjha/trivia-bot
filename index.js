const { App } = require('@slack/bolt');
const {
  TOKEN: token,
  SIGNING_SECRET: signingSecret,
} = require('config');

const trivia = require('./trivia');
const eventHandler = require('./eventHandler');

const app = new App({
  token,
  signingSecret,
});

(async () => {
  await eventHandler.handleMessage({ app });
  await trivia.scheduleTrivia({ app });
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
