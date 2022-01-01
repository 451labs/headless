const fetch = require('node-fetch');
const blockParser = require('@wordpress/block-serialization-default-parser');


module.exports = {
  // the all function returns an array of all of the 'request' objects of a route.
  // In this route, we're only returning one.
  // if all() is ommited, an array of [{slug: 'route-name'}] will be set.
  all: async () => [{ slug: '/' }],
  // the permalink definition takes a 'request' object and returns a relative permalink.
  permalink: '/', // this is the same as ({ request }) => `/${request.slug}/`;
  data: async ({ request }) => {

    const USER = process.env.WP_USER
    const PASS = process.env.WP_PASS
    const AUTH = 'Basic ' + Buffer.from(USER + ":" + PASS).toString('base64')

    let headers = new fetch.Headers()
    headers.append('Authorization', AUTH)

    let posts = await fetch(`https://headless.marceloomens.com/wp-json/wp/v2/posts/?context=edit`, {headers}).then((response) =>
      response.json()
    )

    // The data function populates an object that will be in available in our Svelte template under the 'data' key.
    return {
      posts
    };
  },

  // layout: 'Layout.svelte' // this is auto-detected.
};
