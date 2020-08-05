const Knex = require('knex');
const knexSettings = require('../knexfile');

const knexInstance = Knex(knexSettings)('completed_questions');

const insertCompletedQuestion = (rows) => knexInstance
  .insert(rows)
  .returning('id');

const getCompletedQuestionsByWorkspace = ({ workspaceId }) => knexInstance
  .select('id', 'question_id as questionId')
  .where({ workspace_id: workspaceId });

module.exports = {
  insertCompletedQuestion,
  getCompletedQuestionsByWorkspace,
};
