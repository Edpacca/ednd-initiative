<script lang="ts">
    import D20 from "../../../assets/icons/d20.svelte";
    export let onClick: () => void;
    export let primary: string = "";
    export let secondary: string = "";
    export let width: string = "";
    let isRolling = false;
    const animation = () => {
        onClick();
        isRolling = true;
    }

</script>

<button on:click={animation} class="d20" class:rolly={isRolling} 
    style={`${primary ? `--primary-color: ${primary};` : "--primary-color: var(--primary); "}
        ${secondary ? `--secondary-color: ${secondary};` : "--secondary-color: var(--secondary); "}
        ${width ? `--width: ${width}` : "--width: 3rem;"}`
        }>
    <D20/>
</button>

<style>
    .d20 {
        width: var(--width);
        height: var(--width);
        border: none;
        background: none;
        fill: var(--primary-color);
    }

    .d20:hover {
        background: none;
        fill: var(--secondary-color);
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