import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const asyncGet = promisify(this.client.get).bind(this.client);
    const value = await asyncGet(key)
    return value;
  }

  async set(key, value, time) {
    const asyncSet = promisify(this.client.set).bind(this.client);
    await asyncSet(key, value);
    setTimeout(() => {
      this.client.expire(key, time);
    }, 0);
  }

  async del(key) {
    const asyncDel = promisify(this.client.del).bind(this.client);
    await asyncDel(key);
  }
}

// Create and export an instance of RedisClient called redisClient
const redisClient = new RedisClient();
module.exports = redisClient;
