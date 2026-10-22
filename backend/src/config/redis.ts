import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    // give up after a few attempts so the server can still start without Redis
    // (caching is skipped and the rate limiter lets requests through)
    reconnectStrategy: (retries) =>
      retries > 5 ? new Error("Redis unavailable") : Math.min(retries * 200, 2000),
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Error: ", err.message);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected");
    }
  } catch (error) {
    console.error(
      "Failed to connect Redis, continuing without cache:",
      (error as Error).message
    );
  }
};
