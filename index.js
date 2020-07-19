const { App } = require('@slack/bolt');
const {
  TOKEN: token,
  SIGNING_SECRET: signingSecret,
} = require('config');

const trivia = require('./lib/trivia');
const eventHandler = require('./lib/eventHandler');
const logger = require('./logger');

const app = new App({
  token,
  signingSecret,
});

(async () => {
  await eventHandler.handleMessage({ app });
  await trivia.startTrivia({ app });
  await app.start(process.env.PORT || 3000);

  logger.info('⚡️ Bolt app is running!');
})();
