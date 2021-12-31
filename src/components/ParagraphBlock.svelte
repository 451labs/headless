<script>
  import { getContext } from 'svelte';

  export let block;

  const parser = getContext('parser');

  const doc = parser.load(block.innerHTML, null, false);
  const p = doc('p').html();
</script>

<p>{@html p}</p>
