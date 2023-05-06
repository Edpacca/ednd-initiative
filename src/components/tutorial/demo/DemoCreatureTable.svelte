<script lang="ts">
    import { isLocked, entities } from "../../../store";
    import Heart from "../../../graphics/icons/heart.svelte";
    import Shield from "../../../graphics/icons/shield.svelte";
    import { Creature, CreatureType } from "../../../lib/models/creature";
    import CreatureRowUnlocked from "../../creature/unlocked/CreatureRowUnlocked.svelte";
    import Speed from "../../../graphics/icons/speed.svelte";
    import { onMount } from "svelte";
    import { EffectType } from "../../../lib/models/effect";
    
    const checkAndAdd = (entity: Creature | undefined, type: CreatureType) => {
        const newCreature = entity ? entity : new Creature(type);
        if (type === CreatureType.Minion) {
            newCreature.quantity = 2;
            newCreature.hpCurrent = [newCreature.hpCurrent[0], newCreature.hpMax];
            newCreature.conditions = [newCreature.conditions[0], []];
        }
        $entities = [...$entities, newCreature]
    }

    $: creatures = $entities.filter(e => e.type !== EffectType.Effect);

    onMount(() => {
        const player = $entities.find(e => e.type === CreatureType.Player)
        const enemy = $entities.find(e => e.type === CreatureType.Enemy)
        const minion = $entities.find(e => e.type === CreatureType.Minion)
        const boss = $entities.find(e => e.type === CreatureType.Boss)
        entities.set([]);
        checkAndAdd(player, CreatureType.Player);
        checkAndAdd(enemy, CreatureType.Enemy);
        checkAndAdd(minion, CreatureType.Minion);
        checkAndAdd(boss, CreatureType.Boss);
    });
</script>

<table>
    <thead class="secondary">
            <th class="value-col"></th>
            <th>Name</th>
            <th class="value-col">
                <div class="icon-header svg-fit-container">
                    <div class="svg-fit">
                        <Heart/>
                    </div>
                    <span class="icon-text">max</span>
                </div>
            </th>
            <th class="value-col">
                <div class="icon-header svg-fit-container">
                    <Shield/>
                </div>
            </th>
            <th class="value-col">
                Init.
                Bonus
            </th>
            <th class="value-col"><div class="icon-header svg-fit-container"><Speed/></div></th>
            {#if !$isLocked}
                <th class="fn-col"></th>
            {/if}
        </thead>
    <tbody>
        {#each creatures as creature, i}
            <CreatureRowUnlocked 
                {creature}
                removeCreature={undefined}
                index={i}/>
        {/each}
    </tbody>
</table>

<style>
    .icon-text {
        position: inherit;
        top: -1.2em;
    }
</style>