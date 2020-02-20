import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});
console.log(`test envir = ${process.env['TEST']} 323`);
app.listen(3000, () =>
  console.log(`test envir = ${process.env['TEST']} 32`),
);
