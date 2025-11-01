window.run = async () => {
    const projectData = fetch('https://raw.githubusercontent.com/novaspiderultra2/ScratchModLoader.github.io/main/46587498/game/js/file/Scratcharia%20Mod%20Loader.sb3');
    await scaffolding.loadProject(projectData);
    setProgress(0);
    document.querySelector("#loading-status").innerText = "Loading Resource Packs";
    setProgress(0);
    document.querySelector("#loading-status").innerText = "Loading Mods";
    setProgress(1);
    loadingScreen.hidden = true;
    beforeStart();
    scaffolding.start();
};
run().catch(handleError);
