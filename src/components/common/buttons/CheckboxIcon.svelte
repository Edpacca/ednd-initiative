<script lang="ts">
    export let isChecked: boolean;
    export let label = "";
    export let checkedColor = "var(--primary)"
    export let width = "3rem";
    export let isDisabled = false;
</script>

<div class="checkbox-icon-wrapper">
    {#if label}
        <div>{label}</div>
    {/if}
    <button disabled={isDisabled} class="checkbox-icon" class:checked-icon={isChecked} style={`--checked-color: ${checkedColor}; --width: ${width}`} on:click={() => isChecked = !isChecked}>
        <slot></slot>
    </button>
</div>

<style>
    .checkbox-icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .checkbox-icon {
        fill: var(--grey);
        width: var(--width);
        height: var(--height);
    }

    .checked-icon {
        fill: var(--checked-color);
    }

    button {
        background: none;
        border: none;
    }
</style>