<script lang="ts">
    export let value: number;
    export let isHidden = false;
</script>

<div class="spinners" class:hidden={isHidden}>
    <button on:click={() => value++}>+</button>
    <button on:click={() => value--}>-</button>
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
        border-width: 0px;
        width: 0.7rem;
        font-weight: bold;
    }

    button:hover {
        background: var(--light-grey);
    }

    .spinners button:first-child {
        border-radius: 0 0.2rem 0 0;
    }

    .spinners  button:last-child {
        border-radius: 0 0 0.2rem 0;
    }
</style>