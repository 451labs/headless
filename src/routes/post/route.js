const fetch = require('node-fetch');
const blockParser = require('@wordpress/block-serialization-default-parser');


module.exports = {
  all: async () => [{ post_id: 1, slug: 'hello-world' }, { post_id: 16, slug: 'collateral-freedom' }],
  permalink: '/article/:slug/', // this is the same as ({ request }) => `/${request.slug}/`;
  data: async ({ request }) => {

    const USER = process.env.WP_USER
    const PASS = process.env.WP_PASS
    const AUTH = 'Basic ' + Buffer.from(USER + ":" + PASS).toString('base64')

    let headers = new fetch.Headers()
    headers.append('Authorization', AUTH)

    let post = await fetch(`https://headless.marceloomens.com/wp-json/wp/v2/posts/${request.post_id}/?context=edit`, {headers}).then((response) =>
      response.json()
    )

    let blocks = blockParser.parse(post.content.raw)

    // preprocess media
    let mids = []
    for (const block of blocks) {
      if ('core/image' === block.blockName) {
        mids.push(block.attrs.id)
      }
    }
    let media = await fetch(`https://headless.marceloomens.com/wp-json/wp/v2/media/?context=edit&include=${mids.join(',')}`, {headers}).then((response) =>
      response.json()
    )

    // The data function populates an object that will be in available in our Svelte template under the 'data' key.
    return {
      post,
      blocks,
      media,
    };
  },
  // layout: 'Layout.svelte' // this is auto-detected.
};
