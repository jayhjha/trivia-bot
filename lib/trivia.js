const logger = require('../logger');
const triviaState = require('./triviaState');
const {
  pickQuestions,
} = require('./questions');
const {
  postMessage,
  scheduleMessage,
} = require('./slack');

const START_TIME = '1595193600';
const INTERVAL = 15;

const updateTriviaState = ({ isActive }) => {
  triviaState.isActive = isActive;
  triviaState.current += 1;
};

const getCurrentQuestionAnswer = () => {
  const {
    current,
    activeTriviaSet,
  } = triviaState;

  if (current >= activeTriviaSet.length) {
    return null;
  }

  return activeTriviaSet[current];
};

const verifyAnswer = ({ text }) => {
  logger.info('Verifying answer...');
  const { answer } = getCurrentQuestionAnswer();
  if (text === answer) {
    return true;
  }
  return false;
};

const endTrivia = ({ app }) => {
  const endMessage = "That's all for today folks. Thanks for playing :) ";
  postMessage({ app, text: endMessage });
  triviaState.isActive = false;
  triviaState.current = -1;
  triviaState.activeTriviaSet = [];
};

const scheduleNextQuestion = async ({ app }) => {
  updateTriviaState({ isActive: true });
  const nextQuestionAnswer = getCurrentQuestionAnswer();
  if (!nextQuestionAnswer) {
    endTrivia({ app });
    return;
  }

  logger.info('Scheduling next question...');
  postMessage({ app, text: `Next question in ${INTERVAL} seconds` });

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

  const triviaQuestions = await pickQuestions();
  triviaState.activeTriviaSet = triviaQuestions;

  // Set trivia to active.
  updateTriviaState({ isActive: true });
  const { question } = getCurrentQuestionAnswer();

  // Schedule the first question, which is INTERVAL after the first notification
  await scheduleMessage({
    app,
    time: `${parseInt(START_TIME, 10) + INTERVAL}`,
    text: `Here is the first question:  \n ${question}`,
  });
};

module.exports = {
  startTrivia,
  scheduleNextQuestion,
  updateTriviaState,
  verifyAnswer,
};
