const mongoose = require('mongoose');

const songRequestSchema = new mongoose.Schema({
	songId: {
		type: String,
		required: true,
	},
	songTitle: {
		type: String,
		required: true,
	},
	dateAdded: {
		type: Date,
		required: true,
	},
});


module.exports = mongoose.model('SongRequest', songRequestSchema);