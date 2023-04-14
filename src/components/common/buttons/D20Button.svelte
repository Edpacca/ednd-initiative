<script lang="ts">
    import D20 from "../../../graphics/icons/d20.svelte";
    export let onClick: () => void;
    export let primary: string = "var(--primary)";
    export let secondary: string = "var(--secondary)";
    export let width: string = "3rem";
    let isRolling = false;
    
    const animation = () => {
        onClick();
        isRolling = true;
    }

</script>

<button 
    on:click={animation} 
    class="d20" 
    class:rolly={isRolling} 
    style={`--primary-color: ${primary}; --secondary-color: ${secondary}; --width: ${width}`}>
    <D20/>
</button>

<style>
    .d20 {
        width: var(--width);
        height: var(--width);
        border: none;
        background: none;
        fill: var(--primary-color);
        transition: var(--transition-time)
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