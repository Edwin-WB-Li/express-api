const mongoose = require('mongoose');
const moment = require('moment');

module.exports = mongoose.model(
  'comments',
  new mongoose.Schema({
    id: {
      type: String,
      require: true,
    },
    likes: {
      type: Number,
      require: false,
      default: 0,
    },
    isLikes: {
      type: Boolean,
      require: true,
    },
    dislikes: {
      type: Number,
      require: false,
      default: 0,
    },
    isDislikes: {
      type: Boolean,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    children: {
      type: Array,
      require: true,
    },
    datetime: {
      type: Date,
      require: false,
      default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    },
    displayTime: {
      type: String,
      require: true,
    },
    commentId: {
      type: String,
      require: true,
    },
  })
);
