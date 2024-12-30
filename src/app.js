const express = require('express');
const app = express();
const path = require('path');
const { submitFeedback } = require('./githubApi');

app.use(express.json());
app.use(express.static('public'));

const serveFileFromRoot = (res, relativePath) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

const serveHome = (_, res) => serveFileFromRoot(res, 'index.html');
const serveMessage = (_, res) => serveFileFromRoot(res, 'message.html');

const feedbackHandler = async (req, res) => {
  try {
    await submitFeedback(req.body);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};
// routes
app.get('/', serveHome);
app.get('/message', serveMessage);
app.post('/feedback', feedbackHandler);

module.exports = { app };
