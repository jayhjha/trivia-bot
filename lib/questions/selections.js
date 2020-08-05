const {
  WORKSPACE_ID: workspaceId,
} = require('config');

const {
  getUniqueRandomQuestions,
  getWorkspaceById,
  insertCompletedQuestion,
} = require('../../db/model');

const pickQuestions = async ({ numOfQuestions }) => {
  const { id: dbWorkspaceId } = await getWorkspaceById({ id: workspaceId });
  const questions = await getUniqueRandomQuestions({ numOfQuestions, workspaceId: dbWorkspaceId });

  const completedQuestions = questions.map((question) => ({
    question_id: question.q_id,
    workspace_id: dbWorkspaceId,
  }));

  await insertCompletedQuestion(completedQuestions);

  return questions;
};

module.exports = {
  pickQuestions,
};
