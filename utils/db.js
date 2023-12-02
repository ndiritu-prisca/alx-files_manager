import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${this.host}:${this.port}`;
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.database = client.db(database);
      } else {
        this.database = false;
      }
    });
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    try {
      await this.client.connect();
      const db = this.client.db(this.database);
      const usersCollection = db.collection('users');
      return await usersCollection.countDocuments();
    } finally {
      await this.client.close();
    }
  }

  async nbFiles() {
    try {
      await this.client.connect();
      const db = this.client.db(this.database);
      const filesCollection = db.collection('files');
      return await filesCollection.countDocuments();
    } finally {
      await this.client.close();
    }
  }
}

// Create and export an instance of DBClient called dbClient
const dbClient = new DBClient();
module.exports = dbClient;
