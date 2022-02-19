const express = require('express'); // includes express
const mongoose = require('mongoose'); // include mongoose
const shiftEndpoints = require('./routes/shift');
require('dotenv').config(); // loads .env into process.env

const app = express(); // initializes Express

// connect to MongoDB
if (!process.env.CONNECTION_URL) {
  console.warn('CONNECTION_URL not found');
}
mongoose.connect(process.env.CONNECTION_URL).then(
  () => {
    console.log('Connected to server successfully!');
  },
  (err: Error) => {
    console.log('Unable to connect to the server. \nError:', err);
  }
);
/*
 * other code here :)
 */

// app.get('/', (req: any, res: any) => {
//   res.send('Hello world!');
// });

app.use('/', shiftEndpoints);

app.listen(3001); // 3. runs Express
