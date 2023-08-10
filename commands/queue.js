const { SlashCommandBuilder } = require('discord.js');
require('dotenv/config');

let toggle = false;
let delay;
let intervalTime;
let channel;

const users = ['1', '2', '3'];

const pingUser = async () => {
	const user = users[
		Math.floor(Math.random() * users.length)
	];

	channel.send(`queueue? <@${user}>`);
};

const setIntervalTime = (min, max) => {
	const variance = Math.random() * (max - min) + min;
	const dynamicDelay = 1000 * 60 * 60 * (24 + variance);

	return dynamicDelay;
};

const pingDelay = () => {
	clearTimeout(delay);

	if (toggle) {
		pingUser();
		intervalTime = setIntervalTime(0, 48);
		delay = setTimeout(pingDelay, intervalTime);
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Randomly ping some friends to queue for games')
		.addBooleanOption(option =>
			option.setName('enable')
				.setDescription('Enable/Disable bot'),
		),
	async execute(interaction, client) {
		channel = await client.channels.fetch(process.env.PING_CHANNEL);
		toggle = interaction.options.getBoolean('enable');

		if (toggle == true) {
			await interaction.reply('Spinning up the queue command.');
			intervalTime = setIntervalTime(0, 48);
			delay = setTimeout(pingDelay, intervalTime);
		}
		else if (toggle == false) {
			await interaction.reply('Shutting down the queue command.');
		}
		else {
			await interaction.reply('Turn it on or off!');

		}

	},
};