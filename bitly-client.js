const BitlyClient = require('bitly');
const bitlyObj = BitlyClient(process.env.bitly_token);

// Hash Url with bitly
// @param string url
exports.hashUrl = async function(url) {
  const result = await bitlyObj.shorten(url);
  if (result.status_code === 200 && result.data) {
    return result.data.url;
  }
  throw new Error(result.status_txt);
}
