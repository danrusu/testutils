const { submitFeedback } = require('./githubApi');

module.exports = {
  feedbackHandler,
};

async function feedbackHandler(req, res) {
  try {
    await submitFeedback(req.body);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
}
