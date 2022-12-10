<script lang="ts">
    export let bonus = 0;

    $: bonusString = bonus > 0 ? "+"+bonus : bonus;

    const setBonus = (diff: number) => {
        bonus += diff;
    }
</script>

<div class="bonus-container">
    <input class="bonus" type="text" bind:value={bonusString}/>
    <div class="spinners">
        <button on:click={() => setBonus(1)}>+</button>
        <button on:click={() => setBonus(-1)}>-</button>
    </div>
</div>

<style>
    input {
        width: 100%;
    }

    .bonus-container {
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

    .bonus-container:hover button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        background: var(--secondary);
        color: var(--primary);
        border-width: 0px;
        width: 0.7rem;
    }  
    
    .bonus-container:hover button:hover {
        background: blanchedalmond;
    }

    .spinners button:first-child {
        border-radius: 0 var(--border-radius) 0 0;
    }

    .spinners  button:last-child {
        border-radius: 0 0 var(--border-radius) 0;
    }
</style>