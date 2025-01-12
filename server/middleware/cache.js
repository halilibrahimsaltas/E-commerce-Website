const { redisClient } = require('../config/redis');

const cache = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        console.log('Veri cache\'den alındı');
        return res.json(JSON.parse(cachedData));
      }
      
      // Orijinal res.json metodunu değiştir
      const originalJson = res.json;
      res.json = async (data) => {
        await redisClient.setEx(key, duration, JSON.stringify(data));
        res.json = originalJson;
        return res.json(data);
      };
      
      next();
    } catch (error) {
      console.error('Cache hatası:', error);
      next();
    }
  };
};

module.exports = cache; 