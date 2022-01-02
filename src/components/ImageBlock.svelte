<script>
  import { getContext } from 'svelte'

  export let block, media

  const ALLOWED_TAGS = ['figure','img','figcaption']

  const parse = getContext('domParser')
  const dom = parse(block.innerHTML, { ALLOWED_TAGS })

  const img = dom.querySelector('img')
  const details = media.find( (el) => el.id === block.attrs.id )

  const figcaption = dom.querySelector('figcaption')
</script>

<figure>
  <img src="{details.media_details.sizes.full.source_url}" alt="{img.alt}" width="{block.attrs.width}" height="{block.attrs.height}" />
  <figcaption>{@html figcaption.innerHTML}</figcaption>
</figure>
