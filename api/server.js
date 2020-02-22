const express = require('express');
const app = express();
const connectDb = require('./config/db.config');
const User = require('./config/User.model');

const PORT = 8080;

app.get('/users', async (req, res) => {
  const users = await User.find();
  console.log('-gfghf-sdjjjjj-s-');
  res.json(users);
});

app.get('/user-create', async (req, res) => {
  const user = new User({ username: 'userTest' });

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});


app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
