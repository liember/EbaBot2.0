import config from './config';
import './slash_commands';
import { client } from './bot';
import { BotSlashCommands } from './slash_commands';

const token = config.token();

console.log('Started refreshing application (/) commands.');
BotSlashCommands.reinit()
	.then(() => {
		console.log('Successfully reloaded application (/) commands.');
	})
	.catch((err) => console.error('error while updating slash commands ', err));

client.login(token).then(console.info).catch(console.error);
