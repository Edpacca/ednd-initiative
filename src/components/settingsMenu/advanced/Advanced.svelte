<script lang="ts">
    import ConfirmDeleteLocalStorage from "./ConfirmDeleteLocalStorage.svelte";
    import ConfirmDeleteLogs from "./ConfirmDeleteLogs.svelte";
    import ConfirmClearTracker from "./ConfirmClearTracker.svelte";

    enum State {
        None,
        ClearTracker,
        DeleteStorage,
        DeleteLogs
    }

    let state = State.None;

    const close = () => state = State.None;
    export let isExperimentalEnabled = false;
</script>

<div class="flex-col">
    <div class="checkboxes">
        <input type="checkbox" id="toggle-experimental" bind:checked={isExperimentalEnabled}/>
        <label for="toggle-tooltips">hexperimental features</label>
    </div>
    <button class="submit-button settings-button" on:click={() => state= State.ClearTracker}>
        Clear tracker
    </button>
    <button
        class="submit-button settings-button" on:click={() => state = State.DeleteLogs}>
        Delete logs
    </button>
    <button
        class="submit-button settings-button" on:click={() => state = State.DeleteStorage}>
        Clear cached data
    </button>

</div>
<ConfirmClearTracker isOpen={state === State.ClearTracker} close={close}/>
<ConfirmDeleteLogs isOpen={state === State.DeleteLogs} close={close}/>
<ConfirmDeleteLocalStorage isOpen={state === State.DeleteStorage} close={close}/>
