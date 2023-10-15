import BotSlashCommands from './BotSlashCommands';

BotSlashCommands.define('ping', 'Сука не трожь!!', async (interaction) => {
	await interaction.reply('Pong!');
	console.dir(interaction, { depth: null });
});
