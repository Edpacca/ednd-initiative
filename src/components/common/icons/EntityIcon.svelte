<script lang="ts">
    import Boss from "../../../graphics/entity-types/boss.svelte";
    import Enemy from "../../../graphics/entity-types/enemy.svelte";
    import Minion from "../../../graphics/entity-types/minion.svelte";
    import Cave from "../../../graphics/icons/cave.svelte";
    import { CreatureType } from "../../../lib/models/creature";
    import { EffectType } from "../../../lib/models/effect";
    import type { EntityType } from "../../../lib/models/entity";
    import type { PlayerClass } from "../../../lib/models/playerClass";
    import PlayerClassIcon from "./PlayerClassIcon.svelte";

    export let type: EntityType;
    export let playerClass: PlayerClass | undefined = undefined;
</script>

{#if type === CreatureType.Player && playerClass}
    <PlayerClassIcon playerClass={playerClass}/>
{:else if type === CreatureType.Enemy}
    <Enemy class="primary"/>
{:else if type === CreatureType.Minion}
    <Minion class="primary"/>
{:else if type === CreatureType.Boss}
    <Boss class="primary"/>
{:else if type === EffectType.Effect}
    <Cave class="blue"/>
{/if}
