<script>
    import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
    import SettingsIconButton from '../../common/buttons/TextIconButton.svelte';
    import { hasHelpTooltips, hasInfoTooltips, showTutorial } from '../../../store';
</script>

<div class="flex-col">
    <div class="checkboxes">
        <input type="checkbox" id="toggle-help-tt" bind:checked={$hasHelpTooltips}/><label for="toggle-help-tt">help tooltips</label>
        <input type="checkbox" id="toggle-info-tt" bind:checked={$hasInfoTooltips}/><label for="toggle-info-tt">info tooltips (conditions etc)</label>
    </div>
    <SettingsIconButton text="Full guide" icon={faArrowUpRightFromSquare} class="settings-button" onClick={() => $showTutorial = true}/>
</div>