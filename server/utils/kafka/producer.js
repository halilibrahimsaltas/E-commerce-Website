const { Kafka } = require('kafkajs');

// Kafka yapılandırması
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:29092']
});

// Producer örneğini oluştur
const producer = kafka.producer();

// Producer'ı bağla ve mesaj gönder
const sendMessage = async (topic, message) => {
  try {
    // Producer'ı bağla
    await producer.connect();
    
    // Mesajı gönder
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) },
      ],
    });

    console.log('Mesaj başarıyla gönderildi');
  } catch (error) {
    console.error('Kafka producer hatası:', error);
    throw error;
  }
};

// Bağlantıyı kapat
const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Producer bağlantısı kapatıldı');
  } catch (error) {
    console.error('Producer bağlantısı kapatılırken hata:', error);
    throw error;
  }
};

const sendPaymentMessage = async (paymentData) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'payment-events',
      messages: [
        { 
          value: JSON.stringify({
            type: 'PAYMENT_INITIATED',
            data: paymentData,
            timestamp: new Date().toISOString()
          })
        },
      ],
    });
    console.log('Ödeme başlatma mesajı gönderildi');
    return true;
  } catch (error) {
    console.error('Ödeme mesajı gönderme hatası:', error);
    throw error;
  }
};

module.exports = {
  producer,
  sendMessage,
  disconnectProducer,
  sendPaymentMessage
};
