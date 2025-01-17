// models/paymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  orderId: {
    type: String,
    sparse: true
  },
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

const Payment = mongoose.model('Payment', paymentSchema);

const removeIndex = async () => {
  try {
    await Payment.collection.dropIndex('orderId_1');
    console.log('orderId index başarıyla kaldırıldı');
  } catch (err) {
    if (err.code !== 27) {
      console.error('Index kaldırma hatası:', err);
    }
  }
};

removeIndex();

module.exports = Payment;
