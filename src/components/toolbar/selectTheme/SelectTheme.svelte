<script lang="ts">
    import { currentTheme } from "../../../store";

    const THEMES = [
        "cobbles",
        "dirt",
        "hell",
        "ice",
        "lava",
        "sand",
        "stone",
        "water"
    ]

    const setBackgroundCssVar = (theme: string) => {
        const path = `url(/background/${$currentTheme}.webp)`
        document.body.style.background = path;
    }

    $: setBackgroundCssVar($currentTheme);
</script>

<div>Theme</div>
<select bind:value={$currentTheme}>
    {#each THEMES as theme}
        <option value={theme}>
            {theme}
        </option>
    {/each}
</select>

<style>
    select {
        height: 2rem;
        width: 10rem;
        background: var(--dark-grey);
        color: var(--secondary);
        text-align: center;
        font-size: 16px;
        border-radius: var(--border-radius);
    }
</style>

