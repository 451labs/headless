<script>
  import { getContext } from 'svelte';

  export let block

  const parser = getContext('parser')

  const root = parser.parse(block.innerHTML)
  const content = root.rawText
</script>

<p>{content}</p>
