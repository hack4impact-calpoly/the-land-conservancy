const express = require('express'); // 1. includes Express

const app = express();  // 2. initializes Express

/*
 * other code here :)
 */

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3001); // 3. runs Express
