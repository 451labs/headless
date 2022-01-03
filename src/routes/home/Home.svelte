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
  <title>{data.settings.title}: {data.settings.description}</title>
  <meta name="description" content="{data.settings.title}: {data.settings.description}" />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>

<section>
  <h1>{data.settings.title}</h1>
  <h2>{data.settings.description}</h2>

</section>

<main>
  <div class="grid">
    {#each data.posts as post}
      <article>
        <h3><a href="/article/{post.slug}/">{@html post.title.rendered}</a></h3>
        <p>{post.excerpt.raw}</p>
      </article>
    {/each}
  </div>
</main>
