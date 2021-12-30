<script>
  export let data, request, settings;
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

  <code>{block.blockName}</code>

{/each}

</article>

<h1>Posts</h1>

{#each data.posts as post}

  <article>
    <h2>{post.title.rendered}</h2>
    <p>{@html post.content.rendered}</p>
  </article>

{/each}
