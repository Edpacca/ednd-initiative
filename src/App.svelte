<script lang="ts">
    import { onMount } from "svelte";
    import { currentTheme, entities, isLocked, isStarted, isTutorialCompleted, isTutorialOpen } from "./store";
    import { setTheme } from "./lib/themeLib";
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
    import Tutorial from "./components/tutorial/Tutorial.svelte";

    onMount(async () => {
      setTheme($currentTheme);

      if (!$isTutorialCompleted) {
        $isTutorialOpen = true;
      }
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
{#if $isTutorialOpen}
  <Tutorial/>
{/if}

<style>

  .top-right-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: var(--padding);
    }

  .toolbar {
    display: grid;
    grid-template-columns: 1fr auto;
    width: 100%;
  }

  hr {
    margin: 2em 0
  }
</style>