<script lang="ts">
    import PlusMinusButton from "./PlusMinusButton.svelte";
    export let isHidden;
    export let add: () => void;
    export let remove: () => void;

</script>
<div class="buttons" class:hidden={isHidden}>
    <PlusMinusButton type="+" onClick={add}/>
    <PlusMinusButton type="-" onClick={remove}/>
</div>