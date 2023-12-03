import sha1 from 'sha1';
import { ObjectID } from 'mongodb';
// import Queue from 'bull';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// const userQueue = new Queue('userQueue', 'redis://127.0.0.1:6379');

class UsersController {
  static postNew(request, response) {
    const email = request.body.email;
    const password = request.body.password;

    if (!email) {
      return response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return response.status(400).json({ error: 'Missing password' });
    }

    const users = dbClient.db.collection('users');
    users.findOne({ email }, (_err, user) => {
      if (user) {
        return response.status(400).json({ error: 'Already exist' });
      }
      const hashedPwd = sha1(password);
      const result = users.insertOne(
        {
          email,
          password: hashedPwd,
        });
      return response.status(201).send({ id: result.insertedId, email: email });
    });
  }
}

module.exports = UsersController;