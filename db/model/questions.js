const Knex = require('knex');
const knexSettings = require('../knexfile');

const knex = Knex(knexSettings);
const knexInstance = knex({ q: 'questions' });

const saveQuestion = ({
  question,
  answer,
  imageUrl,
  submittedBy,
}) => knexInstance
  .insert({
    question,
    answer,
    image_url: imageUrl,
    submitted_by: submittedBy,
  })
  .returning('id');

const getUniqueRandomQuestions = ({ numOfQuestions, workspaceId }) => knex
  .raw(`select * from questions q
        where q.id not in (
          select question_id from completed_questions
          where workspace_id = ${workspaceId}
        )
        limit ${numOfQuestions};`)
  .then((resp) => Promise.resolve(resp.rows));

module.exports = {
  saveQuestion,
  getUniqueRandomQuestions,
};
