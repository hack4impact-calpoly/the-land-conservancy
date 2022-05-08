import express from 'express'; // includes express
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // include mongoose
import eventEndpoints from './routes/events';
import shiftEnpoints from './routes/shifts';
import userEndpoints from './routes/users';
import prizeEndpoints from './routes/prizes';

dotenv.config(); // loads .env into process.env

const app = express(); // initializes Express

// connect to MongoDB
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not found');
}
mongoose.connect(process.env.DATABASE_URL!).then(
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
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,OPTIONS,DELETE,PUT,PATCH'
  );
  next();
});

app.use('/events', eventEndpoints);
app.use('/shifts', shiftEnpoints);
app.use('/users', userEndpoints);
app.use('/prizes', prizeEndpoints);

app.get('/', (req: any, res: any) => {
  res.send('Hello world!');
});

if (process.argv.includes('--dev')) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}
// app.listen(3001); // 3. runs Express

export default app;
