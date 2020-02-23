const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const compression = require('compression');
require('dotenv').config();

const PORT = 8080;

const connectDb = require('./config/db.config');
const routers = require('./routers/allRouter');
const { handleError } = require('./utils/errorHandle')

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(compression());

app.use('/api', routers);

app.use('/api/user-create', async (req, res) => {
  const user = new User({ 
    title: 'Private Room- 1Double & 1Single Bed-Central London',
    description: 'A Private Room in Shared flat with a friendly professional female and her two lovable pugs(dogs).I look forward to hosting you in my home and welcoming you to London',
    price: '£200',
    type: 'single',
    location: {
      country: 'UK',
      city: 'london',
    },
    comments: [
      {
        userName: 'Wasiq',
        avatar: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/female-avatar-12-774634.png',
        rating: 5,
        comments: 'We hated your smelly shitty house',
      }
    ],
    image: [
      'https://cdn.vox-cdn.com/thumbor/CTluvlc9kScZlylzsRR4QRCE4Gg=/6x0:641x423/1200x800/filters:focal(6x0:641x423)/cdn.vox-cdn.com/uploads/chorus_image/image/48767301/Screen_Shot_2016-02-09_at_9.08.28_AM.0.0.png'
    ]
   });

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

app.use((err, req, res, next) => {
  handleError(err, res);
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
