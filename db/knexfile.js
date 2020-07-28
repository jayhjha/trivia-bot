module.exports = {
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'trivia-bot',
    password: '',
    database: 'trivia_bot_db',
  },
  seeds: {
    directory: './seeds',
  },
};
