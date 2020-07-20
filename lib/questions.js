const AWS = require('aws-sdk');
const {
  S3_BUCKET: Bucket,
  FILE_NAMES: {
    QUESTIONS: questionsFile,
    DONE_QUESTIONS: doneQuestionsFile,
  } = {},
} = require('config');

const logger = require('../logger');

const s3 = new AWS.S3({ region: 'us-west-2' });

const getParams = {
  Bucket,
  Key: questionsFile,
};

const getQuestions = () => new Promise((resolve, reject) => {
  s3.getObject(getParams, (err, data) => {
    if (err) reject(err);
    else {
      resolve(data.Body.toString('utf-8'));
    }
  });
});

const putQuestions = ({ questions, fileName }) => {
  const putParams = {
    Body: Buffer.from(JSON.stringify(questions), 'utf-8'),
    Bucket: 'trivia-bot-questions',
    Key: fileName,
    ServerSideEncryption: 'AES256',
  };

  s3.putObject(putParams, (err, data) => {
    if (err) logger.error(`Error updating ${fileName}`, err);
    if (data) logger.debug(`Updating ${fileName} successful`);
  });
};

const getUniqueIndexArray = ({ limit, size }) => {
  const randomIndices = [];
  while (randomIndices.length < size) {
    const val = Math.floor(Math.random() * limit);
    if (randomIndices.indexOf(val) === -1) randomIndices.push(val);
  }
};

const pickQuestions = async () => {
  const allQuestions = getQuestions();
  const uniqueIndexArray = getUniqueIndexArray({ limit: allQuestions.length, size: 5 });

  const questionsPicked = uniqueIndexArray.map((index) => allQuestions[index]);
  const questionsRemaining = uniqueIndexArray.map((index) => allQuestions.splice(index, 1));

  await putQuestions({ questions: questionsPicked, fileName: doneQuestionsFile });
  await putQuestions({ questions: questionsRemaining, fileName: questionsFile });

  return questionsPicked;
};

const saveQuestions = async ({ question, answer }) => {
  const questions = getQuestions();
  const newQuestion = {
    question,
    answer,
  };
  questions.push(newQuestion);
  await putQuestions({ questions, fileName: questionsFile });
};

module.exports = {
  pickQuestions,
  saveQuestions,
};
