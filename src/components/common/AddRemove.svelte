<script lang="ts">
    import PlusMinusButton from "./PlusMinusButton.svelte";
    export let isHidden = false;
    export let isVertial = false;
    export let add: () => void;
    export let remove: () => void;
</script>

<div class:vertical={isVertial} class:hidden={isHidden}>
    <PlusMinusButton type="+" onClick={add}/>
    <PlusMinusButton type="-" onClick={remove}/>
</div>

<style>
    .vertical {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>