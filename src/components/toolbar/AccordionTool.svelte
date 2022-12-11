<script>
    export let text;
    let isOpen = false;
</script>


<button on:click={() => isOpen = !isOpen} class="setting-toggle-button">{text}</button>
{#if isOpen}
    <div class="accordion">
        <slot></slot>
    </div>
{/if}

<style>
    .accordion {
        margin: 1rem 0;
    }
</style>