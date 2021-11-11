const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { checkForUser, countPogs, sendPogMessage } = require('./utils/index.js');
const User = require('./models/User.js');

User.sync();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

// add /slash commands to a collection
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// activate the bot
client.once('ready', () => {
  console.log('Ready!');
});

// listen for /slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// listen to channel messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  let pogCount = countPogs(message.content);

  // error contingency
  if (pogCount < 0) return;

  checkForUser(pogCount, message);

  sendPogMessage(pogCount, message);
});

client.login(token);