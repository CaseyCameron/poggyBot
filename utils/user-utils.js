const { Sequelize } = require('sequelize');
const User = require('../models/User.js');

async function checkForUser(pogCount, message) {
  let user = await User.findByPk(message.author.id);
  if (!user) {
    createUser(message, pogCount);
  } else {
    await updateUser(pogCount, message, user);
  }
};

async function createUser(message, pogCount) {
  await User.create({
    username: message.author.username,
    discordId: message.author.id,
    pogs: pogCount
  });
}

async function updateUser(pogCount, message, user) {
  const userPogs = Number(user.dataValues.pogs);
  await User.update({ pogs: userPogs + pogCount }, {
    where: {
      discordId: message.author.id
    },
  });
}

async function findMostPogs() {
  const mostPogs = await User.findAll({
    attributes: [
      'username',
      'discordId',
      [Sequelize.fn('max', Sequelize.col('pogs')), 'maxPogs']
    ],
    raw: true,
  });
  if (!mostPogs[0].username) {
    return 'Nobody has any pogs. That\'s great!'
  } else {
    return `${mostPogs[0].username} has the most pogs with ${mostPogs[0].maxPogs} pogs`;
  }
};

async function findUserPogs(username) {
  const user = await User.findByPk(username);
  if (!user) {
    return 'You have no pogs. That\'s great!';
  } else {
    return `You have ${user.pogs} all-time pogs.`;
  }
};

module.exports = { checkForUser, createUser, findMostPogs, findUserPogs, updateUser }