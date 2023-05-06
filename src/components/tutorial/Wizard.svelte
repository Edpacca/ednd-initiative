<script>
    export let height = "6rem"
</script>

<img src="/ednd-initiative/images/edpacca_wizard.png" alt="wizard-friend" style="--wiz-height: {height}" class="wizard"/>

<style>
    .wizard {
        height: var(--wiz-height);
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
        animation: rotate 1000ms ease-out;
    }
</style>