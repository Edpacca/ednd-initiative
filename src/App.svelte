<script lang="ts">
    import TurnTracker from "./components/common/TurnTracker.svelte";
    import DamageTool from "./components/damageTool/DamageTool.svelte";
    import InitiativeTable from "./components/initiativeTable/InitiativeTable.svelte";
    import LockPage from "./components/tools/LockPage.svelte";
    import { entities, isLocked } from "./store";
</script>

<main>
  {#if $entities.length > 0}
    <div class="top-right-icon">
        <LockPage/>
    </div>
  {/if}
  <div class="toolbar">
    <TurnTracker/>
    <DamageTool/>
  </div>
  <div class="table-container">
    {#if !$isLocked}
      <h2>Players</h2>
      <InitiativeTable isPlayerTable={true}/>
      <hr>
      <h2>Enemies</h2>
    {/if}
    <InitiativeTable/>
  </div>
</main>

<style>
  main {
    padding: 2em 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid brown;
    position: relative;
    row-gap: 2em;
    max-width: 50em;
    margin: auto;
  }

  .toolbar {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
  }

  .top-right-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px;
  }

  .table-container {

  }

  hr {
    margin: 2em 0
  }
</style>