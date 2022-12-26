<script lang="ts">
    import Sword from "../../graphics/icons/sword.svelte";
    export let isLocked: boolean;
    export let onClick: () => void;
</script>

<button class="blank-button" on:click={onClick}>
        <div class="sword sword-L" class:locked-L={isLocked}>
            <Sword/>
        </div>
        <div class="sword sword-R" class:locked-R={isLocked}>
            <Sword/>
        </div>
</button>

<style>
    button {
        height: 5rem;
        width: 4rem;
        position: relative;
        fill: var(--secondary);
    }

    button:hover {
        fill: var(--gold);
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
        left: 25%;
        transition: var(--sword-transition);
        scale: 1;
    }

    .locked-R {
        transform: rotate(-45deg);
        right: 25%;
        transition: var(--sword-transition);
        scale: 1;
    }
</style>