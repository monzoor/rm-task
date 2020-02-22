const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const compression = require('compression');
require('dotenv').config();

const app = express();
const connectDb = require('./config/db.config');
const User = require('./config/User.model');


const PORT = 8080;

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(compression());

app.use('/api/users', async (req, res) => {
  const users = await User.find();
  console.log('-gfghf-sdsdsdjjjjj-s-');
  res.json(users);
});

app.use('/api/user-create', async (req, res) => {
  const user = new User({ username: 'userTest' });

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
