import { redisClient } from "../config/redis.js";

// cache helpers are no-ops when Redis is not connected

export const cacheGet = async (key: string) => {
  if (!redisClient.isReady) return null;
  try {
    return await redisClient.get(key);
  } catch (error) {
    console.log("Cache read failed: ", error);
    return null;
  }
};

export const cacheSet = async (key: string, value: string, ttlSeconds: number) => {
  if (!redisClient.isReady) return;
  try {
    await redisClient.set(key, value, { EX: ttlSeconds });
  } catch (error) {
    console.log("Cache write failed: ", error);
  }
};

export const cacheDel = async (key: string) => {
  if (!redisClient.isReady) return;
  try {
    await redisClient.del(key);
  } catch (error) {
    console.log("Cache delete failed: ", error);
  }
};

export const invalidatePostCaches = async (username?: string) => {
  await cacheDel("home:posts");

  if (username) {
    await cacheDel(`user:posts:${username}`);
  }
};
