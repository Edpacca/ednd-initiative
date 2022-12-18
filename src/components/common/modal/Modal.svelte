<script lang="ts">
    export let isOpen: boolean;
    export let width = "15rem";
</script>

{#if isOpen}
<div class="modal-container" style={`width: ${width}`}>
    <div class="modal">
        <slot></slot>
    </div>
</div>
{/if}

<style>
    .modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        height: fit-content;
        background-color: var(--dark-grey-90);
        border: 2px solid var(--primary);
        border-radius: var(--border-radius);
        padding: 2rem;
    }

    .modal-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(3px);
        top: 0;
        left: 0;
    }
</style>