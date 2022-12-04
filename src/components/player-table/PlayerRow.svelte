<script lang="ts">
    import NumberInput from "../common/NumberInput.svelte";
    import RemoveButton from "../common/RemoveButton.svelte";
    import type { Entity } from "../entity/entity";
    import PlayerIcon from "./PlayerIcon.svelte";

    export let player: Entity;
    export let removePlayer: () => void;
</script>

<tr>
    <td class="player-row">
        <div class="xbutton">
            <RemoveButton onClick={removePlayer}/>
        </div>
        <input class="entity-input" type="text" bind:value={player.name} placeholder="Player"/>
    </td>
    <td>
        <PlayerIcon icon={player.icon}/>
    </td>
    <td>
        <NumberInput bind:value={player.ac}/>
    </td>
    <td>
        <NumberInput bind:value={player.hp}/>
    </td>
    <td>
        <NumberInput bind:value={player.bonus} showPlus={true}/>
    </td>
</tr>

<style>
    .player-row {
        display: grid;
        grid-template-columns: 1.5em 1fr;
        column-gap: calc((2.5em - 1.5em) / 2);
    }
</style>