const mongoose = require('mongoose');

module.exports = mongoose.model(
	'menus',
	new mongoose.Schema({
		id: Number,
		menuName: String,
		code: String,
		fatherId: Number,
		orderNum: Number,
		path: String,
		menuType: String,
		visible: Boolean,
		status: Boolean,
		icon: {
			type: String,
			nullable: true,
		},
		alIcon: {
			type: String,
			nullable: true,
		},
		newLinkFlag: Boolean,
		create_time: {
			type: Date,
			default: Date.now,
			require: false,
		},
		update_time: {
			type: Date,
			default: Date.now,
			require: false,
		},
		role: Array,
	}),
);
