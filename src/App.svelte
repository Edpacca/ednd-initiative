<script lang="ts">
    import { onMount } from "svelte";
    import TurnTracker from "./components/common/TurnTracker.svelte";
    import EffectTable from "./components/effects/EffectTable.svelte";
    import CreatureTable from "./components/initiativeTable/CreatureTable.svelte";
    import InitiativeTable from "./components/initiativeTable/InitiativeTable.svelte";
    import LockedSwordsIcon from "./components/lockToggle/LockedSwordsIcon.svelte";
    import LogPanel from "./components/logger/LogPanel.svelte";
    import RollAll from "./components/rollAll/RollAll.svelte";
    import { setTheme } from "./components/toolbar/selectTheme/setTheme";
    import Toolbar from "./components/toolbar/Toolbar.svelte";
    import LockPage from "./components/tools/LockPage.svelte";
    import { CreatureType } from "./lib/models/creature";
    import { currentTheme, entities, isLocked } from "./store";

    onMount(async () => {
      setTheme($currentTheme);
    })
</script>

<Toolbar/>
<div class="main-grid">
  <main>
    {#if $entities.length > 0}
      <div class="top-right-icon">
          <LockPage/>
      </div>
    {/if}
    {#if $isLocked}
      <div class="toolbar">
        <TurnTracker/>
      </div>
    {:else if $entities.length > 0}
      <RollAll/>
    {/if}
    <div class="table-container">
      {#if !$isLocked}
        <h2>Players</h2>
        <CreatureTable typeFilter={[CreatureType.Player]}/>
        <hr>
        <h2>Enemies</h2>
        <CreatureTable typeFilter={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]}/>
        <hr>
        <h2>Effects</h2>
        <EffectTable/>
      {:else}
        <InitiativeTable/>
      {/if}
    </div>
  </main>
  {#if $isLocked}
    <LogPanel/>
  {/if}
</div>

<style>
  .main-grid {
    display: flex;
    flex-direction: row;
    /* grid-template-columns: 50vw 15vw */
  }

  main {
    padding: 2em 6em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--primary);
    border-radius: 4px;
    position: relative;
    row-gap: 2em;
    max-width: 50em;
    margin: auto;
    background: var(--dark-grey-90);
    z-index: 0;
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

  hr {
    margin: 2em 0
  }

</style>