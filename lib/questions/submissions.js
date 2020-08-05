const { postMessage } = require('../slack');
const { saveQuestion } = require('../../db/model');
const { responses } = require('../responses');

const submission = {};

const handleDirectMessages = async ({ app, event }) => {
  const {
    channel,
    text,
    user: userId,
    files: [{
      url_private: imageUrl,
    }] = [{}],
  } = event;

  // Handle users submitting questions
  if (text.startsWith('question')) {
    const question = text.replace('question', '').trim();

    // Save the question in-memory (along with user id) till we get an answer
    submission[userId] = { question, imageUrl };
    await postMessage({ app, channel, text: responses.requestAnswer });
    return;
  }

  // Handle users submitting answers to questions
  if (submission[userId]) {
    const {
      question,
      imageUrl: questionImageUrl,
    } = submission[userId];

    const answer = text.trim();
    await saveQuestion({
      question,
      answer,
      imageUrl: questionImageUrl,
      submittedBy: userId,
    });

    await postMessage({ app, channel, text: responses.questionSaved });
    return;
  }

  // In all other cases, send the generic response
  const genericMessage = responses.genericDM;

  await postMessage({ app, channel, text: genericMessage });
};

module.exports = {
  handleDirectMessages,
};
