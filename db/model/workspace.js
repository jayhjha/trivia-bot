const Knex = require('knex');
const knexSettings = require('../knexfile');

const knexInstance = Knex(knexSettings)('workspace');

const getWorkspaceById = ({ id }) => knexInstance
  .select(
    'id',
    'workspace_id as workspaceId',
  )
  .where({ workspace_id: id })
  .first();

module.exports = {
  getWorkspaceById,
};
