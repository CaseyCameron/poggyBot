const { SlashCommandBuilder } = require('@discordjs/builders');
const { findMostPogs } = require('../utils/user-utils.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mostpogs')
    .setDescription('Replies with user with most pogs.'),
  async execute(interaction) {
    await interaction.reply(`${await findMostPogs()}`);
  },
}