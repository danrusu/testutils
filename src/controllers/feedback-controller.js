const { submitFeedback } = require('./githubApi');

module.exports = {
  feedbackController,
};

async function feedbackController(req, res) {
  try {
    await submitFeedback(req.body);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(err.message || 'feedbackController error');
  }
}
