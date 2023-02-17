<script>
    export let isUp = false;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 132.292 128.587" class="container">
    <g id="layer1" style="stroke-opacity:1;stroke-width:3" class="down" class:up={isUp}>
        <path d="m 78.052077,132 v 50"/>
        <path d="m 85.091885,132 v 50"/>
        <path d="m 92.13169,132 v 50"/>
        <path d="m 99.171501,132 v 50"/>
        <path d="m 106.21131,132 v 50"/>
    </g>
</svg>

<style>
    .container {
        position: absolute;
        stroke: goldenrod;
        transition: 1s;
    }

    .down {
        transform: translate(-26.458327px,-53.923512px);
        transition: 1s ease-in;
    }

    .up {
        transition: 1s ease-in;
        transform: translate(-26.458327px,-110px);
    }

    @keyframes slide {
        from {
            transform: translate(-26.458327px,-53.923512px);
        } to {
            transform: translate(-26.458327px,-110px);
        }
    }
</style>