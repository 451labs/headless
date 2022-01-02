<script>
  import { getContext } from 'svelte';

  export let block;

  const parse = getContext('parse');

  const doc = parse(block.innerHTML, null, false);
  const p = doc('p').html();
</script>

<p>{@html p}</p>
