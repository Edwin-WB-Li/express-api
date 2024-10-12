const mongoose = require('mongoose');
const moment = require('moment');

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
  })
);
