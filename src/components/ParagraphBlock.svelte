<script>
  import { getContext } from 'svelte';

  export let block;

  const sanitize = getContext('sanitize');
  const p = sanitize(block.innerHTML, {ALLOWED_TAGS: ['strong','em','a']});
</script>

<p>{@html p}</p>
