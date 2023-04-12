<script lang="ts">
    import { onMount } from "svelte";
    import { currentTheme, entities, isLocked, isStarted, zoomLevel } from "./store";
    import { setTheme } from "./components/settingsMenu/selectTheme/themeLib";
    import { CreatureType } from "./lib/models/creature";
    import TurnTracker from "./components/turnTracker/TurnTracker.svelte";
    import EffectTable from "./components/effects/EffectTable.svelte";
    import CreatureTable from "./components/initiativeTable/CreatureTable.svelte";
    import InitiativeTable from "./components/initiativeTable/InitiativeTable.svelte";
    import LogPanel from "./components/logger/LogPanel.svelte";
    import RollAll from "./components/rollAll/RollAll.svelte";
    import SettingsMenu from "./components/settingsMenu/SettingsMenu.svelte";
    import LockPage from "./components/lockToggle/LockPage.svelte";
    import CastleAnimation from "./graphics/animations/castle/CastleAnimation.svelte";

    onMount(async () => {
      setTheme($currentTheme);
    });
</script>

<SettingsMenu/>
<main>
  <!-- <div class="animation-container">
    <CastleAnimation/>
  </div> -->
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
{#if $isStarted}
  <LogPanel/>
{/if}

<style>
  main {
    padding: 2rem 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--primary);
    border-radius: 4px;
    position: relative;
    max-width: 50rem;
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
    margin: 2rem;
  }

  hr {
    margin: 2em 0
  }
</style>