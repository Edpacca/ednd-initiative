<script lang="ts">
    import { setLocalStorageTheme } from "../../../lib/persistance";
    import { currentTheme } from "../../../store";
    import { setTheme } from "../../../lib/themeLib";
    import { THEMES, Themes } from "../../../data/themeData";

    const selectTheme = (theme: Themes) => {
        setTheme(theme);
        setLocalStorageTheme(theme);
    }

    $: selectTheme($currentTheme);
</script>

<select bind:value={$currentTheme}>
    {#each THEMES as theme}
        <option value={theme}>
            {theme}
        </option>
    {/each}
</select>

<style>
    option, select {
        text-transform: capitalize;
        color: var(--white);
    }
</style>

