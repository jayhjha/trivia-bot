const Knex = require('knex');
const knexSettings = require('../knexfile');

const knex = Knex(knexSettings);
const knexInstance = knex('questions');

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

const getRandomQuestions = ({ numOfQuestions }) => knexInstance
  .select()
  .orderBy(knex.raw('RANDOM()'))
  .limit(numOfQuestions);

module.exports = {
  saveQuestion,
  getRandomQuestions,
};
