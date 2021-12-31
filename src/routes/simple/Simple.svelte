<script>
  import { setContext } from 'svelte';
  import ImageBlock from '../../components/ImageBlock.svelte';
  import ParagraphBlock from '../../components/ParagraphBlock.svelte';
  import TableBlock from '../../components/TableBlock.svelte';

  export let data, request, settings;

  setContext('parser', data.parser);

</script>

<style>
  a {
    margin-bottom: 1rem;
    display: inline-block;
  }
</style>

<svelte:head>
  <title>Simple</title>
  <meta name="description" content="A Simple Route" />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

<a href="/">&LeftArrow; Home</a>

<article>

<h1>Headless post</h1>

{#each data.blocks as block}
  {#if 'core/paragraph' === block.blockName}
    <ParagraphBlock block={block} />
  {:else if 'core/image' === block.blockName}
    <ImageBlock block={block} />
  {:else if 'core/table' === block.blockName}
    <TableBlock block={block} />
  {/if}
{/each}

</article>

<h1>Posts</h1>

{#each data.posts as post}

  <article>
    <h2>{post.title.rendered}</h2>
    <p>{@html post.content.rendered}</p>
  </article>

{/each}
