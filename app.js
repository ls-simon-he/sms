const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');

const API_HOST = 'https://api.transmitsms.com/send-sms.json';

dotenv.load();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('build'));

app.post('/send', (req, res) => {
  const mobile = req.body.mobile;
  const message = req.body.message;
  const query = `message=${encodeURIComponent(message)}&to=${mobile}`;
  var options = {
      url: `${API_HOST}?${query}`,
      method: 'POST',
      auth: {
          'user': process.env.user,
          'pass': process.env.pass
      }
  };
  function callback(error, response, body) {
      console.log('body', body);
      if (!error && response.statusCode == 200) {
          return res.send('success');
      }
      return res.status(500).send('failed');
  }
  request(options, callback);
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));