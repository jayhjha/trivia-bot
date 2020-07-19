const {
  scheduleMessage,
} = require('./slack');

const triviaState = require('./triviaState');

const questions = require('./questions.json');

const START_TIME = '1595182620';
const INTERVAL = 10;

const scheduleTrivia = async ({ app }) => {
  // Schedule the first notification for start time.
  await scheduleMessage({
    app,
    time: START_TIME,
    text: `Trivia starts in ${INTERVAL} seconds`,
    as_user: true,
  });

  const { question } = questions[0];
  // Schedule the first question, which is INTERVAL after the first notification
  await scheduleMessage({
    app,
    time: `${parseInt(START_TIME, 10) + INTERVAL}`,
    text: `Here is the first question:  \n ${question}`,
  });
  triviaState.isActive = true;
  triviaState.answer = 'answer';
};

module.exports = {
  scheduleTrivia,
};
