import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';

const TOKEN = 'MTE2MzA5MTk2MjI0MTQ5NTEzMQ.G6vgRf.akeWaougbN8Gcz6E3VbJJ_svn3ok4l870MyC0Y';

const commands = [{ name: 'ping', description: 'Replies with Pong!' }];
const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
	console.log('Started refreshing application (/) commands.');

	rest.put(Routes.applicationCommands(''), { body: commands });

	console.log('Successfully reloaded application (/) commands.');
} catch (error) {
	console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	if (!client.user) {
		return;
	}

	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(TOKEN);
