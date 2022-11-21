<script lang="ts">
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
    $entities = $entities.slice(0, $entities.length - 2);
  }

</script>

<main>
  <div>
    <LockPage/>
    <button class="add-remove" on:click={addEntity}>+</button>
    <button class="add-remove" on:click={removeLastEntity}>-</button>
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
  }

  button {
    background: burlywood;
    margin: 2px;
    font-weight: bold;
    color: brown;
    border: 2px solid brown;
    border-radius: 2px;
  }

  button:hover {
    background: blanchedalmond;
    outline: 1px solid brown;
  }

  .add-remove {
    height: 40px;
    width: 40px;
  }
</style>