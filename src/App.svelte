<script lang="ts">
  import { EntityType } from "./components/entity/entity";
  import InitiativeTable from "./components/initiative-table/InitiativeTable.svelte";
  import LockPage from "./components/tools/LockPage.svelte";
  import { entities, isLocked } from "./store";
</script>

<main>
  <div class="top-left-icon">
    <LockPage/>
  </div>
  <div class="table-container">
    {#if !$isLocked}
      <InitiativeTable isPlayerTable={true}/>
      <hr>
    {/if}
      <InitiativeTable/>
  </div>
</main>

<style>
  main {
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid brown;
    position: relative;
  }

  .top-left-icon {
    position: absolute;
    top: 0;
    left: 0;
    margin: 4px;
  }

  .table-container {
    max-width: 60vw
  }

  hr {
    margin: 2em 0
  }

</style>