<script lang="ts">
    import Enemy from "../../graphics/entity-types/enemy.svelte";
import Player from "../../graphics/entity-types/player.svelte";
    import Cave from "../../graphics/icons/cave.svelte";
import { dRoll } from "../../lib/dieRoll";
    import type { EntityType } from "../../lib/models/entity";
    import { entities } from "../../store";
    import CheckboxIcon from "../common/buttons/CheckboxIcon.svelte";
    import D20Button from "../common/buttons/D20Button.svelte";

    let rollingPlayers = false;
    let rollingEnemies = true;
    let rollingEffects = false;
    let overwrite = false;
    $: rollingAll = rollingPlayers && rollingEnemies && rollingEffects;

    $: message = rollingAll ? "Roll all unrolled initiatives" 
        : `Roll initiative for unrolled ${rollingPlayers ? " Players" : ""}${rollingEnemies ? " Enemies" : ""}${rollingEffects ? " Effects" : ""}`;

    const rollAll = (typeFilter: EntityType | undefined) => {
        if (!typeFilter) {
            const buffer = $entities.map(e => {
                if (overwrite) {
                    e.initiative = dRoll(20);
                } else if (!e.initiative) {
                    e.initiative = dRoll(20);
                }
                return e;
            });

            $entities = buffer;
        }
    }

</script>

<div class="roll-all-container">
    <div class="roll-all-icons">
            <CheckboxIcon bind:isChecked={rollingPlayers} checkedColor="var(--gold)">
                <Player/>
            </CheckboxIcon>
            <CheckboxIcon bind:isChecked={rollingEnemies} checkedColor="var(--primary)">
                <Enemy/>
            </CheckboxIcon>   
            <CheckboxIcon bind:isChecked={rollingEffects} checkedColor="var(--blue)">
                <Cave/>
            </CheckboxIcon>
            <div class="checkbox">
                <label for="overwrite-initiative">Override</label>
                <input type="checkbox" id="overwrite-initiative"/>
            </div>
    </div>
    <div class="text-center message">{message}</div>
    <D20Button primary="var(--gold)" secondary="var(--white)" width="4rem" onClick={() => rollAll(undefined)}/>
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

    input {
        width: 2rem;
        height: 2rem;
    }

    input:focus {
        outline: none;
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
