const logger = require('../../logger');
const triviaState = require('./triviaState');

const endTrivia = ({ app, channel }) => {
  const endMessage = "That's all for today folks. Thanks for playing :) ";
  postMessage({ app, channel, text: endMessage });
  triviaState.isActive = false;
  triviaState.current = -1;
  triviaState.activeTriviaSet = [];
};

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

module.exports = {
  endTrivia,
  getCurrentQuestionAnswer,
  updateTriviaState,
  verifyAnswer,
};
