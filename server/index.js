const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./api/index');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

routes(app, { urlencodedParser });

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`listning on ${port}`);
});
