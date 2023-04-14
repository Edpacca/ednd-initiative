<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
    import type { IconDescription } from "../../../lib/models/iconDescription";

    export let control: IconDescription;
</script>

<div>
    <Fa icon={control.icon}/>
    {control.description}
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
    }

</style>