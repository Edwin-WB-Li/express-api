const mongoose = require('mongoose');
const moment = require('moment');

module.exports = mongoose.model(
  'records',
  new mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  })
);
