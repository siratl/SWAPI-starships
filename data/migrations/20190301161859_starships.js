exports.up = function(knex, Promise) {
  knex.schema.createTable('users', table => {
    table.increments();

    table
      .string('username', 126)
      .notNullable()
      .unique();
    table.string('password', 256).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
