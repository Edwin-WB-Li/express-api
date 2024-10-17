const mongoose = require('mongoose');
const moment = require('moment');

module.exports = mongoose.model(
  'goods',
  new mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    desc: String,
    cate: String,
    rank: Number,
    hot: {
      type: Boolean,
      default: false,
    },
    star: {
      type: Number,
      default: 1,
      require: false,
    },
    shopId: String,
    create_time: {
      type: Date,
      default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      require: false,
    },
    status: Number,
  })
);
