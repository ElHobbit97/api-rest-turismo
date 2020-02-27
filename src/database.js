const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(config.DB.URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));