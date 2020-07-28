const Knex = require('knex');
const knexSettings = require('../knexfile');

const knexInstance = Knex(knexSettings)('completed_questions');
// const knexInstance = knex('completed_questions');

const insertCompletedQuestion = ({ questionId, workspaceId }) => knexInstance()
  .insert({
    question_id: questionId,
    workspace_id: workspaceId,
  })
  .returning('id');

const getCompletedQuestionsByWorkspace = ({ workspaceId }) => knexInstance()
  .select('id', 'question_id as questionId')
  .where({ workspace_id: workspaceId });

module.exports = {
  insertCompletedQuestion,
  getCompletedQuestionsByWorkspace,
};
