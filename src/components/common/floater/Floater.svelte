<script lang="ts">
    import { DEFAULT, type AnimationValue } from "../../../data/animationValue";
    export let av: AnimationValue = DEFAULT;
    export let color = "red";
</script>
<div 
    class="fade-container" 
    style={`--y-time: ${av.yTiming}s; --size: ${av.size}px; --color: ${color}; --delay: ${av.delay}s; x-offset: ${av.xOffset}px`}>
    <div class="y-container" style={`--y-range: ${av.yRange}px;`}>
        <svg viewBox="0 0 100 100" style={`--x-range: ${av.xRange}px; --x-time: ${av.xTiming}s`}>
            <circle cx="50" cy="50" r="50"/>
        </svg>
    </div>
</div>

<style>

    .fade-container {
        position: absolute;
        width: var(--size);
        height: var(--size);
        animation: fade var(--y-time) ease-in var(--delay) infinite;
        opacity: 0;
        left: var(--x-offset);
    }

    .y-container {
        animation: floatY var(--y-time) linear var(--delay) infinite;
    }

    svg {
        fill: var(--color);
        animation: floatX var(--x-time) ease-in-out var(--delay) infinite alternate;
    }
    
    circle {
        animation: shrink var(--y-time) linear var(--delay) infinite;
    }

    @keyframes floatX {
        0% {
            transform: translateX(calc(var(--x-range) * -1));
        }
        100% {
            transform: translateX(var(--x-range));
        }
    }

    @keyframes floatY {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(calc(var(--y-range) * -1));
        }
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        30% {
            opacity: 0.7;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes shrink {
        0% {
            r: 50;
        }
        100% {
            r: 25;
        }
    }
</style>