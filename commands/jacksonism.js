const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jackson-ism')
		.setDescription('Return a random quip and phrase often said by Jackson'),
	async execute(interaction) {
		await interaction.reply('That\'s so true.');
	},
};
