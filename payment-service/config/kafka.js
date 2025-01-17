const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:29092'],
  retry: {
    initialRetryTime: 100,
    retries: 8
  },
  connectionTimeout: 3000,
  authenticationTimeout: 1000
});

// Kafka bağlantısını test et
const producer = kafka.producer();

const testKafkaConnection = async () => {
  try {
    await producer.connect();
    console.log('Kafka bağlantısı başarılı');
    await producer.disconnect();
  } catch (error) {
    console.error('Kafka bağlantı hatası:', error);
  }
};

testKafkaConnection();

module.exports = kafka;