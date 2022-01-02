<script>
  import { setContext } from 'svelte';
  import ImageBlock from '../../components/ImageBlock.svelte';
  import ParagraphBlock from '../../components/ParagraphBlock.svelte';
  import TableBlock from '../../components/TableBlock.svelte';

  export let data, request, settings, helpers;

  setContext('parse', helpers.domParser);

</script>

<svelte:head>
  <title>{data.post.title.rendered} - Headless Wordpress</title>
  <meta name="description" content="Headless Wordpress" />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

<article>

<h1>{data.post.title.rendered}</h1>

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
