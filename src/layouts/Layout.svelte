<script>
  import style from '../../assets/style.css';
  export let templateHtml, settings;
</script>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    margin-bottom: 96px;
    padding: 1rem;
  }
  footer {
    padding: 2rem 0;
    background: #0B2627;
    border-top: 10px solid #e99043;
    bottom: 0;
    color: #f4f7fb;
    font-size: 14px;
    position: fixed;
    text-align: center;
    width: 100%;
  }
  footer a {
    color: #f4f7fb;
  }
  :global(ul li),
  :global(ol li) {
    margin-bottom: 0.3rem;
  }
</style>

<svelte:head>
</svelte:head>

<div class="container">
  {@html templateHtml}
</div>
<footer>Built with ❤ and <a href="https://elderguide.com/tech/elderjs/">Elder.js</a></footer>
