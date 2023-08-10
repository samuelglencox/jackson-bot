const { SlashCommandBuilder } = require('discord.js');
const SongRequest = require('../models/song-request.js');
const axios = require('axios');
require('dotenv/config');

// Establish/verify connection
// Pull list of songs from API
// Remove list of old songs from DB
// Push new list to DB
const refresh = async () => {
	// const playlist = await axios.get('API LINK');

};

// Connect to database
// Pull a random song from Database
// Return information about that song

const getSong = async () => {

};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('song-request')
		.setDescription('Return a song from Jackson\'s Spotify')
		.addBooleanOption(option =>
			option.setName('refresh')
				.setDescription('Refresh the list of songs'),
		),
	async execute(interaction) {

		if (interaction.options.getBoolean('enable')) {
			refresh();
		}

		const song = getSong();

		await interaction.reply('song goes here');
	},
};