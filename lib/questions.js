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

const getQuestions = (fileName) => new Promise((resolve, reject) => {
  const params = {
    Bucket,
    Key: fileName,
  };

  s3.getObject(params, (err, data) => {
    if (err) reject(err);
    else {
      resolve(JSON.parse(data.Body.toString('utf-8')));
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
  return randomIndices;
};

const pickQuestions = async () => {
  const allQuestions = await getQuestions(questionsFile);
  const previouslyAskedQuestions = await getQuestions(doneQuestionsFile);

  const uniqueIndexArray = getUniqueIndexArray({ limit: allQuestions.length, size: 2 });

  const questionsPicked = uniqueIndexArray.map((index) => allQuestions[index]);
  const remainingQuestions = allQuestions.filter((val, index) => {
    if (!uniqueIndexArray.includes(index)) {
      return val;
    }
    return null;
  });

  const questionsAsked = previouslyAskedQuestions.concat(questionsPicked);

  await putQuestions({ questions: questionsAsked, fileName: doneQuestionsFile });
  await putQuestions({ questions: remainingQuestions, fileName: questionsFile });

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
