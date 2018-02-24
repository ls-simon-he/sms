const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', express.static('build'));

app.post('/send', (req, res) => {
  const mobile = req.body.mobile;
  const message = req.body.message;
  const query = `message=${encodeURIComponent(message)}&to=${mobile}`;
  var options = {
      url: `https://api.transmitsms.com/send-sms.json?${query}`,
      method: 'POST',
      auth: {
          'user': '7d61d2b179db4132356e0144848ff748',
          'pass': 'secret'
      }
  };
  
  function callback(error, response, body) {
      console.log('body', body);
      if (!error && response.statusCode == 200) {
          console.log(body);
      }
  }
  
  console.log(req.body, options);
  request(options, callback);
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));