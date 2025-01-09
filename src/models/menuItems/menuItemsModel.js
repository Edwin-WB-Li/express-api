const mongoose = require('mongoose');

module.exports = mongoose.model(
	'menu_items',
	new mongoose.Schema({
		icon: {
			type: String,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		children: [
			{
				icon: {
					type: String,
					required: true,
				},
				path: {
					type: String,
					required: true,
				},
				title: {
					type: String,
					required: true,
				},
			},
		],
	}),
);
