import { REST, Routes, CacheType, ChatInputCommandInteraction } from 'discord.js';
import config from '../config';
import { client } from '../bot';

type commandDefinition = { name: string; description: string };

// eslint-disable-next-line no-unused-vars
type handlerFun = (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;

class BotSlashCommands {
	inited: boolean;

	commands: commandDefinition[];

	rest: REST;

	constructor() {
		this.inited = false;
		this.commands = [];
		const token = config.token();
		this.rest = new REST({ version: '10' }).setToken(token);
	}

	async reinit() {
		console.dir(this.commands, { depth: null });

		const appId = config.appid();
		await this.rest.put(Routes.applicationCommands(appId), { body: this.commands });
		this.inited = true;
	}

	define(name: string, description: string, handler: handlerFun) {
		this.commands.push({ name, description });

		client.on('interactionCreate', async (interaction) => {
			if (!interaction.isChatInputCommand()) return;

			if (interaction.commandName === name) {
				try {
					await handler.apply(interaction);
				} catch (error) {
					console.error(`Error (interactionCreate) in handler (${name}) -> `, error);
				}
			}
		});
	}
}

export default new BotSlashCommands();
