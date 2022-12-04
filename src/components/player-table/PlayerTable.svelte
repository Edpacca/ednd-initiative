<script lang="ts">
import Heart from "../../assets/icons/heart.svelte";
    import Shield from "../../assets/icons/shield.svelte";
    import Speed from "../../assets/icons/speed.svelte";
    import { isLocked, players } from "../../store";
    import AddRemove from "../common/AddRemove.svelte";
    import { Entity, EntityType } from "../entity/entity";
    import PlayerRow from "./PlayerRow.svelte";

    const addPlayer = () => {
        $players = [...$players, new Entity(EntityType.Player)]
    }

    const removeLastPlayer = () => {
        $players = $players.slice(0, $players.length - 1);
    }

    const removePlayer = (pc: Entity) => {
        $players = $players.filter(e => e !== pc);
    }

</script>

<AddRemove isDisabled={$isLocked} add={addPlayer} remove={removeLastPlayer}/>
<table>
    <thead class="green">
        <th>Name</th>
        <th class="value-col">Icon</th>
        <th class="value-col"><div class="icon-header"><Shield/></div></th>
        <th class="value-col"><div class="icon-header"><Heart/></div></th>
        <th class="value-col">Bonus</th>
    </thead>
    <tbody>
        {#each $players as pc}
            <PlayerRow player={pc} removePlayer={() => removePlayer(pc)}/>
        {/each}
    </tbody>
</table>
