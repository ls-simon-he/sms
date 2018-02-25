const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');
dotenv.load();
const burstSMSClient = require('./burstsms-client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('build'));

app.post('/send', async (req, res) => {
    const mobile = req.body.mobile || '';
    const message = req.body.message || '';
    if (mobile === '' || !/^0\d{9}$/.test(mobile)) {
        return res.status(400).send('bad mobile');
    }
    if (message === '' || message.length > 480) {
        return res.status(400).send('bad message');
    }
    try {
        await burstSMSClient.send(mobile, message);
        return res.send('success');
    } catch (error) {
        console.log(`Failed to send message: ${mobile}`, error);
        return res.status(500).send('error');
    }
});

app.listen(4000, () => console.log('SMS Demo app listening on port 4000!'));
