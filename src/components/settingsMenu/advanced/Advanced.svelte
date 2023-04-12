<script lang="ts">
    import ConfirmClearLocalStorage from "./ConfirmClearLocalStorage.svelte";
    import ConfirmClearLogs from "./ConfirmClearLogs.svelte";
    import ConfirmReset from "./ConfirmReset.svelte";

    enum State {
        None,
        Reset,
        ClearStorage,
        ClearLogs
    }

    let state = State.None;

    const close = () => state = State.None;
    
</script>

<div class="flex-col">
    <button
        class="submit-button settings-button" on:click={() => state = State.ClearStorage}>
        Clear local storage
    </button>
    <button
        class="submit-button settings-button" on:click={() => state = State.ClearLogs}>
        Clear logs
    </button>
    <button class="submit-button settings-button" on:click={() => state= State.Reset}>
        Reset page
    </button>
</div>
<ConfirmClearLocalStorage isOpen={state === State.ClearStorage} close={close}/>
<ConfirmReset isOpen={state === State.Reset} close={close}/>
<ConfirmClearLogs isOpen={state === State.ClearLogs} close={close}/>
