<script lang="ts">
    export let value: number;
    export let isHidden = false;

    export let onValueChange: (difference: number) => void = () => {};

    const increase = () => {
        value++;
        onValueChange(1);
    }

    const decrease = () => {
        value--;
        onValueChange(-1);
    }
</script>

<div class="spinners" class:hidden={isHidden}>
    <button on:click={increase}>+</button>
    <button on:click={decrease}>-</button>
</div>

<style>
    .spinners {
        position: absolute;
        right: 0;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        height: 100%;
    }
    
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        background: var(--dark-grey);
        color: var(--white);
        border-width: 0;
        width: 0.7rem;
        font-weight: bold;
    }

    button:hover {
        background: var(--light-grey);
    }

    .spinners button:first-child {
        border-radius: 0 var(--border-radius) 0 0;
    }

    .spinners  button:last-child {
        border-radius: 0 0 var(--border-radius) 0;
    }
</style>