<script lang="ts">
  import DamageTool from "./components/damageTool/DamageTool.svelte";
  import InitiativeTable from "./components/initiativeTable/InitiativeTable.svelte";
  import LockPage from "./components/tools/LockPage.svelte";
  import { isLocked, isStarted } from "./store";

  const startBattle = () => {
    $isStarted = true;
    $isLocked = true;
  }
</script>

<main>
  <div class="top-right-icon">
      <LockPage/>
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
  <div class="damage-tool-container">
    <DamageTool/>
  </div>
</main>

<style>
  main {
    padding: 2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid brown;
    position: relative;
    column-gap: 2em;
  }

  .top-right-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px;
  }

  .table-container {
    max-width: 50em;
  }

  hr {
    margin: 2em 0
  }

  .damage-tool-container {
    align-self: flex-start;
  }
</style>