<script lang="ts">
    export let list: string[];
    export let highlightedIndex = 0;
    export let onLiClick: (t: unknown) => void;
</script>

<div class="filter-list">
    <ul>
        {#each list as item, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li 
                class:highlighted={i === highlightedIndex}
                on:mouseenter={() => highlightedIndex = i}
                on:click={() => onLiClick(item)}> 
                {item}
            </li>
        {/each}
    </ul>
</div>

<style>
    .filter-list {
        position: absolute;
        background: var(--dark-grey);
        color: var(--light-grey);
        border: 1px solid var(--light-grey);
        border-top: none;
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        width: calc(100%);
        max-height: 15rem;
        text-align: left;
        top: 2.7rem;
        display: flex;
        flex-direction: column;
        z-index: 20;
    }

    li {
        list-style: none;
        border-top: 1px solid var(--light-grey);
        text-transform: capitalize;
        cursor: pointer;
        z-index: 21;
    }

    ul {
        padding: 0 0.5rem;
        max-height: 20rem;
        overflow-y: scroll;
        margin: 0.5rem 0;
    }

    .highlighted {
        background: var(--light-grey);
        color: var(--white);
    }
</style>