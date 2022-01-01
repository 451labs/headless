module.exports = {
  all: async () => [{ post_id: 1, slug: 'hello-world' }, { post_id: 16, slug: 'collateral-freedom' }],
  permalink: '/article/:slug/', // this is the same as ({ request }) => `/${request.slug}/`;
  data: async ({ request, helpers }) => {

    let post = await helpers.apiFetch(`wp/v2/posts/${request.post_id}/`)
    let blocks = helpers.blockParser(post.content.raw)

    // preprocess media
    let mids = []
    for (const block of blocks) {
      if ('core/image' === block.blockName) {
        mids.push(block.attrs.id)
      }
    }
    let media = await helpers.apiFetch('wp/v2/media/', { include: mids.join(',') })

    // The data function populates an object that will be in available in our Svelte template under the 'data' key.
    return {
      post,
      blocks,
      media,
    };
  },
  // layout: 'Layout.svelte' // this is auto-detected.
};
