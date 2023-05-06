<script>
    import Cave from "../../graphics/icons/cave.svelte";
    import PlusMinusButton from "../common/buttons/PlusMinusButton.svelte";
    import EffectTable from "../effects/EffectTable.svelte";
</script>

<ul>
    <li>Effects are things you can track that aren't players or enemies</li>
    <li>Type a name and click the <span class="inline"><Cave class="blue line-height"/></span> icon to choose a theme if you want</li>
    <li>Use the <PlusMinusButton type="+" onClick={undefined}/> and <PlusMinusButton type="-" onClick={undefined}/> to add and remove counters</li>
    <li>Effects default to initiative 20</li>
</ul>
<hr/>
<h2>Effects</h2>
<EffectTable/>