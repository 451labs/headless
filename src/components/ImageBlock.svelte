<script>
  import { getContext } from 'svelte';

  export let block, media

  const parser = getContext('parser');
  const doc = parser.load(block.innerHTML, null, false);

  const img = doc('img');
  const details = media.find( (el) => el.id === block.attrs.id );

  const caption = doc('figcaption').html();
</script>

<figure>
  <img src="{details.media_details.sizes.full.source_url}" alt="{img.attr('alt')}" width="{block.attrs.width}" height="{block.attrs.height}" />
  <figcaption>{@html caption}</figcaption>
</figure>
