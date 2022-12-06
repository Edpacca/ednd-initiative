<script lang="ts">
    export let value = 0;
    export let showPlus = false;
    export let isHidden = false;
    $: valueString = showPlus && value > 0 ? "+"+value : value;
</script>

<div class="value-container" class:hidden={isHidden}>
    <input type="text" bind:value={valueString} hidden={isHidden}/>
    <div class="spinners">
        <button on:click={() => value++}>+</button>
        <button on:click={() => value--}>-</button>
    </div>
</div>

<style>
    input {
        width: 100%;
    }

    .value-container {
        position: relative;
        display: flex;
        flex-direction: row;
        height: 2.5rem;
    }

    .spinners {
        position: absolute;
        right: 0;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        height: 100%;
    }

    button {
        display: none;
    }

    .value-container:hover button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        background: var(--dark-grey);
        color: var(--white);
        border-width: 0px;
        width: 0.7rem;
    }  
    
    .value-container:hover button:hover {
        background: var(--light-grey);
    }

    .spinners button:first-child {
        border-radius: 0 0.2rem 0 0;
    }

    .spinners  button:last-child {
        border-radius: 0 0 0.2rem 0;
    }
</style>