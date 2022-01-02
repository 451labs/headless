<script>
  import { getContext } from 'svelte';

  export let block

  const parse = getContext('parse');
  const doc = parse(block.innerHTML, null, false);

  function parseTableSection(section, cells='td') {
    let result = [];
    doc(`${section} tr`).each( (_i, tr) => {
      let row = [];
      doc(cells, tr).each( (_i, td) => {
        row.push(doc(td).html());
      } );
      result.push(row);
    });
    return result;
  }

  const table = {
    thead: parseTableSection('thead', 'th'),
    tbody: parseTableSection('tbody'),
    tfoot: parseTableSection('tfoot'),
  };
  const caption = doc('figcaption').html();
</script>

<figure>
  <table border="1">
    {#if table.thead.length >  0 }
      <thead>
        {#each table.thead as tr}
          <tr>
            {#each tr as th}
              <th>{@html th}</th>
            {/each}
          </tr>
        {/each}
      </thead>
    {/if}
    {#if table.tbody.length >  0 }
    <tbody>
      {#each table.tbody as tr}
        <tr>
          {#each tr as td}
            <td>{@html td}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
    {/if}
    {#if table.tfoot.length >  0 }
    <tfoot>
      {#each table.tfoot as tr}
        <tr>
          {#each tr as td}
            <td>{@html td}</td>
          {/each}
        </tr>
      {/each}
    </tfoot>
    {/if}
  </table>
  <figcaption>{@html caption}</figcaption>
</figure>
