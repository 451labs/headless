const blockParser = require('@wordpress/block-serialization-default-parser')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

function apiFetch() {

  const USER = process.env.WP_USER
  const PASS = process.env.WP_PASS
  const AUTH = 'Basic ' + Buffer.from(USER + ":" + PASS).toString('base64')

  const headers = new fetch.Headers()
  headers.append('Authorization', AUTH)

  return async function ( path, params={} ) {
    let querystring = '?context=edit';
    for (let [key, value] of Object.entries(params)) {
      value = Array.isArray(value) ? value.join(',') : value
      querystring += (`&${key}=${value}`);
    }

    return await fetch(`https://headless.marceloomens.com/wp-json/${path}/${querystring}`, {headers}).then((response) =>
      response.json()
    )
  }
}


module.exports = {
  apiFetch: apiFetch(),
  blockParser: blockParser.parse,
  domParser: cheerio,
}
