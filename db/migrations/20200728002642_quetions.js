const tableName = 'questions';

exports.up = (knex) => knex.schema
  .createTable(tableName, (table) => {
    table.increments('id');
    table.string('question').notNullable();
    table.string('answer').notNullable();
    table.string('submitted_by');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    // Ensures the same user can't submit the same question
    table.unique(['question', 'submitted_by']);
  });

exports.down = (knex) => knex.schema
  .dropTable(tableName);
