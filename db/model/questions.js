const Knex = require('knex');
const knexSettings = require('../knexfile');

const knexInstance = Knex(knexSettings)('questions');

const saveQuestion = ({ question, answer, submittedBy }) => knexInstance
  .insert({
    question,
    answer,
    submitted_by: submittedBy,
  })
  .returning('id');

const getQuestionsFromIdList = ({ idList }) => knexInstance
  .select(
    'question',
    'answer',
    'submitted_by as submittedAs',
  )
  .whereIn('id', idList);

module.exports = {
  saveQuestion,
  getQuestionsFromIdList,
};
