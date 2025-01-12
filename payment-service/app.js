// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors');

// Environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // MongoDB bağlantısı
    await connectDB();
    
    // Server'ı başlat
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server başlatma hatası:', error);
    process.exit(1);
  }
};

startServer();
