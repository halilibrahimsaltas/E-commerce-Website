const { Kafka } = require('kafkajs');
const Payment = require('../models/paymentModel');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:29092']
});

const consumer = kafka.consumer({ groupId: 'payment-service-group' });

const runConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka consumer bağlandı');

    await consumer.subscribe({ 
      topics: ['payment-events', 'order-events'], 
      fromBeginning: true 
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const messageValue = JSON.parse(message.value.toString());
          console.log(`Mesaj alındı - Topic: ${topic}`, messageValue);
          
          switch (topic) {
            case 'payment-events':
              await handlePaymentEvent(messageValue);
              break;
            case 'order-events':
              await handleOrderEvent(messageValue);
              break;
            default:
              console.log(`Bilinmeyen topic: ${topic}`);
          }
        } catch (error) {
          console.error('Mesaj işleme hatası:', error);
        }
      }
    });
  } catch (error) {
    console.error('Kafka consumer hatası:', error);
    throw error;
  }
};

const handlePaymentEvent = async (messageValue) => {
  try {
    if (messageValue.type === 'PAYMENT_INITIATED') {
      const paymentData = messageValue.data;
      
      // Yeni ödeme kaydı oluştur
      const payment = new Payment({
        amount: paymentData.amount,
        cardDetails: {
          number: paymentData.cardDetails.number,
          name: paymentData.cardDetails.name,
          cardId: paymentData.cardDetails.cardId
        },
        shippingAddress: paymentData.shippingAddress,
        status: 'PROCESSING',
        createdAt: new Date()
      });

      await payment.save();

      // 3 saniye sonra ödemeyi tamamla
      setTimeout(async () => {
        payment.status = 'COMPLETED';
        payment.completedAt = new Date();
        await payment.save();
        console.log(`Ödeme tamamlandı: ${payment._id}`);
      }, 3000);
    }
  } catch (error) {
    console.error('Ödeme işleme hatası:', error);
  }
};

const handleOrderEvent = async (messageValue) => {
  console.log('Sipariş olayı alındı:', messageValue);
  // Sipariş olayı işleme mantığı buraya gelecek
};

module.exports = { runConsumer };