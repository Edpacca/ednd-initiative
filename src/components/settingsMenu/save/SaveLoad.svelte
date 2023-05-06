<script>
    import { saveState } from "../../../store";
    import Save from "./Save.svelte";
    import Load from "../load/Load.svelte";
</script>

<Save/>
<hr class="sub-hr"/>
{#key $saveState}
    <Load/>
{/key}

<style>
    .sub-hr {
        margin: 1rem 20%;
        border-color: var(--dark-grey-90);
    }
</style>