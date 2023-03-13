const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const mealRoutes = require('./routes/meals');
const authRoutes = require('./routes/auth');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
app.use(cors());

app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(authRoutes);

app.use('/meals', mealRoutes);
app.use('/newsletter', newsletterRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);
