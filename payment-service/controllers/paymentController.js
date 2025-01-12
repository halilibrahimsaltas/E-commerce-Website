// controllers/paymentController.js
const Payment = require('../models/paymentModel');

// Yeni ödeme işlemi başlatma
const initiatePayment = async (req, res) => {
  const { name, number, cardId, amount } = req.body;

  try {
    const newPayment = new Payment({
      name,
      number,
      cardId,
      amount
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Ödeme durumu güncelleme
const updatePaymentStatus = async (req, res) => {
  const { paymentId, status } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { paymentStatus: status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { initiatePayment, updatePaymentStatus };
