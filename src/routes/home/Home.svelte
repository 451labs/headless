<script>
  export let data, request, settings;
</script>

<svelte:head>
  <title>Home - Headless Wordpress</title>
  <meta name="description" content="Headless Wordpress" />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

<article>

<h1>Headless Wordpress</h1>

{#each data.posts as post}
  <h2>{@html post.title.rendered}</h2>
  <p>{post.id}: {post.slug}</p>
{/each}

</article>
