
<script>
    import ArrowPlain from "../../graphics/icons/arrow-plain.svelte";
    import RemoveButton from "../common/buttons/RemoveButton.svelte";
    import LogPanel from "../logger/LogPanel.svelte";
    import DemoLogEntryCard from "./demo/DemoLogEntryCard.svelte";
</script>

<p class="gold text-center">I always found myself forgetting what happened 3 turns ago, <br> so naturally I created a historial record...</p>
<ul>
    <li>The log history can be opened from the top right: <span class="inline"><ArrowPlain class="left light-grey line-height"/></span></li>
    <li>Each card shows things that happened during that creature's turn</li>
    <li>Damage, healing, conditions and legendary actions are recorded</li>
    <li>These can all be undone by clicking the adjacent <span class="inline"><RemoveButton onClick={undefined}/></span></li>
    <li>Undoing damage should update the creatures Current HP</li>
    <li>The entire turn can be deleted too - but this can get messy!</li>
</ul>
<LogPanel/>
<DemoLogEntryCard/>