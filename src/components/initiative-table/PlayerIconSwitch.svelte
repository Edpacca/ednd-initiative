<script lang="ts">
    import { onMount } from "svelte";
    import { isLocked } from "../../store";
    import type { PlayerIconType } from "./PlayerIconType";

    export let icon: PlayerIconType | undefined;

    let iconComponent;

    const load = async () => {
        iconComponent = (await import(`../../assets/icons/classes/${icon.toLowerCase()}.svelte`)).default;
    }

    onMount(async () => await load());

    const rotate = async () => {
        icon = icon === "Artificer" ? "Barbarian" :
            icon ==="Barbarian" ? "Bard" :
            icon === "Bard" ? "Cleric" :
            icon === "Cleric" ? "Druid" :
            icon === "Druid" ? "Fighter" :
            icon === "Fighter" ? "Monk" :
            icon === "Monk" ? "Paladin" :
            icon === "Paladin" ? "Ranger" :
            icon === "Ranger" ? "Rogue" :
            icon === "Rogue" ? "Sorcerer" :
            icon === "Sorcerer" ? "Warlock" :
            icon === "Warlock" ? "Wizard" :
            "Artificer";

        await load();
    }
</script>

<button class="entity-type-button" on:click={() => rotate()} disabled={$isLocked}>
    {#if icon}
        <svelte:component this={iconComponent}>
            <slot></slot>    
        </svelte:component>
    {/if}
</button>

<style>
    button {
        fill: var(--gold);
    }
</style>