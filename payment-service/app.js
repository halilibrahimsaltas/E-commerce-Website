// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const paymentRoutes = require('./routes/paymentRoutes');
const { runConsumer } = require('./services/kafkaConsumer');

dotenv.config();
const app = express();

// Redis ve MongoDB bağlantıları
Promise.all([connectRedis(), connectDB()])
  .then(() => {
    console.log('Redis ve MongoDB bağlantıları hazır');
  })
  .catch(error => {
    console.error('Bağlantı hatası:', error);
    process.exit(1);
  });

app.use(express.json());
app.use('/api/payments', paymentRoutes);

// Sunucu başlatma
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Kafka consumer'ı başlat
  try {
    await runConsumer();
    console.log('Kafka consumer başarıyla başlatıldı');
  } catch (error) {
    console.error('Kafka consumer başlatma hatası:', error);
  }
});
