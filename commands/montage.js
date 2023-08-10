const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv/config');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('montage')
		.setDescription('Return a random Overwatch montage from Jackson'),
	async execute(interaction) {
		const playlist = await axios.get(`${process.env.YOUTUBE_URI}?part=contentDetails&part=id&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.YOUTUBE_KEY}`);
		const videos = [];
		playlist.data.items.map((item) => {
			videos.push({
				videoId: item.contentDetails.videoId,
				datePublished: item.contentDetails.videoPublishedAt.substring(0, 9),
			});
		});

		const randomVideoId = videos[parseInt(Math.random() * videos.length)].videoId;

		await interaction.reply('https://www.youtube.com/watch?v=' + randomVideoId);

		// const videoLink = new EmbedBuilder()
		// 	.setTitle('Random Montage')
		// 	.setURL(`https://www.youtube.com/watch?v=${randomVideoId}`)
		// 	.setAuthor('Kourrage');
		// await interaction.reply({ embeds: [videoLink] });
	},
};