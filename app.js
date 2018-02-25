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
    try {
        await burstSMSClient.send(req.body.mobile, req.body.message);
        return res.send('success');
    } catch (error) {
        console.log(`Failed to send message: ${req.body.mobile}`, error);
        return res.status(500).send('error');
    }
});

app.listen(4000, () => console.log('SMS Demo app listening on port 4000!'));
