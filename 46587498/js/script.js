(async () => {
    const token = (await (await fetch("https://trampoline.turbowarp.org/proxy/projects/759885020")).json()).project_token;
    const Database = (await (await fetch(`https://projects.scratch.mit.edu/759885020?token=${token}`)).json()).targets[0].variables;
    console.log(Database);
    document.getElementById('game').addEventListener('click', () => window.open("./game/", "_blank", "popup"));//openZippedHTMLPage(Database.game[1], "popup", false));
    document.getElementById('texture').addEventListener('click', () => {
        document.getElementById('Menu').hidden = true;
        document.getElementById('TexturePack').hidden = false;
    });
    document.getElementById('back').addEventListener('click', () => {
        document.getElementById('TexturePack').hidden = true;
        document.getElementById('Menu').hidden = false;
    });

    //Animates The Title
    const Title = document.querySelector("#Title");
    setInterval(() => Title.style.transform = `rotate(${5 * Math.cos((Math.PI * (Date.now() * 0.08)) / 180)}deg)`);

    document.querySelectorAll("button").forEach((element) => {
        element.addEventListener("mouseover", async (event) => {
            const Loop = setInterval(() => event.target.style.transform = `translateY(${3 * Math.sin((Math.PI * (Date.now() * 0.25)) / 180)}px)`);
            const mouseLeave = event.target.addEventListener("mouseleave", (event) => {
                clearInterval(Loop);
                event.target.style.transform = "";
                event.target.removeEventListener("mouseleave", mouseLeave);
            });
        });
    });

    document.getElementById("BlankTexturePack").href = await new Promise(async (resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(await (await fetch("https://cdn.assets.scratch.mit.edu/internalapi/asset/142c5514541508cd0a813cb212cd8bc5.zip/get/")).blob());
    });
})();