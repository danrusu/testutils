const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const { join } = require('path');

const { feedbackController, echoController } = require('./controllers');

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

// APP
const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('src/html/public'));

// ROUTES

app.get('/', serveFileFromHtml('index.html'));
app.get('/message', serveFileFromHtml('message.html'));

// FEEDBACK
app.get('/feedback', serveFileFromHtml('feedback.html'));
app.options('/feedback', cors(corsOptions));
app.post('/feedback', cors(corsOptions), feedbackController);

// ECHO service
app.all('/api/echo', cors(corsOptions), echoController);

// poc
// TODO - expose all POCs
app.get('/poc/xml/:xmlFileName', (req, res) => {
  serveFileFromHtml('poc', `${req.params.xmlFileName}.xml`)(req, res);
});
app.get('/poc/json/:jsonFileName', (req, res) => {
  serveFileFromHtml('poc', `${req.params.jsonFileName}.json`)(req, res);
});

const POC_ACCESS_TOKEN = '123456789';
app.post('/poc/access-token', (_req, res) => {
  res.send({ access_token: POC_ACCESS_TOKEN, token_type: 'bearer' });
});
app.post('/poc/access-token-use', (req, res) => {
  if (req.headers?.authorization === `Bearer ${POC_ACCESS_TOKEN}`) {
    res.send({ status: authenticated });
  } else {
    res.sendStatus(401);
  }
});

function serveFileFromHtml(...relativePath) {
  return function (_req, res) {
    res.sendFile(join(__dirname, 'html', ...relativePath));
  };
}

module.exports = { app };
