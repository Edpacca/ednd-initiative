<script lang="ts">
    import { fade } from "svelte/transition";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import Modal from "../../common/modal/Modal.svelte";
    import Damage from "../../damage/Damage.svelte";
    import { appendConditionToCurrentLog } from "../../../lib/logger";
    import CreatureInputLocked from "../locked/CreatureInputLocked.svelte";
    import Conditions from "./Conditions.svelte";
    import type { FocusType } from "../../../lib/models/focusType";
    import HpValue from "./HpValue.svelte";
    import { onMount } from "svelte";
    import { isTutorialOpen } from "../../../store";
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    export let creature: Creature;
    export let isSelected = false;
    export let selectedIndex = 0;
    let index = 0;

    const submitCondition = (condition: string) => {
        if (condition && !creature.conditions[selectedIndex].includes(condition)) {
            creature.conditions[selectedIndex] = [...creature.conditions[selectedIndex], condition];
            appendConditionToCurrentLog(creature, condition, selectedIndex);
        }
    }

    const removeCondition = (condition: string) => {
        creature.conditions[selectedIndex] = creature.conditions[selectedIndex].filter(c => c !== condition);
    }

    let damageInput: HTMLInputElement;
    let healingInput: HTMLInputElement;
    let conditionInput: HTMLInputElement;

    let focused: FocusType = "damage";
    let conditionInputValue = "";
    const isMinion = creature.type === CreatureType.Minion

    const keyboardInput = async (event: KeyboardEvent) => {
        if (isSelected) {
            if (event.key === "Tab") {
                event.preventDefault();
                switch(focused) {
                    case "damage":
                        healingInput.focus();
                        focused = "healing";
                        break;
                    case "healing":
                        conditionInput.focus();
                        focused = "condition";
                        break;
                    case "condition":
                        if (conditionInputValue) {
                            conditionInput.focus();
                            conditionInput.select();
                        } else {
                            damageInput.focus();
                            focused = "damage";
                            break;
                        }
                }
                event.stopImmediatePropagation();
            } else if (event.key === "Escape") {
                isSelected = false;
            }
            event.stopPropagation();
        }
    }
</script>

{#if isSelected}

    <div class="relative creature-modal">
        <Modal bind:isOpen={isSelected} width="40rem">
            {#if $isTutorialOpen}
                <div class="tutorial-modal">
                    <ul>
                        <li>Press tab to cycle between damage healing and conditions</li>
                        <li>You can scroll or enter a number in the damage or heal icons</li>
                        <li>Press the button or hit enter to submit the damage / healing</li>
                        <li>Start typing a condition or enter a custom one</li>
                        <li>Hit enter or click the <span class="inline"><PlusMinusButton type="+" onClick={undefined} width="1.5rem"/></span> to add a condition</li>
                        <li>For minions, select which one you want to target first by clicking the number</li>
                        <li>Press ESC to close</li>
                    </ul> 
                </div>
            {/if}
            <div class="close-button">
                <RemoveButton onClick={() => isSelected = false}/>
            </div>
            <div in:fade>
                <div class="creature-info">
                    <CreatureIconSelect type={creature.type} playerClass={creature.playerClass}/>
                    <CreatureInputLocked creature={creature} bind:index bind:selectedIndex bind:isSelected/>
                    {#if isMinion}
                        <div class="minion-hp-container">
                            {#each Array(creature.quantity) as m, i}
                                <HpValue value={creature.hpCurrent[i]} valueMax={creature.hpMax} class="minion-hp" disabled={i !== selectedIndex}/>
                            {/each}
                        </div>
                    {:else}
                        <HpValue value={creature.hpCurrent[0]} valueMax={creature.hpMax}/>
                    {/if}
                </div>

                <div class="modal-control-grid">
                    <div class="damage-container">
                        <Damage bind:creature bind:damageInput bind:healingInput bind:focused index={selectedIndex}/>
                    </div>
                    <Conditions
                        bind:conditions={creature.conditions[selectedIndex]}
                        bind:conditionInput
                        bind:focused
                        bind:value={conditionInputValue}
                        submitCondition={submitCondition}
                        removeCondition={removeCondition}>
                        {#if isMinion}
                            <div class="selected-minion">{creature.name} #{selectedIndex + 1}</div>
                        {/if}
                    </Conditions>
                </div>
            </div>
        </Modal>
    </div>
{/if}
<svelte:window on:keyup={e => keyboardInput(e)}/>

<style>
.tutorial-modal {
    position: absolute;
    z-index: 150;
    border: 2px solid var(--white);
    top: -18rem;
    background-color: var(--black);
    padding: 1rem;
    border-radius: var(--border-radius);
}

.creature-modal {
    z-index: 50;
}

.close-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
}

.creature-info {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    padding-top: 1rem;
}

.modal-control-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 2rem;
}

.damage-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.selected-minion {
    font-size: var(--fontsize-L);
    font-weight: bold;
    color: var(--gold);
}

.minion-hp-container {
    padding-top: var(--input-height);
}
</style>