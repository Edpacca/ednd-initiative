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
    
</script>

<div class="flex-col">
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
