const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { redisClient } = require('./redis');

const sessionConfig = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'gizli_anahtar',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 gün
  }
};

module.exports = session(sessionConfig); 