const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['kafka:9092'],
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

module.exports = kafka;