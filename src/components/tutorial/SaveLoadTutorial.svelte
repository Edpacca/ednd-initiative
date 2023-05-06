
<script>
    import { faGear } from "@fortawesome/free-solid-svg-icons";
    import IconButton from "../common/buttons/IconButton.svelte";
    import SaveLoad from "../settingsMenu/save/SaveLoad.svelte";
    const localStoageUrl = "https://en.wikipedia.org/wiki/Web_storage";
</script>

<ul>
    <li>The current state is always saved in your browser's <a href={localStoageUrl}>"local storage"</a></li>
    <li>So if you refresh the page you won't lose progres</li>
    <li>Find Save/Load options in the settings (top left)
        <span class="inline">
            <IconButton icon={faGear} onClick={undefined} spin={true}/>
        </span>
    </li>
    <li>Choose which types of entities to save and give the group a name</li>
    <li>Loading a group adds to whatever is in the tracker currently</li>
</ul>
<div class="demo-container">
    <SaveLoad/>
</div>