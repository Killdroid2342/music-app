const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./api/index');

routes(app, { urlencodedParser });

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`listning on ${port}`);
});
