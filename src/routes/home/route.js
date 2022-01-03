const blockParser = require('@wordpress/block-serialization-default-parser');


module.exports = {
  // the all function returns an array of all of the 'request' objects of a route.
  // In this route, we're only returning one.
  // if all() is ommited, an array of [{slug: 'route-name'}] will be set.
  all: async () => [{ slug: '/' }],
  // the permalink definition takes a 'request' object and returns a relative permalink.
  permalink: '/', // this is the same as ({ request }) => `/${request.slug}/`;
  data: async ({ request, helpers }) => {

    const posts = await helpers.apiFetch('wp/v2/posts/', { _fields: ['id', 'slug', 'title', 'excerpt'] })
    const settings = await helpers.apiFetch('wp/v2/settings/')

    // The data function populates an object that will be in available in our Svelte template under the 'data' key.
    return {
      posts,
      settings
    };
  },

  // layout: 'Layout.svelte' // this is auto-detected.
};
