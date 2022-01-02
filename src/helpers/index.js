function __factoryWrapper( factory, fn ) {
  const f = require(factory)
  return f[fn]
}

function apiFetch() {
  const fetch = require('node-fetch')

  const USER = process.env.WP_USER
  const PASS = process.env.WP_PASS
  const AUTH = 'Basic ' + Buffer.from(USER + ":" + PASS).toString('base64')

  const headers = new fetch.Headers()
  headers.append('Authorization', AUTH)

  return async function ( path, params={} ) {
    let querystring = '?context=edit'
    for (let [key, value] of Object.entries(params)) {
      value = Array.isArray(value) ? value.join(',') : value
      querystring += (`&${key}=${value}`)
    }

    return await fetch(`https://headless.marceloomens.com/wp-json/${path}/${querystring}`, {headers}).then((response) =>
      response.json()
    )
  }
}

function domParser() {
  const createDOMPurify = require('dompurify')
  const { JSDOM } = require('jsdom')
  /**
   * How can this factory function and how can these instances of jsdom and
   * dompurify be optimised for our specific use case?
   */
  const window = new JSDOM('<!DOCTYPE html>').window
  const DOMPurify = createDOMPurify(window)
  /**
   * Is this going to work across multiple cores? Should `JSDOM` be
   * instantiated for each process? How about `DOMPurify`?
   */
  return function ( dirty, options={} ) {
    return DOMPurify.sanitize(dirty, { ...options, RETURN_DOM: true})
  }
}

module.exports = {
  apiFetch: apiFetch(),
  blockParser: __factoryWrapper('@wordpress/block-serialization-default-parser', 'parse'),
  domParser: domParser(),
}
