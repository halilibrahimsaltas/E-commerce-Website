// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');

// Test endpoint'i
router.get('/test', (req, res) => {
  res.json({ message: 'Payment service is working' });
});

// Basit ödeme başlatma endpoint'i
router.post('/initiate', async (req, res) => {
  console.log('Ödeme isteği alındı:', req.body); // Debug log

  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Tutar gereklidir'
      });
    }

    // Yeni ödeme oluştur
    const payment = new Payment({
      amount: amount,
      status: 'PROCESSING'
    });

    // Ödemeyi kaydet
    const savedPayment = await payment.save();
    console.log('Ödeme kaydedildi:', savedPayment); // Debug log

    // 3 saniye sonra ödemeyi tamamla
    setTimeout(async () => {
      try {
        savedPayment.status = 'COMPLETED';
        savedPayment.completedAt = new Date();
        await savedPayment.save();
        console.log('Ödeme tamamlandı:', savedPayment._id); // Debug log
      } catch (error) {
        console.error('Ödeme tamamlama hatası:', error);
      }
    }, 3000);

    // Başarılı yanıt döndür
    res.status(200).json({
      success: true,
      paymentId: savedPayment._id,
      message: 'Ödeme başlatıldı'
    });

  } catch (error) {
    console.error('Ödeme hatası:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Ödeme işlemi sırasında bir hata oluştu',
      error: error.message
    });
  }
});

module.exports = router;
