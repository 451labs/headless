<script>
  import { getContext } from 'svelte';

  export let block

  const parser = getContext('parser');

  const doc = parser.load(block.innerHTML, null, false);
  const img = doc('img');
  const caption = doc('figcaption').html();
</script>

<figure>
  <img src="{img.attr('src')}" alt="{img.attr('alt')}" width="{block.attrs.width}" height="{block.attrs.height}" />
  <figcaption>{@html caption}</figcaption>
</figure>
