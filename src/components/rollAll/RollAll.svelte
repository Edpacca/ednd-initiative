<script lang="ts">
    import { slide } from "svelte/transition";
    import Enemy from "../../graphics/entity-types/enemy.svelte";
    import Player from "../../graphics/entity-types/player.svelte";
    import Cave from "../../graphics/icons/cave.svelte";
    import { dRoll } from "../../lib/dieRoll";
    import { CreatureType } from "../../lib/models/creature";
    import { EffectType } from "../../lib/models/effect";
    import { ENEMY_CREATURE_TYPES } from "../../lib/models/typeFilters";
    import { activeEntityTurnIndex, currentRound, entities, hasHelpTooltips } from "../../store";
    import CheckboxIcon from "../common/buttons/CheckboxIcon.svelte";
    import D20Button from "../common/buttons/D20Button.svelte";
    import Tooltip from "../common/tooltip/Tooltip.svelte";

    let rollingPlayers = false;
    let rollingEnemies = true;
    let rollingEffects = false;
    let override = false;
    $: rollingAll = rollingPlayers && rollingEnemies && rollingEffects;
    $: messageFirst = override ? "Re-roll initiative rolls for" : rollingAll ? "Roll initiative for all unrolled entities" : "Roll initiative for unrolled";
    $: messageSecond = rollingAll ? !override ? "" : "all entities" : `${rollingPlayers ? " Players" : ""}${rollingEnemies ? " Enemies" : ""}${rollingEffects ? " Effects" : ""}`;
    $: message = `${messageFirst} ${messageSecond}`;

    const rollAll = () => {

        let typeFilter = [];
        if (rollingPlayers) typeFilter.push(CreatureType.Player);
        if (rollingEffects) typeFilter.push(EffectType.Effect);
        if (rollingEnemies) typeFilter = typeFilter.concat(ENEMY_CREATURE_TYPES);

        const buffer = $entities.map(e => {
            if (typeFilter.includes(e.type) && (override || !e.initiative)) {
                    e.initiative = dRoll(20) + e.bonus;
                }
            return e;
        });

        $entities = buffer;
        $activeEntityTurnIndex = 0;
        $currentRound = 1;
    }
</script>

<div class="roll-all-container" transition:slide>
    <Tooltip text="Roll initiative for selected" type="help">
        <D20Button primary="var(--gold)" secondary="var(--white)" width="5rem" onClick={() => rollAll()}/>
    </Tooltip>
    {#if $hasHelpTooltips}
        <div class="text-center message">{message}</div>
    {/if}
    <div class="roll-all-icons">
        <Tooltip text="select all PCs" type="help">
            <CheckboxIcon 
                bind:isChecked={rollingPlayers}
                isDisabled={!rollingEnemies && !rollingEffects}
                checkedColor="var(--gold)">
                <Player/>
            </CheckboxIcon>
        </Tooltip>
        <Tooltip text="select all enemies" type="help">
            <CheckboxIcon 
                bind:isChecked={rollingEnemies}
                isDisabled={!rollingPlayers && !rollingEffects}
                checkedColor="var(--primary)">
                <Enemy/>
            </CheckboxIcon>   
        </Tooltip>
        <Tooltip text="select all effects" type="help">
            <CheckboxIcon 
                bind:isChecked={rollingEffects}
                isDisabled={!rollingPlayers && !rollingEnemies}
                checkedColor="var(--blue)">
                <Cave/>
            </CheckboxIcon>
        </Tooltip>
        <div class="checkbox">
            <label for="overwrite-initiative">Re-roll</label>
            <Tooltip text="Overwrite already rolled values" type="help">
                <input type="checkbox" id="overwrite-initiative" bind:checked={override}/>
            </Tooltip>
        </div>
    </div>
</div>

<style>
    .roll-all-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .roll-all-icons {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
    }

    .message {
        font-size: var(--fontsize-L);
        margin-top: 0.5rem;
    }

    label {
        font-size: var(--fontsize-S);
    }

    .checkbox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
