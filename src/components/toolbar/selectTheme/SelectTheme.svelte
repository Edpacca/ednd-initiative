<script lang="ts">
    import { setLocalStorageTheme } from "../../../lib/persistance";
    import { currentTheme } from "../../../store";
    import { setTheme } from "./setTheme";

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

