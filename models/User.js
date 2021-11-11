const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage: 'database.sqlite',
});

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discordId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    defaultValue: 0,
    allowNull: false,
  },
  pogs: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
})

module.exports = User;
