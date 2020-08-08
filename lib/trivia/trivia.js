const logger = require('../../logger');
const triviaState = require('./triviaState');

const { postMessage, scheduleMessage } = require('../slack');

const { pickQuestions } = require('../questions');

const {
  endTrivia,
  getCurrentQuestionAnswer,
  updateTriviaState,
  verifyAnswer,
} = require('./utils');

const START_TIME = '1595193600';
const INTERVAL = 15;

const scheduleNextQuestion = async ({ app }) => {
  updateTriviaState({ isActive: true });

  // If no questions remaining, end trivia
  const nextQuestionAnswer = getCurrentQuestionAnswer();
  if (!nextQuestionAnswer) {
    endTrivia({ app });
    return;
  }

  logger.info('Scheduling next question...');
  await postMessage({ app, text: `Next question in ${INTERVAL} seconds` });

  const scheduleTime = Date.now() / 1000 + INTERVAL;
  const {
    question,
  } = nextQuestionAnswer;

  await scheduleMessage({
    app,
    time: scheduleTime,
    text: `Next question:  \n ${question}`,
  });
};

const startTrivia = async ({ app }) => {
  logger.info('Scheduling trivia start...');

  // Schedule the first notification for start time.
  await scheduleMessage({
    app,
    time: START_TIME,
    text: `Trivia starts in ${INTERVAL} seconds`,
    as_user: true,
  });

  const triviaQuestions = await pickQuestions({ numOfQuestions: 5 });
  triviaState.activeTriviaSet = triviaQuestions;

  // Set trivia to active.
  updateTriviaState({ isActive: true });
  const { question } = getCurrentQuestionAnswer() || [];

  // Schedule the first question, which is INTERVAL after the first notification
  await scheduleMessage({
    app,
    time: `${parseInt(START_TIME, 10) + INTERVAL}`,
    text: `Here is the first question:  \n ${question}`,
  });
};

const handleTriviaAnswer = async ({ app, text, user }) => {
  if (triviaState.isActive && verifyAnswer({ text })) {
    await postMessage({ app, text: `${text} is the correct answer :tada: \n Well done, <@${user}|cal>` });
    await scheduleNextQuestion({ app });
  }
};

module.exports = {
  startTrivia,
  scheduleNextQuestion,
  handleTriviaAnswer,
};
