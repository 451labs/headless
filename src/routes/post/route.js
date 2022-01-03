module.exports = {
  all: async () => [{ post_id: 1, slug: 'hello-world', title: 'Hello World!' }, { post_id: 16, slug: 'collateral-freedom', title: 'Collateral Freedom' }],
  permalink: '/article/:slug/', // this is the same as ({ request }) => `/${request.slug}/`;
  data: async ({ request, helpers }) => {

    const post = await helpers.apiFetch(`wp/v2/posts/${request.post_id}/`)
    const blocks = helpers.blockParser(post.content.raw)

    // preprocess media
    let mids = []
    for (const block of blocks) {
      if ('core/image' === block.blockName) {
        mids.push(block.attrs.id)
      }
    }
    const media = await helpers.apiFetch('wp/v2/media/', { include: mids })

    // The data function populates an object that will be in available in our Svelte template under the 'data' key.
    return {
      post,
      blocks,
      media,
    };
  },
  // layout: 'Layout.svelte' // this is auto-detected.
};
