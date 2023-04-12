<script>
    import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
    import SettingsIconButton from '../../common/buttons/TextIconButton.svelte';
    import { hasHelpTooltips, hasInfoTooltips } from '../../../store';
</script>

<div class="flex-col">
    <div class="checkboxes">
        <input type="checkbox" id="toggle-tooltips" bind:checked={$hasHelpTooltips}/><label for="toggle-tooltips">help tooltips</label>
        <input type="checkbox" id="toggle-tooltips" bind:checked={$hasInfoTooltips}/><label for="toggle-tooltips">info tooltips (conditions etc)</label>
    </div>
    <SettingsIconButton text="Full guide" icon={faArrowUpRightFromSquare} class="settings-button"/>
</div>

<style>
    .checkboxes {
        display: grid;
        grid-template-columns: 2rem 1fr;
        column-gap: 1rem;
        align-items: center;
        margin-bottom: 1rem;
        text-align: left;
    }
</style>