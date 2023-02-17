<script>
    import Castle from "./castle.svelte";
    import Portcullis from "./portcullis.svelte";

    let isUp = false;
</script>

<div class="castle-container">
    <Portcullis isUp={isUp}/>
    <Castle/>
</div>
<button on:click={() => isUp = !isUp}></button>

<style>
    .castle-container {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>