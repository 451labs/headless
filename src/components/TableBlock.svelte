<script>
  import { getContext } from 'svelte'

  export let block

  const ALLOWED_TAGS = ['figure','table','thead','tbody','tfoot','tr','th','td','figcaption']

  const parse = getContext('domParser')
  const dom = parse(block.innerHTML, { ALLOWED_TAGS })

  function parseTableSection(selector) {
    const section = dom.querySelector(selector)
    let table = []
    for (let tr of section.rows) {
      let row = []
      for (let td of tr.cells) {
        row.push(td)
      }
      table.push(row)
    }
    return table
  }

  const table = {
    thead: parseTableSection('table>thead'),
    tbody: parseTableSection('table>tbody'),
    tfoot: parseTableSection('table>tfoot'),
  }
  const figcaption = dom.querySelector('figcaption')
</script>

<figure>
  <table border="1">
    {#if table.thead.length >  0 }
      <thead>
        {#each table.thead as tr}
          <tr>
            {#each tr as th}
              <th>{@html th.innerHTML}</th>
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
            <td>{@html td.innerHTML}</td>
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
            <td>{@html td.innerHTML}</td>
          {/each}
        </tr>
      {/each}
    </tfoot>
    {/if}
  </table>
  <figcaption>{@html figcaption.innerHTML}</figcaption>
</figure>
