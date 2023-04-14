<script lang="ts">
    import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte'
    export let text: string;
    export let icon: IconDefinition;
    export let onClick: () => void;
</script>

 <button class={`submit-button relative ${$$props.class}`} on:click={onClick}>
    {text}
    <Fa icon={icon} style="position: absolute; right: 0.5rem"/>
</button>