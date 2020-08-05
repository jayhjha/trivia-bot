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

const getUniqueRandomQuestions = ({ numOfQuestions, workspaceId }) => knexInstance
  .select(knex.raw('*, q.id as q_id'))
  .leftJoin('completed_questions', function() {
    this.on('q.id', '!=', 'completed_questions.question_id').andOn('completed_questions.workspace_id', '!=', workspaceId);
  })
  .orderBy(knex.raw('RANDOM()'))
  .limit(numOfQuestions);

module.exports = {
  saveQuestion,
  getUniqueRandomQuestions,
};
