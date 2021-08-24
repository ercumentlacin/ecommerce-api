// init project
var express = require('express');
var app = express();
const mongoose = require('mongoose');
require('dotenv/config');
var bodyParser = require('body-parser');
var url = String(process.env.HOSTNAME).split('-');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect db
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connect to db');
  }
);

// import routes
const products = require('./routes/products');

app.use('/products', products);

// This route processes GET requests to "/"`
app.get('/', (req, res) => {
  res.send(
    `<h1>REST API</h1>
    <p>
      A REST API starter using Express and body-parser. 
      <br /><br />
      To test, curl the following and view the terminal logs:
      <br /><br />
      <i>
        curl -H "Content-Type: application/json" -X POST -d
        '{"username":"test","data":"1234"}' 
        <br /><br />
        https://${url[2]}.sse.codesandbox.io/update 
      </i>
    </p>`
  );
  console.log('Received GET');
});

// A route for POST requests sent to `/update`
app.post('/update', function (req, res) {
  if (!req.body.username || !req.body.data) {
    console.log('Received incomplete POST: ' + JSON.stringify(req.body));
    return res.send({ status: 'error', message: 'missing parameter(s)' });
  } else {
    console.log('Received POST: ' + JSON.stringify(req.body));
    return res.send(req.body);
  }
});

// A GET request handler for `/update`
app.get('/update', function (req, res) {
  var dummyData = {
    username: 'testUser',
    data: '1234',
  };
  console.log('Received GET: ' + JSON.stringify(req.body));
  if (!req.query.username) {
    return res.send({ status: 'error', message: 'no username' });
  } else if (!req.query.data) {
    return res.send({ status: 'error', message: 'no data' });
  } else if (req.query.username !== dummyData.username) {
    return res.send({ status: 'error', message: 'username does not match' });
  } else {
    return res.send(dummyData);
  }
});

// Listen on port 8080
const listener = app.listen(8080, () => {
  console.log('http://localhost:' + listener.address().port);
});
