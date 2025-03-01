const redis = require("redis");
const ServerConfig = require("./server.config");
const redisClient = redis.createClient({
  url: ServerConfig.REDIS_URL,
});

let isConnected = false;

async function connectRedis() {
  if (!isConnected) {
    try {
      await redisClient.connect();
      isConnected = true;
      console.log("✅ Connected to Redis");
    } catch (err) {
      console.error("❌ Redis connection failed:", err);
    }
  }
}

// Handle Redis connection errors
redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
  isConnected = false;
});

module.exports = { redisClient, connectRedis };

// redisClient.on("connect", () => {
//   console.log("Connected to redis");
// });

// redisClient.on("error", (err) => {
//   console.log("Error connecting to redis", err);
// });

// redisClient.connect();
// module.exports = {
//   redisClient,
// };
