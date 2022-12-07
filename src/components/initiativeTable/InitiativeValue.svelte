<script>
    import { entities } from "../../store";
    export let initiative;
    export let bonus = 0;

    $: total = initiative + bonus;
</script>

<input type="number" bind:value={total} tabindex={1}/>

<style>
    input[type=number] {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        color: goldenrod;
        background: none;
        font-size: 28px;
        border: 2px solid grey;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }   

    input[type=number] {
        -moz-appearance: textfield;
    }
</style>    