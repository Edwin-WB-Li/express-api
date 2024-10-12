const mongoose = require('mongoose')
// const moment = require('moment')
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: String,
  },
  update_time: {
    type: Date,
    default: Date.now
  },
  email: String,
  mobile: String,
  role: String,
  role_name: String,
  avatar: {
    type: String,
    default: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  },
  nick_name: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true
  },
  id: { type: String }
});

// 在Schema中添加方法
UsersSchema.methods.verifyPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

const UsersModel = mongoose.model('users', UsersSchema);

module.exports = UsersModel;