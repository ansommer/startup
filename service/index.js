const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

let users = [];
let ingredients = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
//app.use(cookieParser());

app.get('*', (_req, res) => {
  res.send({ msg: 'Startup service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});