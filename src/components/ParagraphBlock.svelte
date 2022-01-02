<script>
  import { getContext } from 'svelte'

  export let block

  const ALLOWED_TAGS = ['strong','em','a','p']

  const parse = getContext('domParser')
  const dom = parse(block.innerHTML, { ALLOWED_TAGS })
  const p = dom.querySelector('p')
</script>

<p>{@html p.innerHTML}</p>
