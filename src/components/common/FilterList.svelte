<script lang="ts">
    export let filtered: any[];
    export let key: string | undefined = undefined;
    export let filteredIndex = 0;
    // export let highlightedCondition: (index: number) => boolean;
    export let onLiClick: (t: any) => void;
</script>

<div class="filter-list">
    <ul>
        {#each filtered as f, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={() => onLiClick(f)} class:highlighted={i === filteredIndex}>
                {key ? f[key] : f}
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
        width: calc(100%);
        text-align: left;
        top: 1.8rem;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        z-index: 20;
    }

    li {
        list-style: none;
        border-top: 1px solid var(--light-grey);
        text-transform: capitalize;
        cursor: pointer;
    }

    li:hover {
        color: var(--white);
        background-color: var(--light-grey);
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