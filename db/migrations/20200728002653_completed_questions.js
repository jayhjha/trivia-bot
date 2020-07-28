const tableName = 'completed_questions';

exports.up = (knex) => knex.schema
  .createTable(tableName, (table) => {
    table.increments('id');
    table.integer('workspace_id').notNullable();
    table.integer('question_id').notNullable();
    table.timestamp('completed_at').notNullable().defaultTo(knex.fn.now());

    table.foreign('workspace_id').references('workspace.id');
    table.foreign('question_id').references('questions.id');
  });

exports.down = (knex) => knex.schema
  .dropTable(tableName);
