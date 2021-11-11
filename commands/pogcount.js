const { SlashCommandBuilder } = require('@discordjs/builders');
const { findUserPogs } = require('../utils/user-utils.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pogcount')
    .setDescription('Replies with user\'s pog count.'),
  async execute(interaction) {
    await interaction.reply(`${await findUserPogs(interaction.user.id)}`);
  },
}