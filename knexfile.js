// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/authdb.sqlite3',
    },
    useNullAsDefault: true,
  },

  // migrations: {
  //   directory: './data/migrations',
  //   tableName: 'knex_migrations',
  // },
};
