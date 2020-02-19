import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(3000, () =>
  console.log(`test env= ${process.env['TEST']}`),
);
