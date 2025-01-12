// models/paymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  cardDetails: {
    number: String,
    name: String,
    cardId: String
  },
  shippingAddress: String,
  status: {
    type: String,
    enum: ['PROCESSING', 'COMPLETED', 'FAILED'],
    default: 'PROCESSING'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Payment', paymentSchema);
