const { redisClient } = require('../config/redis');
const Payment = require('../models/paymentModel');

const getPaymentStatus = async (paymentId) => {
  try {
    // Önce cache'i kontrol et
    const cachedStatus = await redisClient.get(`payment:${paymentId}`);
    if (cachedStatus) {
      return JSON.parse(cachedStatus);
    }

    // Cache'de yoksa veritabanından al
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      throw new Error('Ödeme bulunamadı');
    }

    // Statüyü cache'e kaydet (1 dakika)
    await redisClient.setEx(`payment:${paymentId}`, 60, JSON.stringify({
      status: payment.status,
      amount: payment.amount,
      createdAt: payment.createdAt
    }));

    return {
      status: payment.status,
      amount: payment.amount,
      createdAt: payment.createdAt
    };
  } catch (error) {
    console.error('Ödeme durumu alma hatası:', error);
    throw error;
  }
};

module.exports = { getPaymentStatus }; 