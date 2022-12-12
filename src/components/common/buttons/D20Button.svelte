<script lang="ts">
    import D20 from "../../../assets/icons/d20.svelte";
    export let onClick: () => void;
    let isRolling = false;
    const animation = () => {
        onClick();
        isRolling = true;
    }
</script>

<button on:click={animation} class="d20" class:rolly={isRolling}>
    <D20/>
</button>

<style>
    .d20 {
        width: 3em;
        height: 3em;
        border: none;
        background: none;
        fill: brown;
    }

    .d20:hover {
        background: none;
        fill: burlywood;
        outline: none;
    }

    .d20:focus {
        animation: roll 1s cubic-bezier( 0, 0, 0.09, 1 );
        border: none;
        outline: none;
    }

    .d20:active {
        animation: none;
    }

    @keyframes roll {
        from {
            transform:rotate(0deg);
        }
        to {
            transform: rotate(1080deg)
        }
    }
</style>