<script>
    import Castle from "./castle.svelte";
    import Portcullis from "./portcullis.svelte";

    let isUp = false;
</script>

<div class="castle-container">
    <Castle/>
    <Portcullis isUp={isUp}/>
</div>
<button on:click={() => isUp = !isUp}></button>

<style>
    .castle-container {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>