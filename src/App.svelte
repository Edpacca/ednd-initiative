<script lang="ts">
    import Entity from "./components/entity/Entity.svelte";
    import { entities } from "./store";
  
  const addEntity = () => {
    $entities = [...$entities, {
      name: "",
      initiative: undefined
    }]
  }

  const removeEntity = () => {
    $entities = $entities.slice(0, $entities.length - 2);
  }
</script>

<main>
  <div class="controls">
    <button on:click={addEntity}>+</button>
    <button on:click={removeEntity}>-</button>
  </div>
  <div class="headers">
    <div>Name</div>
    <div>Initiative</div>
  </div>
  <div>
    {#each $entities as entity}
      <Entity entity={entity}/>
    {/each}
  </div>
</main>

<style>
  main {
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .controls {
    display: flex;
  }

  button {
    height: 30px;
    width: 70px;
    background: burlywood;
    margin: 2px;
    font-weight: bold;
    color: brown;
    border: 2px solid brown;
    border-radius: 2px;
  }

  .headers {
    display: grid;
    grid-template-columns: 90% 1fr;
    text-align: left;
  }
</style>