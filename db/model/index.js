const completedQuestions = require('./completed_questions');
const questions = require('./questions');
const workspace = require('./workspace');

module.exports = {
  ...completedQuestions,
  ...questions,
  ...workspace,
};
