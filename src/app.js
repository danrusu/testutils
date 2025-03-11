const express = require('express');
const cors = require('cors');

const { join } = require('path');

const { feedbackHandler } = require('./controllers/feedback-controller');

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

// APP
const app = express();

app.use(express.json());
app.use(express.static('src/html/public'));

// ROUTES

app.get('/', serveFileFromHtml('index.html'));
app.get('/message', serveFileFromHtml('message.html'));

// FEEDBACK
app.options('/feedback', cors(corsOptions));
app.get('/feedback', serveFileFromHtml('feedback.html'));
app.post('/feedback', cors(corsOptions), feedbackHandler);

// poc
app.get('/poc/xml/:xmlFileName', (req, res) => {
  serveFileFromHtml('poc', `${req.params.xmlFileName}.xml`)(req, res);
});

function serveFileFromHtml(...relativePath) {
  return function (_req, res) {
    res.sendFile(join(__dirname, 'html', ...relativePath));
  };
}

module.exports = { app };
