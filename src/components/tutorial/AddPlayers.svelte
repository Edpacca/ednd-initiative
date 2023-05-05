<script>
    import { CreatureType } from "../../lib/models/creature";
    import D20Button from "../common/buttons/D20Button.svelte";
    import PlayerIcon from "../common/buttons/PlayerIcon.svelte";


    import PlusMinusButton from "../common/buttons/PlusMinusButton.svelte";
    import RemoveButton from "../common/buttons/RemoveButton.svelte";
    import CreatureTable from "../initiativeTable/CreatureTable.svelte";

</script>

<ul>
    <li>Before starting the combat you need some characters and monsters in your tracker!</li>
    <li>Use the <PlusMinusButton type="+" onClick={undefined}/> and <PlusMinusButton type="-" onClick={undefined}/> to add and remove a player character</li>
    <li>Left-click the <span class="inline line-height"><PlayerIcon icon="Barbarian" class="gold"/></span> icon to change the class. Right click to cycle.</li>
    <li>Add a name, change the max HP and add their initiatve bonus</li>
    <li>Enter their initiative roll or click the <span class="inline line-height"><D20Button onClick={undefined}/></span> to roll for them</li>
    <li>Click the <span class="inline"><RemoveButton onClick={undefined}/></span> to remove that specific player</li>
</ul>
<hr/>
<h2>Players</h2>
<CreatureTable typeFilter={[CreatureType.Player]}/>
<hr>