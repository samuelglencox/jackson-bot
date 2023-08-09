require('dotenv/config');
const { SlashCommandBuilder, Client, Guild } = require('discord.js');

let toggle = false;

const users = ['1', '2', '3'];


const pingUser = async (client) => {

	const channel = await client.channels.fetch(process.env.PING_CHANNEL);

	const user = users[
		Math.floor(Math.random() * users.length)
	];

	if (toggle) {
		channel.send(`Overwatch? <@${user}>`);
	}

};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('overwatch')
		.setDescription('Randomly ping some friends to play Overwatch')
		.addBooleanOption(option =>
			option.setName('enable')
				.setDescription('Enable/Disable bot'),
		),
		// .addStringOption(option =>
		// 	option.setName('add-user')
		// 		.setDescription('Add a user to the list')),
	async execute(client, interaction) {

		await interaction.reply('Spinning up the bot you cheeky bastard.');

		toggle = interaction.options.getBoolean('enable');

		let delay = Math.floor(Math.random()) + 1;
		let delayTime = 1 * 10000;

		let interval = setInterval(() => {

			pingUser(client);

			if (!toggle) {
				clearInterval(interval);
			}
		}, delayTime);
	},
};