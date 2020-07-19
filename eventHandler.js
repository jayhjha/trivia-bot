const triviaState = require('./triviaState');
const { postMessage } = require('./slack');

const updateTriviaState = () => {
  triviaState.isActive = false;
  triviaState.answer = null;
};

const verifyAnswer = ({ text }) => {
  console.log('Verifying...');
  if (text === triviaState.answer) {
    return true;
  }
  return false;
};

const handleMessage = ({ app }) => {
  app.event('message', ({ event }) => {
    console.log(event);

    const {
      text,
    } = event;

    if (triviaState.isActive && verifyAnswer({ text })) {
      updateTriviaState();
      postMessage({ app, text: `${text} is the correct answer :tada:` });
    }
  });
};

module.exports = {
  handleMessage,
};
