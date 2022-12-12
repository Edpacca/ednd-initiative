<script lang="ts">
    import PlusMinusButton from "./PlusMinusButton.svelte";
    export let isHidden = false;
    export let vertical = false;
    export let center = false;
    export let add: () => void;
    export let remove: () => void;
</script>

<div
    class="add-remove"
    class:vertical={vertical}
    class:hidden={isHidden}
    class:center={center}>
    <PlusMinusButton type="-" onClick={remove}/>
    <PlusMinusButton type="+" onClick={add}/>
</div>

<style>
    .add-remove {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    .vertical {
        flex-direction: column;
    }

    .center {
        justify-content: center;
    }
</style>