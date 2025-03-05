module.exports = {
  echoController,
};

async function echoController(req, res) {
  try {
    const {
      protocol,
      url,
      query,
      method,
      headers,
      cookies,
      signedCookies,
      body,
    } = req;
    const host = `${protocol}://${req.get('host')}`;

    const requestData = {
      host,
      url,
      method,
      ...(isEmptyJson(query) ? {} : { query }),
      headers,
      ...(isEmptyJson(cookies) ? {} : { cookies }),
      ...(isEmptyJson(signedCookies) ? {} : { signedCookies }),
    };

    if (body) {
      requestData.body = body;
    }

    res.send({ request: requestData });
  } catch (err) {
    res.status(500).send(err.message || 'echoController error');
  }
}

function isEmptyJson(json) {
  return Object.keys(json).length === 0;
}
