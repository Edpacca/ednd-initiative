<script lang="ts">
    import Sword from "../../graphics/icons/sword.svelte";
    export let isLocked: boolean;
    export let onClick: () => void;
</script>

<button class="blank-button" on:click={onClick} class:locked-swords={isLocked}>
    <div class="sword sword-L" class:locked-L={isLocked}>
        <Sword/>
    </div>
    <div class="sword sword-R" class:locked-R={isLocked}>
        <Sword/>
    </div>
<div class="tooltip" class:locked-tooltip={isLocked}>{isLocked ? "Unlock" : "Start"}</div>
</button>

<style>
    button {
        height: 5rem;
        width: 3rem;
        position: relative;
        fill: var(--secondary);
    }

    button:hover {
        fill: var(--primary);
    }

    .locked-swords {
        fill: var(--primary);
    }

    .locked-swords:hover {
        fill: var(--white);
    }

    .sword {
        position: absolute;
        height: 100%;
        top: 0;
        scale: 0.5;
    }

    .sword-L {
        left: 0;
        transition: var(--sword-transition);
    }

    .sword-R {
        right: 0;
        transition: var(--sword-transition);
    }

    .locked-L {
        transform: rotate(45deg);
        left: 0.5rem;
        transition: var(--sword-transition);
        scale: 1;
    }

    .locked-R {
        transform: rotate(-45deg);
        right: 0.5rem;
        transition: var(--sword-transition);
        scale: 1;
    }
    
    .tooltip {
        color: var(--white);
        font-weight: bold;
        text-align: center;
        width: 100%;
        position: absolute;
        top: 4.2rem;
        left: 0;
    }

    .locked-tooltip {
        opacity: 0;
        transition: var(--sword-transition);
    }

    button:hover .locked-tooltip {
        opacity: 1;
        transition: var(--sword-transition);
    }

</style>