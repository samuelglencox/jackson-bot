require('dotenv/config');

const { Client, Collection, GatewayIntentBits, Options } = require('discord.js');
const mongoose = require('mongoose');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ 
	intents: [GatewayIntentBits.Guilds],
	makeCache: Options.cacheWithLimits(Options.DefaultMakeCacheSettings),
	sweepers: Options.DefaultSweeperSettings,
});

const initialize = async () => {

	await mongoose
		.connect(process.env.DATABASE_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Connected to the Database');
		})
		.catch((error) => {
			console.log(error);
			process.exit(1);
		});

	client.commands = new Collection();

	const commandsPath = path.join(__dirname, 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

	client.events = new Collection();

	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	}

	client.login(process.env.CLIENT_TOKEN);
};

process.on('SIGTERM', async () => {
	console.log('Shutting down');
	await mongoose.disconnect();
	process.exit(0);
});

process.on('uncaughtException', (error) => {
	console.log(error);
});

process.on('unhandledRejection', (error) => {
	console.log(error);
});

initialize();
