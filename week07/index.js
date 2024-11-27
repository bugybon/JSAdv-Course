const express = require('express');
const apiRouter = require('./api');

// 

const app = express();

app.use(express.json());

app.use('', apiRouter);

app.get('/', (req, res) => {
  res.send('HELLO!');
});

app.listen(8080, () => {
  console.log('working on :8080');
});