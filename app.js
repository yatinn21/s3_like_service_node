require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bucketRoutes = require('./routes/bucketRoutes');
const objectRoutes = require('./routes/objectRoutes');

const app = express();
const port = process.env.PORT || 2000;

app.use(bodyParser.json());
app.use('/buckets', bucketRoutes);
app.use('/objects', objectRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
