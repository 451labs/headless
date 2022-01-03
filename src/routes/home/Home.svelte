<script>
  export let data, request, settings;
</script>

<style>
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin: 3rem 0;
}
article {
  padding: 1rem;
  border: 1px solid #0B2627;
  border-radius: 1rem;
  background: #f4f7fb;
}
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>

<svelte:head>
  <title>Home - {data.settings.title}</title>
  <meta name="description" content="{data.settings.description}" />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

<h1>{data.settings.title}</h1>
<h2>{data.settings.description}</h2>

<div class="grid">

  {#each data.posts as post}
    <article>
      <h2><a href="/article/{post.slug}/">{@html post.title.rendered}</a></h2>
      <p>{post.excerpt.raw}</p>
    </article>
  {/each}

</div>
