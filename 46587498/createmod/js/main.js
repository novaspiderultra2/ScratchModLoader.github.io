/*--------------------
Create New Mod
--------------------*/
document.getElementById("CreateNewMod").onclick = function() {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Create New Mod" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "The Name of Your New Mod", "Name", "My New Mod");
    const description = new TextboxInput("Description", "Short Summary of Your New Mod");
    const createNewMod = new Button({ "innerText": "Create New Mod" });
    Editor.appendChild(name);
    Editor.appendChild(description);
    createNewMod.onclick = () => {
        ProjectData.json.targets[0].variables.manifest = [
            "mainfest.json",
            JSON.stringify({
                "name": name.value,
                "description": description.value
            })
        ];
        [
            "a495179c2afaf32be5b6d6663322addf.svg",
            "313a2f6dc464184effee4d00886e4f3b.svg",
            "260d068183f55d13b6f5185d6da5ed8c.svg",
            "a20339b99d60b9e6de994679d535778f.svg",
            "555955d07859d7c019b3558ad5726ba4.svg",
            "bedf600df89a6aaee9b2082192d669f3.svg",
            "856fba7b72c7fe607ab3b8c6829cb827.svg",
            "3fc0af6a7d697f38974c4214e5007a62.svg",
            "243fc68b8b881712bb459c38eba93cb6.svg",
            "4ec293ab68468a2f8386cbc748dde992.svg",
            "271ab44e58b74d226a0a0b1284e453e0.svg",
            "404b4c99837e516c3fdf192ecf7e2882.svg",
            "d84da8cac08855d336ff9d5254684728.svg",
            "dfc6671bc25135869fb5f9e24258d188.svg",
            "77dcbe1b8a6d220dc633a1f38bceeaba.svg",
            "e572049ea822205593236d48f4fbbb5c.svg",
            "f130a62473313fa4dae23c2550bc83d1.svg",
            "d8aeb3da82b92882c862880888f59bad.svg"
        ].forEach(async e => {
            const costume = await new Costume(await ReadAsDataURL(await (await fetch(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${e}/get/`)).blob()));
            ProjectData.costumes[costume[0].ID] = costume[0];
        });
        SetupModEditor(name.value, description.value);
        Editor.hidden = true;
        Mod.hidden = false;
    }
    Editor.appendChild(createNewMod);
    document.getElementById("Menu").hidden = true;
    Editor.hidden = false;
}

/*--------------------
Load Mod
--------------------*/
document.getElementById("EditMod").onclick = function() {
    let input = new Input({ type: "file", accept: ".zip, .sb3" });
    input.click();
    input.onchange = async () => {
        let zip = await JSZip.loadAsync(input.files[0]);
        files = Object.values(zip.files);
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            let name = file.name;
            if (name == "project.json") {
                ProjectData.json = JSON.parse(await file.async("text"));
                var info = ProjectData.json.targets.find(e => e.variables.type && e.variables.type[1] == "info");
                if (!info) {
                    ProjectData.json.targets[0].costumes[0].name = "Thumbnail";
                    infoSprite.costumes.push(ProjectData.json.targets[0].costumes[0]);
                    ProjectData.json.targets.push(infoSprite);
                    ProjectData.json.targets[0].costumes[0] = {
                        "name": "",
                        "bitmapResolution": 1,
                        "dataFormat": "svg",
                        "assetId": "d8aeb3da82b92882c862880888f59bad",
                        "md5ext": "d8aeb3da82b92882c862880888f59bad.svg",
                        "rotationCenterX": 240,
                        "rotationCenterY": 180
                    };
                    ProjectData.json.targets[0].variables["dIub9H,UFVsV8d.[R!)("] = ["click", 0];
                    ProjectData.json.targets[0].variables["Qe684K(^r?EpGTCxjkcN"] = ["mouse down?", 0];

                    ProjectData.json.targets[0].broadcasts["K*+L{$Uh,H]}8haBL8?."] = "About";
                    ProjectData.json.targets[0].broadcasts["xw)#TBXKJhiY]V]=I`iT"] = "Instructions";
                    ProjectData.json.targets[0].broadcasts["ClS/^5B,oT*{``o.s|zL"] = "Changelog";
                    ProjectData.json.targets[0].broadcasts["Zh+d|dD?aa8b(L6kL6)7"] = "Remix";
                    ProjectData.json.targets[0].broadcasts[".Y_DR_JCOvh}P9GM[{j."] = "Main Menu";

                    [
                        "a495179c2afaf32be5b6d6663322addf.svg",
                        "313a2f6dc464184effee4d00886e4f3b.svg",
                        "260d068183f55d13b6f5185d6da5ed8c.svg",
                        "a20339b99d60b9e6de994679d535778f.svg",
                        "555955d07859d7c019b3558ad5726ba4.svg",
                        "bedf600df89a6aaee9b2082192d669f3.svg",
                        "856fba7b72c7fe607ab3b8c6829cb827.svg",
                        "3fc0af6a7d697f38974c4214e5007a62.svg",
                        "243fc68b8b881712bb459c38eba93cb6.svg",
                        "4ec293ab68468a2f8386cbc748dde992.svg",
                        "271ab44e58b74d226a0a0b1284e453e0.svg",
                        "404b4c99837e516c3fdf192ecf7e2882.svg",
                        "d84da8cac08855d336ff9d5254684728.svg",
                        "dfc6671bc25135869fb5f9e24258d188.svg",
                        "77dcbe1b8a6d220dc633a1f38bceeaba.svg",
                        "e572049ea822205593236d48f4fbbb5c.svg",
                        "f130a62473313fa4dae23c2550bc83d1.svg",
                        "d8aeb3da82b92882c862880888f59bad.svg"
                    ].forEach(async e => {
                        const costume = await new Costume(await ReadAsDataURL(await (await fetch(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${e}/get/`)).blob()));
                        ProjectData.costumes[costume[0].ID] = costume[0];
                    });
                }
            } else {
                let [assetID, type] = name.split(".");
                ProjectData.costumes[assetID] = (await new Costume(`data:image/${type == "svg" ? "svg+xml" : type};base64,${await file.async("base64")}`))[0];
            }
        }
        SetupModEditor(JSON.parse(ProjectData.json.targets[0].variables.manifest[1]).name);
        document.getElementById("Menu").hidden = true;
        Mod.hidden = false;
    }
}

/*--------------------
Mod Menu
--------------------*/
function SetupModEditor(name) {
    Mod.innerHTML = "";
    Mod.appendChild(new Text({ "innerText": name }, { "color": "#fff", "font-size": "3em" }));
    Mod.appendChild(new Br);
    const editProject = new Button({ "innerText": "Edit Project Data" });
    editProject.onclick = () => {
        const info = ProjectData.json.targets.find(e => e.variables.type && e.variables.type[1] == "info");
        EditProject(costumeToData(info.costumes.find(e => e.name == "Logo")), costumeToData(info.costumes.find(e => e.name == "Thumbnail")), costumeToData(ProjectData.json.targets[0].costumes[0]));
    };
    Mod.appendChild(editProject);
    Mod.appendChild(new Br);
    const downloadMod = new Button({ "innerText": "Download Mod" });
    downloadMod.onclick = DownloadMod;
    Mod.appendChild(downloadMod);
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Items" }, { "color": "#fff", "font-size": "2em" }));
    ModItemsElement = new Div({ "id": "ModItems" }, { "background-color": "#00000080", "width": "100%" });
    AddItemElements();
    Mod.appendChild(ModItemsElement);
    const addItem = new Button({ "innerText": "Add Item" });
    addItem.onclick = AddItem;
    Mod.appendChild(addItem);
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "How To Upload" }, { "color": "#fff", "font-size": "2em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Step 1" }, { "color": "#fff" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Download The Mod" }, { "color": "#fff", "font-size": "0.75em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Step 2" }, { "color": "#fff" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Login To " }, { "color": "#fff", "font-size": "0.75em" }));
    Mod.appendChild(new A({ "innerText": "Scratch", "href": "https://scratch.mit.edu/login/" }, { "font-size": "0.75em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Step 3" }, { "color": "#fff" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new A({ "innerText": "Create A New Project", "href": "https://scratch.mit.edu/projects/editor/" }, { "font-size": "0.75em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Step 5" }, { "color": "#fff" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Go To File > Load from your computer and Select Your Downloaded Mod" }, { "color": "#fff", "font-size": "0.75em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Step 6" }, { "color": "#fff" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "Save the Project ID" }, { "color": "#fff", "font-size": "0.75em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Text({ "innerText": "(https://scratch.mit.edu/projects/" }, { "color": "#fff", "font-size": "0.75em" }));
    Mod.appendChild(new Text({ "innerText": "12345" }, { "color": "#fff", "font-size": "0.75em", "text-decoration": "underline" }));
    Mod.appendChild(new Text({ "innerText": "/)" }, { "color": "#fff", "font-size": "0.75em" }));
    Mod.appendChild(new Br);
    Mod.appendChild(new Br);
}

/*--------------------
Edit Manifest
--------------------*/
function EditProject(ModLogo, ModThumbnail, ModBackground) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Edit Project Data" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const manifestData = JSON.parse(ProjectData.json.targets[0].variables.manifest[1]);
    const name = new StringInput("Name", "The Name of Your New Mod", "Name", manifestData.name);
    const description = new TextboxInput("Description", "Short Summary of Your New Mod", manifestData.description);
    Editor.appendChild(name);
    Editor.appendChild(description);
    Editor.appendChild(new Text({ "innerText": "Logo" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    const logo = new ImageEditor({
        name: "Logo",
        rotationCenterX: ModLogo ? ModLogo.rotationCenterX : 223.54019218688967,
        rotationCenterY: ModLogo ? ModLogo.rotationCenterY : 29.27159499999999,
        imageFormat: ModLogo ? ModLogo.dataFormat : "svg",
        image: ModLogo ? ModLogo.image : assets.logo
    }, false);
    Editor.appendChild(logo);
    const genLogoBtn = new Button({ "innerText": "Generate Logo" });
    genLogoBtn.onclick = () => {
        if (confirm("This will override any existing logo.\nAre you sure you would like to continue?")) generateLogo(name.value, logo);
    }
    Editor.appendChild(genLogoBtn);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Thumbnail" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    const thumbnail = new ImageEditor({
        name: "Thumbnail",
        rotationCenterX: ModThumbnail ? ModThumbnail.rotationCenterX : 240,
        rotationCenterY: ModThumbnail ? ModThumbnail.rotationCenterY : 180,
        imageFormat: ModThumbnail ? ModThumbnail.dataFormat : "svg",
        image: ModThumbnail ? ModThumbnail.image : assets.thumbnail
    }, false);
    Editor.appendChild(thumbnail);
    const genThumbnailBtn = new Button({ "innerText": "Generate Thumbnail" });
    genThumbnailBtn.onclick = () => {
        if (confirm("This will override any existing thumbnail.\nAre you sure you would like to continue?")) generateThumbnail(name.value, thumbnail);
    }
    Editor.appendChild(genThumbnailBtn);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Background" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    const background = new ImageEditor({
        name: "Background",
        rotationCenterX: ModBackground ? ModBackground.rotationCenterX : 240,
        rotationCenterY: ModBackground ? ModBackground.rotationCenterY : 180,
        imageFormat: ModBackground ? ModBackground.dataFormat : "svg",
        image: ModBackground ? ModBackground.image : assets.thumbnail
    }, false);
    Editor.appendChild(background);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    const saveChanges = new Button({ "innerText": "Save Changes" });
    saveChanges.onclick = async () => {
        ProjectData.json.targets[0].variables.manifest = [
            "mainfest.json",
            JSON.stringify({
                "name": name.value,
                "description": description.value
            })
        ];
        Mod.children[0].innerText = name.value;

        const info = ProjectData.json.targets.find(e => e.variables.type && e.variables.type[1] == "info");

        var costume = await new Costume(logo.value.image, logo.value.imageFormat);
        costume[1].name = "Logo";
        costume[1].bitmapResolution = logo.value.bitmapResolution;
        costume[1].rotationCenterX = logo.value.rotationCenterX;
        costume[1].rotationCenterY = logo.value.rotationCenterY;
        if (info.costumes.find(e => e.name == "Logo")) info.costumes[info.costumes.findIndex(e => e.name == "Logo")] = costume[1];
        else info.costumes.push(costume[1]);
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(thumbnail.value.image, thumbnail.value.imageFormat);
        costume[1].name = "Thumbnail";
        costume[1].bitmapResolution = thumbnail.value.bitmapResolution;
        costume[1].rotationCenterX = thumbnail.value.rotationCenterX;
        costume[1].rotationCenterY = thumbnail.value.rotationCenterY;
        if (info.costumes.find(e => e.name == "Thumbnail")) info.costumes[info.costumes.findIndex(e => e.name == "Thumbnail")] = costume[1];
        else info.costumes.push(costume[1]);
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(background.value.image, background.value.imageFormat);
        costume[1].name = "";
        costume[1].bitmapResolution = background.value.bitmapResolution;
        costume[1].rotationCenterX = background.value.rotationCenterX;
        costume[1].rotationCenterY = background.value.rotationCenterY;
        ProjectData.json.targets[0].costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];

        UnsavedChanges = true;

        Editor.hidden = true;
        Mod.hidden = false;
    }
    Editor.appendChild(saveChanges);
    Mod.hidden = true;
    Editor.hidden = false;
}

/*--------------------
Download Mod
--------------------*/
async function DownloadMod() {
    const sb3 = new JSZip();
    const costume = await new Costume("data:image/svg+xml," + encodeURIComponent(await genChangeLog()), "svg");
    const info = ProjectData.json.targets.find(e => e.variables.type && e.variables.type[1] == "info");
    costume[1].name = "Changelog";
    costume[1].rotationCenterX = 235;
    costume[1].rotationCenterY = 175;
    if (info.costumes.find(e => e.name == "Changelog")) info.costumes[info.costumes.findIndex(e => e.name == "Changelog")] = costume[1];
    else info.costumes.push(costume[1]);
    ProjectData.costumes[costume[0].ID] = costume[0];
    Object.values(ProjectData.costumes).forEach(data => sb3.file(`${data.ID}.${data.type}`, data.data));
    sb3.file("project.json", JSON.stringify(ProjectData.json));
    new A({
        "href": `data:application/zip;base64,${await sb3.generateAsync({ "type": "base64" })}`,
        "download": `${JSON.parse(ProjectData.json.targets[0].variables.manifest[1]).name}.sb3`
    }).click();
    UnsavedChanges = false;
}

/*--------------------
Item
--------------------*/
function AddItem() {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Item" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Select What You Would Like To Add" }, { "color": "#bfbfbf", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Basic" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Block", assets.block));
    Editor.appendChild(new ModSelect("Beam", assets.beam));
    Editor.appendChild(new ModSelect("Fence", assets.fence));
    Editor.appendChild(new ModSelect("Platform", assets.platform));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Object 1x1", assets.chest));
    Editor.appendChild(new ModSelect("Object 2x1", assets.object2x1));
    Editor.appendChild(new ModSelect("Object 1x2", assets.object1x2));
    Editor.appendChild(new ModSelect("Object 2x2", assets.object2x2));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Table", assets.ITEM_table));
    Editor.appendChild(new ModSelect("Chair", assets.chair_right));
    Editor.appendChild(new ModSelect("Torch", assets.torch));
    Editor.appendChild(new ModSelect("Chain", assets.chain));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Pickaxe", assets.pickaxe));
    Editor.appendChild(new ModSelect("Axe", assets.axe));
    Editor.appendChild(new ModSelect("Sword", assets.sword));
    Editor.appendChild(new ModSelect("Staff", assets.staff));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Mask", assets.mask));
    Editor.appendChild(new ModSelect("Door", assets.door));
    Editor.appendChild(new ModSelect("Recipe", assets.craftingRecipe));
    Editor.appendChild(new ModSelect("Chest Gen", assets.goldChest));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("NPC", assets.npc));
    Editor.appendChild(new ModSelect("NPC Drop", assets.zombieArm));
    Editor.appendChild(new ModSelect("Other", assets.other));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Intermediate" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("World Gen", assets.worldGen));
    Editor.appendChild(new ModSelect("Potion", assets.potion));
    Editor.appendChild(new ModSelect("NPC Class", assets.npc));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Advanced" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("JavaScript", assets.javaScript, true));
    Mod.hidden = true;
    Editor.hidden = false;
}

function AddItemElements() {
    [...ModItemsElement.children].forEach(element => element.remove());
    var target;
    for (var i = 1; i < ProjectData.json.targets.length; i++) {
        target = ProjectData.json.targets[i];
        if (target.variables.type[1] == "JavaScript") {
            ModItemsElement.appendChild(new ModItem(
                assets.javaScript,
                target.name,
                "JavaScript",
                i
            ));
        } else if (target.variables.type[1] == "Block") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Block",
                i
            ));
        } else if (target.variables.type[1] == "Pickaxe") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Pickaxe",
                i
            ));
        } else if (target.variables.type[1] == "Axe") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Axe",
                i
            ));
        } else if (target.variables.type[1] == "Sword") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Sword",
                i
            ));
        } else if (target.variables.type[1] == "Recipe") {
            ModItemsElement.appendChild(new ModItem(
                assets.craftingRecipe,
                target.name,
                "Recipe",
                i
            ));
        } else if (target.variables.type[1] == "Other") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Other",
                i
            ));
        } else if (target.variables.type[1] == "Object 1x1") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Object 1x1",
                i
            ));
        } else if (target.variables.type[1] == "Object 2x2") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Object 2x2",
                i
            ));
        } else if (target.variables.type[1] == "NPC Drop") {
            ModItemsElement.appendChild(new ModItem(
                assets.zombieArm,
                target.name,
                "NPC Drop",
                i
            ));
        } else if (target.variables.type[1] == "Mask") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Mask",
                i
            ));
        } else if (target.variables.type[1] == "NPC") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "NPC",
                i
            ));
        } else if (target.variables.type[1] == "Object 2x1") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Object 2x1",
                i
            ));
        } else if (target.variables.type[1] == "Object 1x2") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Object 1x2",
                i
            ));
        } else if (target.variables.type[1] == "Door") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Door",
                i
            ));
        } else if (target.variables.type[1] == "Beam") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Beam",
                i
            ));
        } else if (target.variables.type[1] == "Fence") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Fence",
                i
            ));
        } else if (target.variables.type[1] == "Platform") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Platform",
                i
            ));
        } else if (target.variables.type[1] == "Torch") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Torch",
                i
            ));
        } else if (target.variables.type[1] == "Chain") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Chain",
                i
            ));
        } else if (target.variables.type[1] == "Staff") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Staff",
                i
            ));
        } else if (target.variables.type[1] == "Chest Gen") {
            ModItemsElement.appendChild(new ModItem(
                assets.goldChest,
                target.name,
                "Chest Gen",
                i
            ));
        } else if (target.variables.type[1] == "Table") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Table",
                i
            ));
        } else if (target.variables.type[1] == "Chair") {
            ModItemsElement.appendChild(new ModItem(
                ProjectData.costumes[target.costumes[0].assetId].dataURL,
                target.name,
                "Chair",
                i
            ));
        } else if (target.variables.type[1] == "World Gen") {
            ModItemsElement.appendChild(new ModItem(
                assets.worldGen,
                target.name,
                "World Gen",
                i
            ));
        }
    }
}

/*--------------------
Animation
--------------------*/
const Title = document.querySelector("#Title");
setInterval(() => Title.style.transform = `rotate(${5 * Math.cos((Math.PI * (Date.now() * 0.08)) / 180)}deg)`);

document.querySelectorAll("button").forEach((element) => {
    element.addEventListener("mouseover", ButtonAnimation);
});

function ButtonAnimation(e) {
    var target = e.target;
    while (target && target.tagName != "BUTTON") target = target.parentElement;
    if (target.tagName == "BUTTON") {
        const Loop = setInterval(() => target.style.transform = `translateY(${3 * Math.sin((Math.PI * (Date.now() * 0.25)) / 180)}px)`);
        const mouseLeave = target.addEventListener("mouseleave", (e) => {
            clearInterval(Loop);
            target.style.transform = "";
            target.removeEventListener("mouseleave", mouseLeave);
        });
    }
}

/*--------------------
Reader
--------------------*/
function ReadAsDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

/*--------------------
Open Zipped HTML Pages
--------------------*/
window.windowData = window.windowData || {};
async function openZippedHTMLPage(url, parameters = "", autoClose = true, windowVariables = {}) {
    return new Promise(async (resolve) => {
        if (!(url in windowData)) {
            windowData[url] = {
                files: {},
                scripts: [],
                styles: []
            };
            let zip = await JSZip.loadAsync(await (await fetch(url)).blob());
            await (() => {
                return new Promise(resolve => {
                    zip.forEach(async (name, file) => {
                        windowData[url].files[name] = await file.async("string");
                        if (Object.keys(windowData[url].files).length == Object.keys(zip.files).length) {
                            resolve();
                        }
                    });
                });
            })();
            windowData[url].files["index.html"] = windowData[url].files["index.html"].replaceAll(`\x3C`, "<");
            console.log(windowData[url].files["index.html"]);
            let htmlDocument = new DOMParser().parseFromString(windowData[url].files["index.html"], "text/html");
            console.log(htmlDocument);
            htmlDocument.querySelectorAll("script").forEach(element => {
                windowData[url].scripts.push(element.getAttribute("src"));
                element.remove();
            });
            htmlDocument.querySelectorAll("link[rel='stylesheet']").forEach(element => {
                windowData[url].styles.push(element.getAttribute("href"));
                element.remove();
            });
            windowData[url].innerHTML = htmlDocument.documentElement.innerHTML;
        }
        const openedWindow = window.open("", "_blank", parameters);
        openedWindow.document.body.innerText = "Loading...";
        Object.defineProperty(openedWindow, "windowData", { get: function() { return window.windowData } });
        Object.assign(openedWindow, windowVariables);
        openedWindow.document.documentElement.innerHTML = windowData[url].innerHTML;
        if (autoClose) window.addEventListener("close", openedWindow.close);
        windowData[url].styles.forEach(fileName => {
            let style = document.createElement("style");
            style.innerHTML = windowData[url].files[fileName];
            openedWindow.document.head.appendChild(style);
        });
        windowData[url].scripts.forEach(fileName => {
            let script = document.createElement("script");
            script.innerHTML = windowData[url].files[fileName];
            openedWindow.document.head.appendChild(script);
        });
        resolve(openedWindow);
    });
}

/*--------------------
Unsaved Changes
--------------------*/
window.onbeforeunload = function(e) {
    if (UnsavedChanges) {
        (e || window.event).returnValue = true;
        return true;
    }
}
