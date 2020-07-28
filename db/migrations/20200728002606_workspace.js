const tableName = 'workspace';

exports.up = (knex) => knex.schema
  .createTable(tableName, (table) => {
    table.increments('id');
    table.string('workspace_id').notNullable().unique();
  });

exports.down = (knex) => knex.schema
  .dropTable(tableName);
