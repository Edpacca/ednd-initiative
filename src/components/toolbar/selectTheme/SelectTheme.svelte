<script lang="ts">
    import { setLocalStorageTheme } from "../../../lib/persistance";
    import { currentTheme } from "../../../store";
    import { setTheme } from "./setTheme";
    import { THEMES } from "./themes";

    const selectTheme = (theme: string) => {
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

</style>

