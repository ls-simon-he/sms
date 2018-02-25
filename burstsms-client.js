const rp = require('request-promise');
const urlRegex = require('url-regex');
const reg = urlRegex();
const bitlyClient = require('./bitly-client');

// Convert mobile number like: 0430948926 to 61430948926
// @param string mobile
// @return string
function convertMobile(mobile) {
  return `61${mobile.substr(1)}`;
}

// Replace all the urls with the bitly ones in the message
// @param string message
// @return string
async function convertUrl(message) {
  const urls = message.match(reg);
  if (!urls || urls.length === 0) {
    return message;
  }
  const hashPromises = urls.map(async (url) => await bitlyClient.hashUrl(url));
  const encodedUrls = await Promise.all(hashPromises);
  urls.forEach((url, index) => {
    message = message.replace(url, encodedUrls[index]);
  });
  return message;
}

// Send message to mobile
// @param string mobile
// @param string message
// @return string
exports.send = async function (mobile, message) {
  mobile = convertMobile(mobile);
  message = await convertUrl(message);
  const query = `message=${encodeURIComponent(message)}&to=${mobile}`;
  const options = {
    url: `${process.env.burst_sms_host}?${query}`,
    method: 'POST',
    auth: {
      'user': process.env.burst_sms_api_key,
      'pass': process.env.burst_sms_secret
    }
  };
  const body = await rp(options);
  console.log('body', body);
  return body;
}
