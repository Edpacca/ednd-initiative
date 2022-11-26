<script lang="ts">
  import PlusMinusButton from "./components/common/PlusMinusButton.svelte";
  import Entities from "./components/entity/Entities.svelte";
  import LockPage from "./components/tools/LockPage.svelte";
  import { entities } from "./store";
  
  const addEntity = () => {
    $entities = [...$entities, {
      name: "",
      initiative: undefined
    }]
  }

  const removeLastEntity = () => {
    $entities = $entities.slice(0, $entities.length - 1);
  }

</script>

<main>
  <div class="top-left-icon">
    <LockPage/>
  </div>
  <div class="buttons">
    <PlusMinusButton type="+" onClick={addEntity}/>
    <PlusMinusButton type="-" onClick={removeLastEntity}/>
  </div>
  {#if $entities.length > 0}
    <Entities/>
  {:else}
    <div>Slap some creatures in there!</div>
  {/if}
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

</style>