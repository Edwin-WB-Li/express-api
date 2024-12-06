const mongoose = require('mongoose');
// const moment = require('moment')
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	create_time: {
		type: String,
	},
	update_time: {
		type: Date,
		default: Date.now,
	},
	email: String,
	mobile: String,
	role: String,
	role_name: String,
	avatar: {
		type: String,
		default:
			'https://upload-bbs.miyoushe.com/upload/2021/03/11/73281682/f810fbc2e4806aab8176e96feee0078e_5530265271028193466.jpg',
	},
	nick_name: {
		type: String,
		default: '',
	},
	status: {
		type: Boolean,
		default: true,
	},
	id: { type: String },
});

// 在Schema中添加方法
UsersSchema.methods.verifyPassword = function (plainPassword) {
	return bcrypt.compare(plainPassword, this.passwordHash);
};

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;
