const { SlashCommandBuilder } = require('discord.js');
const Jacksonism = require('../models/jacksonism');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jacksonism')
		.setDescription('Return a random quip and phrase often said by Jackson')
		.addStringOption(option =>
			option.setName('add')
				.setDescription('Add a Jackson-ism to the database')),
	async execute(interaction) {
		let message;

		try {
			if (interaction.options.getString('add') != null) {
				const newQuote = new Jacksonism({
					quote: interaction.options.getString('add'),
				});

				await newQuote.save();
				message = `${interaction.user} has added the following Jacksonism: ` + newQuote.quote;
				interaction.reply(message);
			}
			else {
				const randomQuote = await Jacksonism.aggregate([ { $sample: { size: 1 } } ]);
				message = randomQuote[0].quote;
				interaction.reply(message);
			}
		}
		catch (error) {
			message = 'Sorry! We were unable to add your message at this time';
			await interaction.reply(message);
			console.log(error);
		}
	},
};
