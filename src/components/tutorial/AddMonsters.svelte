<script>
    import Boss from "../../graphics/entity-types/boss.svelte";
    import Minion from "../../graphics/entity-types/minion.svelte";
    import { CreatureType } from "../../lib/models/creature";
    import CreatureToggle from "../common/buttons/CreatureToggle.svelte";

    import PlusMinusButton from "../common/buttons/PlusMinusButton.svelte";
    import CreatureTable from "../initiativeTable/CreatureTable.svelte";

</script>
<ul>
    <li>Before starting the combat you need some characters and monsters in your tracker!</li>
    <li>Use the <PlusMinusButton type="+" onClick={undefined}/> and <PlusMinusButton type="-" onClick={undefined}/> to add and remove monsters</li>
    <li>Some of the basic monsters data will autocomplete when you search the name</li>
    <li>Click the
        <span class="inline">
            <CreatureToggle type={CreatureType.Enemy} allowedTypes={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]}/>
        </span> 
        icon to change the monster type
    </li>
    <li>Minions <span class="inline"><Minion class="primary line-height"/></span> have a shared initiative but can be tracked separately</li>
    <li>Bosses <span class="inline"><Boss class="primary line-height"/></span> can track legendary actions</li>
</ul>
<hr/>
<h2>Enemies</h2>
<CreatureTable typeFilter={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]}/>
<hr>