const mongoose = require('mongoose');

module.exports = mongoose.model(
	'dictionaries',
	new mongoose.Schema({
		type: {
			type: String,
			require: true,
		},
		label: {
			type: String,
			require: true,
		},
		value: {
			type: String,
			require: true,
		},
	}),
);
