<script lang="ts">
    export let list: string[];
    export let highlightedIndex = 0;
    export let onLiClick: (t: unknown) => void;
</script>

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

<style>

    li {
        list-style: none;
        border-top: 1px solid var(--light-grey);
        text-transform: capitalize;
        cursor: pointer;
        z-index: 21;
    }

    ul {
        padding: 0 0.5rem;
        margin: 0.5rem 0;
    }

    .highlighted {
        background: var(--light-grey);
        color: var(--white);
    }
</style>