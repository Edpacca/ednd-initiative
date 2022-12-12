<script lang="ts">
    import { onMount } from "svelte";
    import { FLOATERS } from "./components/common/floater/animationValue";
    import Floater from "./components/common/floater/Floater.svelte";
    import TurnTracker from "./components/common/TurnTracker.svelte";
    import DamageTool from "./components/damage/Damage.svelte";
    import EffectTable from "./components/effects/EffectTable.svelte";
    import CreatureTable from "./components/initiativeTable/CreatureTable.svelte";
    import InitiativeTable from "./components/initiativeTable/InitiativeTable.svelte";
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
      <h1>Prepare...</h1>
      <h2>Players</h2>
      <CreatureTable typeFilter={[CreatureType.Player]}/>
      <hr>
      <h2>Enemies</h2>
      <CreatureTable typeFilter={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]}/>
      <hr>
      <h2>Effects</h2>
      <EffectTable/>
    {:else}
      <h1>Fight!</h1>
      <InitiativeTable/>
    {/if}
  </div>
</main>
<div class="damage-tool-large">
  {#each FLOATERS as floater}
    <Floater av={floater}/>
  {/each}
  <Floater/>
</div>

<style>
  main {
    padding: 2em 3em;
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

  .damage-tool-large {
    border: 2px solid var(--primary);
    height: 60vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    background-color: black;
  }

</style>