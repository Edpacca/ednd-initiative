<script lang="ts">
    import { isLocked, isLogsOpen, isStarted } from "../../store";
    import LockedSwordsIcon from "./LockedSwordsIcon.svelte";

    const toggleLock = () => {
        if (!$isStarted) {
            $isStarted = true;
            // $isLogsOpen = true;
        }
        $isLocked = !$isLocked;
    }

</script>

<LockedSwordsIcon isLocked={$isLocked} onClick={toggleLock}/>