window.run = async () => {
    const projectData = await getProjectData();
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