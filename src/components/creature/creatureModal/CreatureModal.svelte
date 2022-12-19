<script lang="ts">
    import type { Creature } from "../../../lib/models/creature";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import Modal from "../../common/modal/Modal.svelte";
    import Damage from "../../damage/Damage.svelte";
    import CreatureInputLocked from "../locked/CreatureInputLocked.svelte";
    import Conditions from "./Conditions.svelte";
    import HpValue from "./HpValue.svelte";
    export let creature: Creature;
    export let isSelected = false;

    const submitCondition = (condition: string) => {
        if (condition && !creature.conditions.includes(condition)) {
            creature.conditions = [...creature.conditions, condition];
        }
    }

    const removeCondition = (condition: string) => {
        creature.conditions = creature.conditions.filter(c => c !== condition);
    }

    let damageInput: HTMLInputElement;
    let healingInput: HTMLInputElement;
    let conditionInput: HTMLInputElement;

    let focused: "damage" | "healing" | "condition" = "damage";

    const keyboardInput = async (event: KeyboardEvent) => {
        if (isSelected) {
            if (event.key === "Tab") {
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
                        damageInput.focus();
                        focused = "damage";
                        break;
                }
            // } else if (event.key === "Enter") {
            //     submitEnter(focused);
            // }   
            }
        }
    }
    
    const submitEnter = (type: "damage" | "healing") => {
        // if (type === "damage") applyDamage();
        // else applyHealing();
    }
</script>

{#if isSelected}
<div class="relative creature-modal">
    <Modal bind:isOpen={isSelected} width="80vw">
        <div class="close-button">
            <RemoveButton onClick={() => isSelected = false}/>
        </div>
        <div class="modal-grid">
            <div>
                <div class="creature-info">
                    <CreatureIconSelect type={creature.type} playerClass={creature.class}/>
                    <CreatureInputLocked creature={creature}/>
                    <HpValue value={creature.hpCurrent} valueMax={creature.hpMax}/>
                </div>
                <div class="damage-container">
                    <Damage bind:creature bind:damageInput bind:healingInput bind:focused/>
                </div>
            </div>
            <Conditions 
                bind:conditions={creature.conditions}
                bind:conditionInput
                submitCondition={submitCondition}
                removeCondition={removeCondition}/>
        </div>
    </Modal>
</div>
{/if}
<svelte:window on:keyup={e => keyboardInput(e)}/>

<style>
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
}

.modal-grid {
    display: grid;
    grid-template-columns: 70% 1fr;
    column-gap: 1rem;
    padding-top: 2rem;
}


.damage-container {
    display: flex;
    justify-content: center;
}
</style>