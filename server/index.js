const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./api/index');

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://music-app-killdroid2342.vercel.app',
    'https://music-app-opal-one.vercel.app',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

routes(app, { urlencodedParser });

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`listning on ${port}`);
});
