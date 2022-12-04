<script lang="ts">
    import PlusMinusButton from "./PlusMinusButton.svelte";
    export let isDisabled;
    export let add: () => void;
    export let remove: () => void;

</script>
<div class="buttons" class:disabled={isDisabled}>
    <PlusMinusButton type="+" onClick={add}/>
    <PlusMinusButton type="-" onClick={remove}/>
</div>