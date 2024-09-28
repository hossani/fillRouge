import rateLimit from 'express-rate-limit'; // Importez express-rate-limit

const limiterFriend = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limite à 30 requêtes par fenêtre par IP
    message:{
        status: 429,
         problem:'Too many requests from you, please try again later.',
    }
  });

  const limiterEvents = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Limite à 30 requêtes par fenêtre par IP
    message:{
        status: 429,
         problem:'Too many requests from you, please try again later.',
    }
  });

  export default {limiterFriend,limiterEvents};