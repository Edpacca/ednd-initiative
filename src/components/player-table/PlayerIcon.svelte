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
            icon === "Ranger" ? "Rogue" :
            icon === "Rogue" ? "Sorcerer" :
            icon === "Sorcerer" ? "Warlock" :
            icon === "Warlock" ? "Wizard" :
            "Artificer";

        await load();
    }
</script>

<button class="type-button" on:click={() => rotate()} disabled={$isLocked}>
    {#if icon}
        <svelte:component this={iconComponent}>
            <slot></slot>    
        </svelte:component>
    {/if}
</button>

<style>
    button {
        background: none;
        border: none;
        height: 3em;
        width: 3em;
        fill: goldenrod;
        border-radius: 8px;
    }

    button:hover {
        background-color: brown;
    }

</style>