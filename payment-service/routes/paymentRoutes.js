// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');

// Ödeme durumu kontrolü
router.get('/status/:paymentId', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Ödeme bulunamadı' });
    }
    res.json({ status: payment.status });
  } catch (error) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
