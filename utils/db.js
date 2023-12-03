import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(database);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        this.db = false;
      }
    });
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    const numUsers = await this.usersCollection.countDocuments();
    return numUsers;
  }

  async nbFiles() {
    const numFiles = await this.filesCollection.countDocuments();
    return numFiles;
  }
}

// Create and export an instance of DBClient called dbClient
const dbClient = new DBClient();
module.exports = dbClient;
