<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte'
    export let text;
    export let icon;
    export let onClick: () => void;
</script>

 <button class={`submit-button relative ${$$props.class}`} on:click={onClick}>
    {text}
    <Fa icon={icon} style="position: absolute; right: 0.5rem"/>
</button>