const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pog')
    .setDescription('Replies with You said pog.'),
  async execute(interaction) {
    await interaction.reply('You said pog!');
  },
}