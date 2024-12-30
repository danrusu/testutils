const { app } = require('./app');

const port = process.env.PORT || 1111;

app.listen(port, notifyServerStart);

function notifyServerStart() {
  console.log(`server listening at http://localhost:${port}/`);
}
