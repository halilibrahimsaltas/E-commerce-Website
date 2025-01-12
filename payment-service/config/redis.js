const Redis = require('redis');

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Redis bağlantı hatası:', error);
    process.exit(1);
  }
};

module.exports = { redisClient, connectRedis }; 