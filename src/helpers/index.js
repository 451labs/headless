const blockParser = require('@wordpress/block-serialization-default-parser')
const cheerio = require('cheerio')
const fetch = require('node-fetch')


async function apiFetch( path, querystring='' ) {
  const USER = process.env.WP_USER
  const PASS = process.env.WP_PASS
  const AUTH = 'Basic ' + Buffer.from(USER + ":" + PASS).toString('base64')

  const headers = new fetch.Headers()
  headers.append('Authorization', AUTH)

  return await fetch(`https://headless.marceloomens.com/wp-json/${path}/?context=edit&${querystring}`, {headers}).then((response) =>
    response.json()
  )
}


module.exports = {
  apiFetch,
  blockParser: blockParser.parse,
  parser: cheerio,
}
