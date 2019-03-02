exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', table => {
    table.increments();

    table
      .string('name', 126)
      .notNullable()
      .unique();

    table.string('imageUrl', 556).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('images');
};
