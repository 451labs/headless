<script>
  import { setContext } from 'svelte'
  import ImageBlock from '../../components/ImageBlock.svelte'
  import ParagraphBlock from '../../components/ParagraphBlock.svelte'
  import TableBlock from '../../components/TableBlock.svelte'

  export let data, request, settings, helpers

  setContext('domParser', helpers.domParser)

</script>

<svelte:head>
  <title>{data.settings.title}: {data.post.title.rendered}</title>
  <meta name="description" content="{data.settings.title}: {data.post.title.rendered}" />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>


<section>
  <h1>{data.settings.title}</h1>
  <h2>{data.post.title.rendered}</h2>
</section>

<article>
{#each data.blocks as block}
  {#if 'core/paragraph' === block.blockName}
    <ParagraphBlock block={block} />
  {:else if 'core/image' === block.blockName}
    <ImageBlock block={block} media={data.media} />
  {:else if 'core/table' === block.blockName}
    <TableBlock block={block} />
  {/if}
{/each}
</article>
