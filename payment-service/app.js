// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB bağlantısı başarılı');
}).catch((err) => {
  console.error('MongoDB bağlantı hatası:', err);
});

// Routes
app.use('/api/payments', paymentRoutes);

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Payment service is working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Bir hata oluştu',
    error: err.message
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Payment service ${PORT} portunda çalışıyor`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM sinyali alındı, uygulama kapatılıyor...');
  mongoose.connection.close(() => {
    console.log('MongoDB bağlantısı kapatıldı');
    process.exit(0);
  });
});
