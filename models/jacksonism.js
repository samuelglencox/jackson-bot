const mongoose = require('mongoose');

const jacksonismSchema = new mongoose.Schema({
	quote: {
		type: String,
		required: true,
	},
});

jacksonismSchema.methods.addJacksonism = function(jacksonism) {
	this.quote = jacksonism;
	return this.save();
};

module.exports = mongoose.model('Jacksonism', jacksonismSchema);