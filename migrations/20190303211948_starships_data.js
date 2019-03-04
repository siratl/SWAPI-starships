exports.up = function(knex, Promise) {
  return knex.schema.createTable('spaceships', table => {
    table.increments();

    table
      .string('name', 126)
      .notNullable()
      .unique();
    table.string('model', 256).notNullable();
    table.string('manufacturer', 256).notNullable();
    table.integer('cost_in_credits').notNullable();
    table.integer('max_atmosphering_speed').notNullable();
    table.integer('crew').notNullable();
    table.integer('passengers').notNullable();
    table.integer('cargo_capacity').notNullable();
    table.string('consumables', 256).notNullable();
    table.integer('hyperdrive_rating').notNullable();
    table.string('starship_class', 256).notNullable();
    table.integer('length').notNullable();
    table.string('imageUrl', 256).notNullable();
    table.specificType('pilots', []);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('spaceships');
};
