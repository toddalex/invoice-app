const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// unkown route handler
app.use('*', (req, res)=> {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});

app.listen(PORT, console.log(`Server listening at Port ${PORT}...`));