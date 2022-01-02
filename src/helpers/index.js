const blockParser = require('@wordpress/block-serialization-default-parser')
const cheerio = require('cheerio')
const domPurifyFactory = require('dompurify')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

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

function sanitize() {
  const { window } = new JSDOM('<!DOCTYPE html>')
  const domPurify = domPurifyFactory(window)
  return function ( dirty, options ) {
    return domPurify.sanitize( dirty, options )
  }
}

module.exports = {
  apiFetch: apiFetch(),
  sanitize: sanitize(),
  /**
   * I'm abstracting away quite far from `blockParser` and `cheerio` by wrapping the
   * factory function instead of the factories. Is that desirable?
   */
  blockParser: blockParser.parse,
  domParser: cheerio.load,
}
