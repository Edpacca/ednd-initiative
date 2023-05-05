<script>
    import { CreatureType } from "../../lib/models/creature";
    import RollAll from "../rollAll/RollAll.svelte";
    import DemoCreatureTable from "./DemoCreatureTable.svelte";
    import DemoEffectTable from "./DemoEffectTable.svelte";

</script>
<ul>
    <li>The big D20 button lets you can roll initiative for everything!</li>
    <li>This ONLY rolls intiatives that do not already have a value</li>
    <li>You can choose which types of entities you will roll for</li>
    <li>If "Re-roll" is checked then you will overwrite already rolled initiatives</li>
</ul>
<hr/>
<RollAll/>
<div class="scroll-window">
    <DemoCreatureTable/>
    <DemoEffectTable/>
</div>

<style>

</style>