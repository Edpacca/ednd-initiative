<script lang="ts">
    import ConfirmClearLocalStorage from "./ConfirmClearLocalStorage.svelte";
    import ConfirmReset from "./ConfirmReset.svelte";

    enum State {
        None,
        Reset,
        Clear
    }

    let state = State.None;

    const close = () => state = State.None;
</script>

<div class="flex-col">
    <button
        class="submit-button" on:click={() => state = State.Clear}>
        Clear local storage
    </button>
    <button class="submit-button" on:click={() => state= State.Reset}>
        Reset page
    </button>
</div>
<ConfirmClearLocalStorage isOpen={state === State.Clear} close={close}/>
<ConfirmReset isOpen={state === State.Reset} close={close}/>

<style>
    button {
        width: 80%;
        margin-bottom: 0.5rem;
    }
</style>