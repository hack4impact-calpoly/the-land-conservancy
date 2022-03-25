const express = require('express'); // includes express
const mongoose = require('mongoose'); // include mongoose
const eventEndpoints = require('./routes/events');
const shiftEnpoints = require('./routes/shifts');
const userEndpoints = require('./routes/users');
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

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  next();
});
app.use('/events', eventEndpoints);
app.use('/shifts', shiftEnpoints);
app.use('/users', userEndpoints);

// app.get('/', (req: any, res: any) => {
//   res.send('Hello world!');
// });

app.listen(3001); // 3. runs Express
