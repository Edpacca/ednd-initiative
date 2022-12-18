<script lang="ts">
    import type { Creature } from "../../../lib/models/creature";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import Modal from "../../common/modal/Modal.svelte";
    import Damage from "../../damage/Damage.svelte";
    import CreatureInputLocked from "../locked/CreatureInputLocked.svelte";
    import HpValue from "./HpValue.svelte";
    export let creature: Creature;
    export let isSelected = false;
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
                    <HpValue value={creature.hpCurrent}/>
                </div>
                <div class="damage-container">
                    <Damage bind:creature/>
                </div>
            </div>
            <div class="effects">
                <div class="header-small underline">Effects & Conditions</div>
                {#if creature.conditions && creature.conditions.length > 0}
                    {#each creature.conditions as condition}
                        <div>{condition}</div>
                    {/each}
                {:else}
                    <div>No effects</div>
                {/if}
            </div>
        </div>
    </Modal>
</div>
{/if}

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
    grid-template-columns: 80% 20%;
    column-gap: 1rem;
    padding-top: 2rem;
}

.effects {
    border: 2px solid var(--primary);
    border-radius: var(--border-radius);
    text-align: center;
}

.damage-container {
    display: flex;
    justify-content: center;
}
</style>