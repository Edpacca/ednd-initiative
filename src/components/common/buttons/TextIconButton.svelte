<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    export let text;
    export let icon;

</script>

 <button class={`submit-button relative ${$$props.class}`}>
    {text}
    <Fa icon={icon} style="position: absolute; right: 0.5rem"/>
</button>