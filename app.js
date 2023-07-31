const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64c76d684f7078bb780c5349',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('App listening on port 3000'));
