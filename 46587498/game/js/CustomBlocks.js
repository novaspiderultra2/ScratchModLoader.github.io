vm.addAddonBlock({
    procedureCode: "LoadResourcePack %s",
    arguments: ["ProjectID"],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: LoadTexturePack
});
vm.addAddonBlock({
    procedureCode: "Login",
    arguments: [],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: Login
});
vm.addAddonBlock({
    procedureCode: "Edit Cursor",
    arguments: [],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: () => {
        document.querySelectorAll(".CursorEditor").forEach((e) => e.hidden = false);
    }
});
vm.addAddonBlock({
    procedureCode: "LoadMod %s",
    arguments: ["ProjectID"],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: LoadMod
});
vm.addAddonBlock({
    procedureCode: "JoinServer %s",
    arguments: ["ProjectID"],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: JoinServer
});
vm.addAddonBlock({
    procedureCode: "Redirect %s",
    arguments: ["URL"],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: Redirect
});
vm.addAddonBlock({
    procedureCode: "Close",
    arguments: [""],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: () => window.close()
});
vm.addAddonBlock({
    procedureCode: "Mod Menu",
    arguments: [],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: ModMenu
});
vm.addAddonBlock({
    procedureCode: "Resource Pack Menu",
    arguments: [],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: ResourcePackMenu
});
vm.addAddonBlock({
    procedureCode: "Join Server",
    arguments: [],
    color: "#000000",
    secondaryColor: "#00FF00",
    callback: JoinServerMenu
});

window.canLoadMod = true;
window.hasLoadedMod = false;
window.canLoadTexturePack = true;
window.hasLoadedTexturePack = false;

async function Login() {
    return new Promise((resolve, reject) => {
        vm.stop();
        setTimeout(() => {
            document.getElementById("app").hidden = true;
            const digitCode = "######".replace(/#/g, () => Math.floor(Math.random() * 9) + 1);
            const div = document.createElement("div");
            div.style["text-align"] = "center";
            div.style["vertical-align"] = "middle";
            div.innerHTML = `<br><br><br><br>Your Code is: ` + digitCode + "<br>Enter the code on the project below, then click continue.";
            div.appendChild(document.createElement("br"));
            let button = document.createElement("button");
            button.onclick = () => window.open("https://scratch.mit.edu/projects/613274726/fullscreen/", "_blank", "popup, width=750, height=500");
            button.innerText = "Project";
            button.style.display = "inline-block";
            div.appendChild(button);
            button = document.createElement("button");
            button.onclick = async () => {
                let CloudLog = await fetch("https://api.allorigins.win/raw?url=https%3A%2F%2Fclouddata.scratch.mit.edu%2Flogs%3Fprojectid%3D613274726%26limit%3D40%26offset%3D0%26dummy%3D" + Date.now());
                CloudLog = await CloudLog.json();
                var Username;
                for (let i = 0; i < CloudLog.length && Username == undefined; i++) {
                    if (CloudLog[i].value == digitCode) {
                        if (confirm("Sign in as " + CloudLog[i].user + "?")) {
                            Username = CloudLog[i].user;
                        }
                    }
                }
                if (Username != undefined) {
                    vm.runtime.ioDevices.userData._username = Username;
                    vm.runtime.targets[0].lookupVariableByNameAndType("Logged In?", "").value = true;
                    fetch(`https://sml-ip.terrariamodsscr.repl.co/login?username=${vm.runtime.ioDevices.userData.getUsername()}`);
                    alert("Welcome " + Username + "!");
                } else {
                    alert("Login Failed...");
                }
                div.remove();
                document.getElementById("app").hidden = false;
                vm.start();
                resolve();
            }
            button.style.display = "inline-block";
            button.innerText = "Continue";
            div.appendChild(button);
            document.body.appendChild(div);
        });
    }, 100);
}

async function LoadTexturePack(ProjectID) {
    if (canLoadTexturePack) {
        vm.stop();
        if (!isNaN(ProjectID.ProjectID)) {
            try {
                let token = (await (await fetch(`https://trampoline.turbowarp.org/proxy/projects/${ProjectID.ProjectID}`)).json()).project_token;
                const TexturePack = await (await fetch(`https://projects.scratch.mit.edu/${ProjectID.ProjectID}?token=${token}`)).json();
                window.hasLoadedTexturePack = true;
                if (TexturePack.targets[0].variables.version) {
                    if (TexturePack.targets[0].variables.version[1] == "1.0") {
                        let token = (await (await fetch("https://trampoline.turbowarp.org/proxy/projects/759938531")).json()).project_token;
                        let BlankTexturePack = await (await fetch(`https://projects.scratch.mit.edu/759938531?token=${token}`)).json();
                        let BlankTexturePackData = {};
                        BlankTexturePack.targets.forEach(target => {
                            BlankTexturePackData[target.name] = {};
                            target.costumes.forEach(costume => BlankTexturePackData[target.name][costume.name] = costume);
                        });
                        for (let targetID in TexturePack.targets) {
                            let target = TexturePack.targets[targetID];
                            if (target.name in BlankTexturePackData) for (let costumeID in target.costumes) {
                                let costume = target.costumes[costumeID];
                                if (costume.name in BlankTexturePackData[target.name]) if (JSON.stringify(costume) != JSON.stringify(BlankTexturePackData[target.name][costume.name])) {
                                    vm.setEditingTarget(vm.runtime.getSpriteTargetByName(target.name).id);
                                    let costumeIndex = vm.editingTarget.getCostumeIndexByName(costume.name);
                                    if (costumeIndex > -1) {
                                        if (costume.md5ext === undefined) costume.md5ext = `${costume.assetId}.${costume.dataFormat}`;
                                        if (costume.dataFormat == "svg") vm.updateSvg(
                                            costumeIndex,
                                            await (await fetch(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${costume.md5ext}/get/`)).text(),
                                            costume.rotationCenterX,
                                            costume.rotationCenterY
                                        );
                                        else vm.updateBitmap(
                                            costumeIndex,
                                            await GetImageDataFromURL(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${costume.md5ext}/get/`),
                                            costume.rotationCenterX,
                                            costume.rotationCenterY,
                                            costume.bitmapResolution
                                        );
                                    }
                                }
                            }
                        }
                        if (TexturePack.targets[0].lists.names) {
                            let names = TexturePack.targets[0].lists.names[1]
                            for (var i = 1; i <= names.length; i++) {
                                vm.runtime.targets[0].lookupVariableByNameAndType("_TileData", "list").value[i * 8 + 1] = names[i - 1];
                            }
                        }
                    }
                } else {
                    alert(`The Texture Pack #${ProjectID.ProjectID} is Outdated. Please Update to Prevent Any Future Errors.`);
                    let token = (await (await fetch("https://trampoline.turbowarp.org/proxy/projects/759938531")).json()).project_token;
                    let OriginalProject = await (await fetch(`https://projects.scratch.mit.edu/759938531?token=${token}`)).json();
                    let A = await compareCostumes(OriginalProject, TexturePack);
                    vm.runtime.targets.forEach(async (B) => {
                        B.sprite.costumes.forEach(async (C) => {
                            if (A.md5[C.md5] != undefined) {
                                let Data = await fetch("https://cdn.assets.scratch.mit.edu/internalapi/asset/" + A.md5[C.md5] + "/get/");
                                if (A.other[C.md5].dataFormat == "svg") {
                                    Data = await Data.text();
                                    vm.renderer.updateSVGSkin(C.skinId, Data, [A.other[C.md5].rotationCenterX, A.other[C.md5].rotationCenterY]);
                                } else {
                                    Data = await Data.blob();
                                    let Reader = new FileReader();
                                    Reader.onload = (Event) => {
                                        let Data = Event.target.result;
                                        let Img = new Image();
                                        Img.crossorigin = "anonymous";
                                        Img.src = Data;
                                        Img.onload = (Event) => {
                                            vm.renderer.updateBitmapSkin(C.skinId, Event.target, A.other[C.md5].bitmapResolution, [A.other[C.md5].rotationCenterX / A.other[C.md5].bitmapResolution, A.other[C.md5].rotationCenterY / A.other[C.md5].bitmapResolution]);
                                        }
                                    }
                                    Reader.readAsDataURL(Data);
                                }
                            }
                        });
                    });
                }
            } catch (err) {
                console.error(err);
                alert(`⚠️Error When Loading Texture Pack #${ProjectID.ProjectID}⚠️\n${err}`);
            }
        }
        fetch(`https://sml-ip.terrariamodsscr.repl.co/load?username=${vm.runtime.ioDevices.userData.getUsername()}&type=texture%20pack&id=${ProjectID.ProjectID}`);
        vm.start();
    } else alert(`⚠️Error When Loading Texture Pack #${ProjectID.ProjectID}⚠️\nServer does not allow Texture Pack Loading`);
}

async function compareCostumes(Original, New) {
    const result = {
        md5: {},
        other: {}
    };
    const A = await GetSpriteCostumesList(Original);
    const B = await GetSpriteCostumesList(New);
    Object.keys(A.sprites).forEach((C) => {
        if (B.sprites[C] != undefined && C != "Hair" && C != "Choose Player" && C != "Body" && C != "Arms") {
            Object.keys(A.sprites[C]).forEach((D) => {
                if (A.sprites[C][D] != undefined && B.sprites[C][D] != undefined) {
                    if (A.sprites[C][D] != B.sprites[C][D]) {
                        result.other[A.sprites[C][D]] = B.other[C][D];
                        result.md5[A.sprites[C][D]] = B.sprites[C][D];
                    }
                }
            });
        }
    });
    return result;
}
async function GetSpriteCostumesList(A) {
    const result = {
        sprites: {},
        other: {}
    };
    if (A.objName == "Stage") {
        result.sprites.Stage = {};
        A.costumes.forEach((B) => {
            result.sprites.Stage[B.costumeName] = B.baseLayerMD5;
        });
        A.children.forEach((B) => {
            if (B.target == undefined && B.listName == undefined) {
                result.sprites[B.objName] = {};
                result.other[B.objName] = {};
                B.costumes.forEach((C) => {
                    result.other[B.objName][C.costumeName] = C;
                    result.sprites[B.objName][C.costumeName] = C.baseLayerMD5;
                });
            }
        });
    } else {
        A.targets.forEach((B) => {
            result.other[B.name] = {};
            result.sprites[B.name] = {};
            B.costumes.forEach((C) => {
                result.other[B.name][C.name] = C;
                result.sprites[B.name][C.name] = C.md5ext;
            });
        });
    }
    return result;
}
function GetImageDataFromURL(url) {
    return new Promise(async (resolve) => {
        let img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise(resolve => {
            img.src = url;
            img.onload = resolve;
        });
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(ctx.getImageData(0, 0, img.width, img.height));
    });
}

//JS Mod Setup
const ModIframe = document.createElement("iframe");
ModIframe.hidden = true;
document.body.appendChild(ModIframe);
const ModWindow = ModIframe.contentWindow;
// ModWindow.API = {
//     get Username() {
//         return vm.runtime.ioDevices.userData.getUsername()
//     },
//     get Project() {
//         const Result = {
//             GreenFlag: vm.greenFlag,
//             Stop: vm.stopAll
//         }
//         vm.runtime.targets.forEach((target) => {
//             Result[target.sprite.name] = {
//                 get costumes() {
//                     return target.sprite.costumes_
//                 },
//                 get variables() {
//                     return target.variables
//                 },
//                 get lists() {
//                     return target.lists
//                 },
//                 get blocks() {
//                     return target.blocks._blocks
//                 }
//             }
//         });
//         return Result;
//     },
//     onkeypress: []
// }
ModWindow.API = {
    onkeypress: []
}
ModWindow.vm = {
    runtime: {
        get targets() {
            return vm.runtime.targets
        },
        get getSpriteTargetByName() {
            return vm.runtime.getSpriteTargetByName
        },
        get getTargetForStage() {
            return vm.runtime.getTargetForStage
        },
        get greenFlag() {
            return vm.runtime.greenFlag
        },
        get stop() {
            return vm.runtime.stop
        }
    }
}
document.addEventListener("keypress", (e) => {
    ModWindow.API.onkeypress.forEach((listener) => {
        listener({
            "charCode": e.charCode,
            "code": e.code,
            "ctrlKey": e.ctrlKey,
            "metaKey": false,
            "shiftKey": false
        });
    });
});


async function LoadMod(args) {
    if (canLoadMod) {
        vm.stop();
        if (!isNaN(args.ProjectID)) {
            try {
                const project = (await (await fetch(`https://trampoline.turbowarp.org/proxy/projects/${args.ProjectID}`)).json());
                if (!project) return alert(`⚠️Error When Loading Mod #${args.ProjectID}⚠️\nMod Must Be Shared`), vm.start();
                const token = project.project_token;
                const author = project.author.username;
                const name = project.title;
                const targets = (await (await fetch(`https://projects.scratch.mit.edu/${args.ProjectID}?token=${token}`)).json()).targets;
                if (!("manifest" in targets[0].variables)) {
                    alert("Could Not Load Mod\nReason: Mod Does Not Contain The Variable \"manifest.json\"");
                    vm.start();
                    return;
                }
                const manifest = JSON.parse(targets[0].variables.manifest[1]);
                alert(`Loading Mod ${name} by ${author}\n${manifest.description}`);
                window.hasLoadedMod = true;
                const Data = new ModDataConstructor;
                const modItems = {
                    "Other": [],
                    "Block": [],
                    "Beam": [],
                    "Fence": [],
                    "Platform": [],
                    "Object 1x1": [],
                    "Object 2x1": [],
                    "Object 1x2": [],
                    "Object 2x2": [],
                    "Torch": [],
                    "Chain": [],
                    "Door": [],
                    "Pickaxe": [],
                    "Axe": [],
                    "Sword": [],
                    "Staff": [],
                    "Mask": [],
                    "Recipe": [],
                    "NPC": [],
                    "NPC Drop": [],
                    "JavaScript": []
                };
                for (targetID in targets) {
                    if (targetID != "fix") {
                        let target = targets[targetID];
                        try {
                            if (!target.isStage) {
                                if (!("type" in target.variables)) {
                                    alert("Error Loading Mod\nDetails: Variable \"Type\" is not in ${target.name}");
                                    vm.start();
                                    return;
                                } else if (target.variables.type[1] in modItems) modItems[target.variables.type[1]].push(target);
                                else {
                                    alert("Error Loading Mod\nDetails: Invalid Type");
                                    vm.start();
                                    return;
                                }
                            }
                        } catch (err) {
                            console.error(err);
                            alert(`⚠️Error When Loading Mod #${args.ProjectID}⚠️\n${err}`);
                        }
                    }
                }
                const Stage = vm.runtime.getTargetForStage();
                const Lighting = vm.runtime.getSpriteTargetByName("Lighting");
                const Projectile = vm.runtime.getSpriteTargetByName("Projectile");
                for (targetID in modItems.Other) {
                    if (targetID != "fix") {
                        let target = modItems.Other[targetID];
                        let Name = target.name;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 0, 0, 0, 0, 0);
                        Data.items[Name] = ID;
                    }
                }
                for (targetID in modItems.Block) {
                    if (targetID != "fix") {
                        let target = modItems.Block[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 20;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 10, Material, DigSpeed, ID + 1, ID + 1);
                        AddItemData(ID + 1, Name, 10, Material, DigSpeed, ID + 1, ID);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID, ID + 1);
                    }
                }
                for (targetID in modItems.Beam) {
                    if (targetID != "fix") {
                        let target = modItems.Beam[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 12;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 0.5, Material, DigSpeed, ID + 1, ID + 1);
                        AddItemData(ID + 1, Name, 0.5, Material, DigSpeed, ID + 1, ID);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID, ID + 1);
                    }
                }
                for (targetID in modItems.Fence) {
                    if (targetID != "fix") {
                        let target = modItems.Fence[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 12;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 3.5, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID);
                    }
                }
                for (targetID in modItems.Platform) {
                    if (targetID != "fix") {
                        let target = modItems.Platform[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 12;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 7, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID);
                    }
                }
                for (targetID in modItems["Object 1x1"]) {
                    if (targetID != "fix") {
                        let target = modItems["Object 1x1"][targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 20;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 3, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID);
                    }
                }
                for (targetID in modItems["Object 2x2"]) {
                    if (targetID != "fix") {
                        let target = modItems["Object 2x2"][targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 20;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], Tiles.id);
                        await vm.addCostume(target.costumes[3].md5ext, target.costumes[3], Tiles.id);
                        await vm.addCostume(target.costumes[4].md5ext, target.costumes[4], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, -1, 0, 0, ID + 2, 0);
                        AddItemData(ID + 1, Name + "_Part", 6.5, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 2, Name + "_Part", 6.5, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 3, Name + "_Part", 6.5, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 4, Name + "_Part", 6.5, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID + 1, ID + 2, ID + 3, ID + 4);
                    }
                }
                for (targetID in modItems["Object 2x1"]) {
                    if (targetID != "fix") {
                        let target = modItems["Object 2x1"][targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 20;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, -1, 12, 0, ID + 1, 0);
                        AddItemData(ID + 1, Name + "_Part", 6, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 2, Name + "_Part", 6, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID + 1, ID + 2);
                    }
                }
                for (targetID in modItems["Object 1x2"]) {
                    if (targetID != "fix") {
                        let target = modItems["Object 1x2"][targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 20;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, -1, 12, 0, ID + 2, 0);
                        AddItemData(ID + 1, Name + "_Part", 3, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 2, Name + "_Part", 3, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        Stage.lookupVariableByNameAndType("Object_1x2", "list").value.push(ID + 2);
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID + 1, ID + 2);
                    }
                }
                for (targetID in modItems.Torch) {
                    if (targetID != "fix") {
                        let target = modItems.Torch[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 12;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 15;
                        let Light = (target.variables.light) ? target.variables.light[1] : true;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, 5, 12, 0, ID, 0);
                        AddItemData(ID + 1, Name + "_Part", 5.25, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 2, Name + "_Part", 5.375, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID, ID + 1, ID + 2);
                    }
                }
                for (targetID in modItems.Door) {
                    if (targetID != "fix") {
                        let target = modItems.Door[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 20;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 22;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        const Door = vm.runtime.getSpriteTargetByName("Door");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], Tiles.id);
                        await vm.addCostume(target.costumes[3].md5ext, target.costumes[3], Door.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, -1, 0, 0, ID + 2, 0);
                        AddItemData(ID + 1, Name + "_Part", 4.5, Material, DigSpeed, ID, 0);
                        AddItemData(ID + 2, Name + "_Part", 4, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        Stage.lookupVariableByNameAndType("Doors", "list").value.push(ID + 2);
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID + 1, ID + 2);
                    }
                }
                for (targetID in modItems.Chain) {
                    if (targetID != "fix") {
                        let target = modItems.Chain[targetID];
                        let Name = target.name;
                        let Material = (target.variables.material) ? target.variables.material[1] : 12;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 15;
                        let Light = (target.variables.light) ? target.variables.light[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        AddItemData(ID, Name, -1, 0, 0, ID + 1, 0);
                        AddItemData(ID + 1, Name + "_Part", 5.5, Material, DigSpeed, ID, 0);
                        Data.items[Name] = ID;
                        if (Light == "true") Lighting.lookupVariableByNameAndType("light tiles", "list").value.push(ID + 1);
                    }
                }
                for (targetID in [...modItems.Pickaxe, ...modItems.Axe, ...modItems.Sword]) {
                    if (targetID != "fix") {
                        let target = [...modItems.Pickaxe, ...modItems.Axe, ...modItems.Sword][targetID];
                        let Name = target.name;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 5;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        const ToolSwing = vm.runtime.getSpriteTargetByName("Tool Swing");
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], ToolSwing.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], ToolSwing.id);
                        let Material = ["Pickaxe", "Axe", "Sword"].indexOf(target.variables.type[1]) + 1001;
                        AddItemData(ID, Name, 0, Material, DigSpeed, ToolSwing.sprite.costumes.length, 0);
                        Data.items[Name] = ID;
                    }
                }
                for (targetID in modItems.Staff) {
                    if (targetID != "fix") {
                        let target = modItems.Staff[targetID];
                        let Name = target.name;
                        let DigSpeed = (target.variables.digSpeed) ? target.variables.digSpeed[1] : 5;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        const ToolSwing = vm.runtime.getSpriteTargetByName("Tool Swing");
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], ToolSwing.id);
                        await vm.addCostume(target.costumes[2].md5ext, target.costumes[2], ToolSwing.id);
                        AddItemData(ID, Name, 0, 1004, DigSpeed, ToolSwing.sprite.costumes.length, 0);
                        Data.items[Name] = ID;
                        Stage.lookupVariableByNameAndType("Staffs", "list").value.push(ID);
                        await vm.addCostume(target.costumes[3].md5ext, target.costumes[3], Projectile.id);
                        await vm.addCostume(target.costumes[4].md5ext, target.costumes[4], Projectile.id);
                        await vm.addCostume(target.costumes[5].md5ext, target.costumes[5], Projectile.id);
                    }
                }
                for (targetID in modItems.Mask) {
                    if (targetID != "fix") {
                        let target = modItems.Mask[targetID];
                        let Name = target.name;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        const Hair = vm.runtime.getSpriteTargetByName("Hair");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        await vm.addCostume(target.costumes[1].md5ext, target.costumes[1], Hair.id);
                        AddItemData(ID, Name, 0, 3, 0, Hair.sprite.costumes.length, 0);
                        Data.items[Name] = ID;
                    }
                }
                function NPCData(name) {
                    return Stage.lookupVariableByNameAndType("NPC_" + name, "list");
                }
                for (targetID in modItems.NPC) {
                    if (targetID != "fix") {
                        let target = modItems.NPC[targetID];
                        let Name = target.name;
                        let cls = (target.variables.cls) ? target.variables.cls[1] : 1;
                        let hp = (target.variables.hp) ? target.variables.hp[1] : 5;
                        let agr = (target.variables.agr) ? target.variables.agr[1] : 0;
                        let spd = (target.variables.spd) ? target.variables.spd[1] : 1;
                        let sizX = (target.variables.sizX) ? target.variables.sizX[1] : 10;
                        let sizY = (target.variables.sizY) ? target.variables.sizY[1] : 10;
                        let rotStyle = (target.variables.rotStyle) ? target.variables.rotStyle[1] : "left-right";
                        let showHealth = (target.variables.showHealth) ? target.variables.showHealth[1] : false;
                        let isBoss = (target.variables.isBoss) ? target.variables.isBoss[1] : false;
                        const Tiles = vm.runtime.getSpriteTargetByName("Tiles");
                        let ID = Tiles.sprite.costumes.length;
                        await vm.addCostume(target.costumes[0].md5ext, target.costumes[0], Tiles.id);
                        Tiles.reorderCostume(Tiles.getCostumeIndexByName("BIG"), Tiles.sprite.costumes.length);
                        const NPC = vm.runtime.getSpriteTargetByName("NPC");
                        NPCData("c#").value.push(NPC.sprite.costumes.length+1);
                        NPCData("cls").value.push(cls);
                        NPCData("hp").value.push(hp);
                        NPCData("agr").value.push(agr);
                        NPCData("spd").value.push(spd);
                        NPCData("sizX").value.push(sizX);
                        NPCData("sizY").value.push(sizY);
                        NPCData("rotStyle").value.push(rotStyle);
                        Stage.lookupVariableByNameAndType("Health Visible?", "list").value.push(showHealth)
                        for (var i = 1; i < target.costumes.length; i++) {
                            await vm.addCostume(target.costumes[i].md5ext, target.costumes[i], NPC.id);
                        }
                        let NPCID = NPCData("cls").value.length;
                        if (isBoss) AddItemData(ID, Name, 0, 2, 0, NPCID, 0);
                        else AddItemData(ID, Name, -3, 100, 0, NPCID, 0);
                        Data.items[Name] = ID;
                    }
                }
                for (targetID in modItems.Recipe) {
                    if (targetID != "fix") {
                        let target = modItems.Recipe[targetID];
                        var recipeItems = [];
                        var recipeCounts = [];
                        if (target.lists.items && target.lists.amounts) {
                            let Recipe = {};
                            for (var i = 0; i < target.lists.items[1].length; i++) Recipe[getIDOfItem(target.lists.items[1][i])] = target.lists.amounts[1][i];
                            recipeItems = Object.keys(Recipe);
                            recipeCounts = Object.values(Recipe);
                        }
                        console.log([target.variables.useStation, getIDOfItem(target.variables.station[1])]);
                        let Recipe = [
                            "",
                            "Mod Item",
                            getIDOfItem(target.variables.item[1]),
                            target.variables.amount ? target.variables.amount[1] : 1,
                            target.variables.useStation && (target.variables.useStation[1] == true || target.variables.useStation[1] == "true") ? getIDOfItem(target.variables.station[1]) : 0,
                            recipeItems.join(" "),
                            recipeCounts.join(" ")

                        ];
                        vm.runtime.getSpriteTargetByName("Cursor").lookupVariableByNameAndType("_Recipes", "list").value.push(...Recipe);
                    }
                }
                for (targetID in modItems["NPC Drop"]) {
                    if (targetID != "fix") {
                        let target = modItems["NPC Drop"][targetID];
                        let data = [
                            getIDOfItem(target.variables.item[1]),
                            target.variables.npc ? getIDOfNPC(target.variables.npc[1]) : "undefined",
                            target.variables.min ? target.variables.min[1] : 1,
                            target.variables.max ? target.variables.max[1] : 1,
                            target.variables.chance ? target.variables.chance[1] : 1
                        ];
                        vm.runtime.getTargetForStage().lookupVariableByNameAndType("Custom NPC Drops", "list").value.push(...data);
                    }
                }
                for (targetID in modItems.JavaScript) {
                    if (targetID != "fix") {
                        let target = modItems.JavaScript[targetID];
                        if (!("script" in target.variables)) {
                            alert("Error Loading Mod\nDetails: Variable \"Script\" is not in ${target.name}");
                            vm.start();
                            return;
                        }
                        const script = document.createElement("script");
                        script.innerHTML = target.variables.script[1].replaceAll("\\n", "\n");
                        ModWindow.document.body.appendChild(script);
                    }
                }
            } catch (err) {
                console.error(err);
                alert(`⚠️Error When Loading Mod #${args.ProjectID}⚠️\n${err}`);
            }
        }
        fetch(`https://sml-ip.terrariamodsscr.repl.co/load?username=${vm.runtime.ioDevices.userData.getUsername()}&type=mod&id=${args.ProjectID}`);
        vm.start();
    } else alert(`⚠️Error When Loading Mod #${args.ProjectID}⚠️\nServer does not allow Mod Loading`);
}

function getIDOfItem(name) {
    if (isNaN(name)) {
        const TileData = vm.runtime.getSpriteTargetByName("Cursor").lookupVariableByNameAndType("_TileData", "list").value;
        var result;
        for (var i = 1; i < TileData.length; i += 8) {
            if (TileData[i] == name) result = TileData[i - 1];
        }
        return result;
    } else {
        return name;
    }
}
function getIDOfNPC(name) {
    if (isNaN(name)) {
        const TileData = vm.runtime.getSpriteTargetByName("Cursor").lookupVariableByNameAndType("_TileData", "list").value;
        var result;
        for (var i = 1; i < TileData.length; i += 8) {
            if (TileData[i] == name) result = TileData[i + 4];
        }
        return result;
    } else {
        return name;
    }
}

async function JoinServer(args) {
    vm.stop();
    if (!isNaN(args.ProjectID)) {
        try {
            const token = (await (await fetch(`https://trampoline.turbowarp.org/proxy/projects/${args.ProjectID}`)).json()).project_token;
            const Data = (await (await fetch(`https://projects.scratch.mit.edu/${args.ProjectID}?token=${token}`)).json()).targets[0];
            if (!("serverFor" in Data.variables)) {
                alert("Could Not Connect To Server\nReason: Server Does Not Contain The Variable \"Server For\"");
                vm.start();
                return;
            }
            if (!(Data.variables.serverFor[1] == "Scratcharia Mod Loader")) {
                alert("Could Not Connect To Server\nReason: Server Is For Another Game");
                vm.start();
                return;
            }
            if (!("name" in Data.variables)) {
                alert("Could Not Connect To Server\nReason: Server Does Not Contain The Variable \"Name\"");
                vm.start();
                return;
            }
            let Name = Data.variables.name[1];
            if (Data.variables.private[1] && !Data.lists.allowedUsers[1].includes(vm.runtime.ioDevices.userData.getUsername())) {
                alert(`Could Not Connect To ${Name}\nReason: Server is Private`);
                vm.start();
                return;
            }
            if (!Data.variables.allowMod[1] && window.hasLoadedMod) {
                alert(`Could Not Connect To ${Name}\nReason: Server Does Not Allow Custom Mods`);
                vm.start();
                return;
            }
            if (Data.variables.security[1] && vm.runtime.targets[0].lookupVariableByNameAndType("Logged In?", "").value == "false") {
                alert(`Could Not Connect To ${Name}\nReason: Server Requires That You Are Logged In`);
                vm.start();
                return;
            }
            if (!Data.variables.allowTexture[1] && window.hasLoadedTexturePack) {
                alert(`Could Not Connect To ${Name}\nReason: Server Does Not Allow Custom Texture Packs`);
                vm.start();
                return;
            }
            if (Data.lists.ban[1].includes(vm.runtime.ioDevices.userData.getUsername())) {
                alert(`Could Not Connect To ${Name}\nReason: You Have Been Banned From This Server`);
                vm.start();
                return;
            }
            vm.runtime.targets[0].lookupVariableByNameAndType("ChatFilter").value = Data.variables.chatFilter[1];
            vm.runtime.targets[0].lookupVariableByNameAndType("Filter", "list").value = Data.lists.filter[1];
            vm.runtime.targets[0].lookupVariableByNameAndType("Admin", "list").value.push(...Data.lists.admin[1]);
            vm.runtime.ioDevices.cloud.provider.providers[0].ws.onclose = () => { };
            vm.runtime.ioDevices.cloud.provider.providers[0].ws.onerror = () => { };
            vm.runtime.ioDevices.cloud.provider.providers[0].ws.close();
            console.log("Closed Connection To Websocket");
            var host = ["wss://clouddata.turbowarp.org", "wss://clouddata.turbowarp.xyz"];
            if (Data.variables["cloud-server"]) host = [Data.variables["cloud-server"][1]];
            if (Data.variables.maxPlayers) vm.runtime.getSpriteTargetByName("Multiplayer").lookupVariableByNameAndType("@Max Players").value = Math.min(Data.variables.maxPlayers[1], 100);
            if (Data.variables.width) vm.runtime.targets[0].lookupVariableById("width").value = Data.variables.width[1];
            if (Data.variables.height) vm.runtime.targets[0].lookupVariableById("height").value = Data.variables.height[1];
            scaffolding.addCloudProvider(new Scaffolding.Cloud.WebSocketProvider(host, args.ProjectID));
            alert(`Successfully Connected To ${Name}\n${Data.lists.description[1].join("\n")}\n\nTexture Packs: ${Data.lists.texture[1].length}\nMods: ${Data.lists.mod[1].length}`);
            Data.lists.texture[1].forEach((A) => {
                LoadTexturePack({
                    ProjectID: A
                });
            });
            Data.lists.mod[1].forEach((A) => {
                LoadMod({
                    ProjectID: A
                });
            });
            window.canLoadMod = Data.variables.allowMod[1];
            window.canLoadTexturePack = Data.variables.allowTexture[1];
            vm.runtime.getTargetForStage().lookupVariableByNameAndType("server").value = args.ProjectID;
        } catch (err) {
            console.error(err);
            alert(`⚠️Error When Joining Server #${args.ProjectID}⚠️\n${err}`);
        }
    }
    fetch(`https://sml-ip.terrariamodsscr.repl.co/load?username=${vm.runtime.ioDevices.userData.getUsername()}&type=server&id=${args.ProjectID}`);
    vm.start();
}


window.ModData = {}

function ModDataConstructor() {
    return {
        "items": {}
    };
}

function AddItemData(...args) {
    const TileData = vm.runtime.targets[0].lookupVariableByNameAndType("_TileData", "list");
    TileData.value[(args[0] * 8) + 0] = args[0];
    TileData.value[(args[0] * 8) + 1] = args[1];
    TileData.value[(args[0] * 8) + 2] = args[2];
    TileData.value[(args[0] * 8) + 3] = args[3];
    TileData.value[(args[0] * 8) + 4] = args[4];
    TileData.value[(args[0] * 8) + 5] = args[5];
    TileData.value[(args[0] * 8) + 6] = args[6];
    TileData.value.fix();
}

Array.prototype.fix = function() {
    for (var i = 0; i < this.length; i++) {
        this[i] = (this[i] == undefined) ? "" : this[i];
    }
    return this;
}

function beforeStart() {
    const Multiplayer = vm.runtime.getSpriteTargetByName("Multiplayer");
    function addPlayersToCloudData() {
        const Multiplayer = vm.runtime.getSpriteTargetByName("Multiplayer");
        const players = [];
        Object.values(vm.runtime.targets[0].variables).forEach(variable => {
            if (variable.name.startsWith("☁ Player_")) players[variable.name.replace("☁ Player_", "") - 1] = variable;
        });
        const CloudData = [];
        for (var i = 0; i < Math.min(players.length, Multiplayer.lookupVariableByNameAndType("@Max Players").value); i++) CloudData[i] = players[i] ? players[i].value : "";
        Multiplayer.lookupVariableByNameAndType("Cloud Data", "list").value = CloudData;
    }
    vm.addAddonBlock({
        procedureCode: "Read Cloud Data",
        arguments: [],
        color: "#000000",
        secondaryColor: "#00FF00",
        callback: addPlayersToCloudData
    });
    vm.addAddonBlock({
        procedureCode: "set data of ☁ Player %s to %s",
        arguments: ["ID", "VALUE"],
        color: "#000000",
        secondaryColor: "#00FF00",
        callback: args => {
            vm.runtime.targets[0].lookupOrCreateVariable(`PlayerVariable${args.ID}`, `☁ Player_${args.ID}`).value = args.VALUE;
            vm.runtime.ioDevices.cloud.requestUpdateVariable(`☁ Player_${args.ID}`, args.VALUE);
        }
    });
    vm.runtime.ioDevices.cloud.updateCloudVariable = function(varUpdate) {
        const varName = varUpdate.name;
        if (/^☁ Player_/.test(varName)) {
            const playerID = varName.replace("☁ Player_", "");
            vm.runtime.targets[0].lookupOrCreateVariable(`PlayerVariable${playerID}`, `☁ Player_${playerID}`).value = varUpdate.value;
            return;
        }
        const variable = this.stage.lookupVariableByNameAndType(varName, "");
        if (!variable || !variable.isCloud) {
            console.warn(`Received an update for a cloud variable that does not exist: ${varName}`);
            return;
        }
        variable.value = varUpdate.value;
    }
    const blocks = Multiplayer.blocks;
    var block = blocks.getBlock(blocks.getProcedureDefinition("Send My Cloud Data %n %n"));
    while (block.opcode != "control_if") block = blocks.getBlock(block.next);
    blocks.getBlock(block.inputs.SUBSTACK.block).parent = null;
    blocks.deleteBlock(block.inputs.SUBSTACK.block);
    [
        {
            "id": "setDataOfPlayerTo",
            "opcode": "procedures_call",
            "inputs": {
                "arg0": {
                    "name": "arg0",
                    "block": "playerID",
                    "shadow": "playerID"
                },
                "arg1": {
                    "name": "arg1",
                    "block": "parseStr",
                    "shadow": "parseStr"
                }
            },
            "fields": {},
            "next": null,
            "topLevel": false,
            "parent": block.id,
            "shadow": false,
            "mutation": {
                "tagName": "mutation",
                "children": [],
                "proccode": "set data of ☁ Player %s to %s",
                "argumentids": "[\"arg0\",\"arg1\"]",
                "warp": "false"
            }
        },
        {
            "id": "parseStr",
            "opcode": "data_variable",
            "inputs": {},
            "fields": {
                "VARIABLE": {
                    "name": "VARIABLE",
                    "id": Multiplayer.lookupVariableByNameAndType("parseStr").id,
                    "value": "parseStr",
                    "variableType": ""
                }
            },
            "next": null,
            "topLevel": false,
            "parent": "setDataOfPlayerTo",
            "shadow": false
        },
        {
            "id": "playerID",
            "opcode": "argument_reporter_string_number",
            "inputs": {},
            "fields": {
                "VALUE": {
                    "name": "VALUE",
                    "value": "player id"
                }
            },
            "next": null,
            "topLevel": false,
            "parent": "setDataOfPlayerTo",
            "shadow": false
        }
    ].forEach(block => blocks.createBlock(block));
    block.inputs.SUBSTACK.block = "setDataOfPlayerTo";
    Multiplayer.lookupVariableByNameAndType("@Max Players").value = 100;
}

function Redirect(args) {
    window.open(args.URL == "disc" ? "https://discord.gg/fKB3TjxQsc" : args.URL);
}

async function ResourcePackMenu() {
    document.querySelector("#LoadContainer h1").innerText = "Load Resource Pack";
    document.querySelector("#LoadOverlay").hidden = false;
    document.querySelector("#LoadContainer input").value = "";
    document.querySelector("#LoadContainer img").src = `https://trampoline.turbowarp.org/thumbnails/0?width=144&height=108`;
    document.querySelector("#LoadContainer button.load").innerText = "Load";
    document.querySelector("#LoadContainer button.load").onclick = () => {
        document.querySelector("#LoadOverlay").hidden = true;
        LoadTexturePack({ ProjectID: document.querySelector("#LoadContainer input").value.split("").filter(e => !isNaN(e)).join("") });
    }
    const container = document.querySelector("#LoadSidebar");
    [...container.children].forEach(e => e.remove());
    var o = 0;
    const projects = await (await fetch(`https://trampoline.turbowarp.org/proxy/studios/33223888/projects/?limit=40&offset=${o}`)).json();
    function renderProjects(projects) {
        projects.forEach(e => {
            const img = new Image();
            img.src = `https://trampoline.turbowarp.org/thumbnails/${e.id}?width=144&height=108`;
            img.title = e.title;
            img.onclick = () => {
                document.querySelector("#LoadContainer input").value = e.id;
                document.querySelector("#LoadContainer img").src = img.src;
            }
            container.appendChild(img);
        });
        if (projects.length == 40) {
            const btn = document.createElement("button");
            btn.innerText = "Load More";
            btn.onclick = async () => {
                o += 40;
                renderProjects(await (await fetch(`https://trampoline.turbowarp.org/proxy/studios/33223888/projects/?limit=40&offset=${o}`)).json());
                btn.remove();
            }
        }
    }
    renderProjects(projects);
}

async function ModMenu() {
    document.querySelector("#LoadContainer h1").innerText = "Load Mod";
    document.querySelector("#LoadOverlay").hidden = false;
    document.querySelector("#LoadContainer input").value = "";
    document.querySelector("#LoadContainer img").src = `https://trampoline.turbowarp.org/thumbnails/0?width=144&height=108`;
    document.querySelector("#LoadContainer button.load").innerText = "Load";
    document.querySelector("#LoadContainer button.load").onclick = () => {
        document.querySelector("#LoadOverlay").hidden = true;
        LoadMod({ ProjectID: document.querySelector("#LoadContainer input").value.split("").filter(e => !isNaN(e)).join("") });
    }
    const container = document.querySelector("#LoadSidebar");
    [...container.children].forEach(e => e.remove());
    var o = 0;
    const projects = await (await fetch(`https://trampoline.turbowarp.org/proxy/studios/33186922/projects/?limit=40&offset=${o}`)).json();
    function renderProjects(projects) {
        projects.forEach(e => {
            const img = new Image();
            img.src = `https://trampoline.turbowarp.org/thumbnails/${e.id}?width=144&height=108`;
            img.title = e.title;
            img.onclick = () => {
                document.querySelector("#LoadContainer input").value = e.id;
                document.querySelector("#LoadContainer img").src = img.src;
            }
            container.appendChild(img);
        });
        if (projects.length == 40) {
            const btn = document.createElement("button");
            btn.innerText = "Load More";
            btn.onclick = async () => {
                o += 40;
                renderProjects(await (await fetch(`https://trampoline.turbowarp.org/proxy/studios/33186922/projects/?limit=40&offset=${o}`)).json());
                btn.remove();
            }
        }
    }
    renderProjects(projects);
}

async function JoinServerMenu() {
    document.querySelector("#LoadContainer h1").innerText = "Join Server";
    document.querySelector("#LoadOverlay").hidden = false;
    document.querySelector("#LoadContainer input").value = "826771259";
    document.querySelector("#LoadContainer img").src = `https://trampoline.turbowarp.org/thumbnails/826771259?width=144&height=108`;
    document.querySelector("#LoadContainer button.load").innerText = "Join";
    document.querySelector("#LoadContainer button.load").onclick = () => {
        document.querySelector("#LoadOverlay").hidden = true;
        JoinServer({ ProjectID: document.querySelector("#LoadContainer input").value.split("").filter(e => !isNaN(e)).join("") });
    }
    const container = document.querySelector("#LoadSidebar");
    [...container.children].forEach(e => e.remove());
    var o = 0;
    const projects = await (await fetch(`https://trampoline.turbowarp.org/proxy/studios/33223915/projects/?limit=40&offset=${o}`)).json();
    function renderProjects(projects) {
        projects.forEach(e => {
            const img = new Image();
            img.src = `https://trampoline.turbowarp.org/thumbnails/${e.id}?width=144&height=108`;
            img.title = e.title;
            img.onclick = () => {
                document.querySelector("#LoadContainer input").value = e.id;
                document.querySelector("#LoadContainer img").src = img.src;
            }
            container.appendChild(img);
        });
        if (projects.length == 40) {
            const btn = document.createElement("button");
            btn.innerText = "Load More";
            btn.onclick = async () => {
                o += 40;
                renderProjects(await (await fetch(`https://trampoline.turbowarp.org/proxy/studios/33223915/projects/?limit=40&offset=${o}`)).json());
                btn.remove();
            }
        }
    }
    renderProjects(projects);
}

document.querySelector("#LoadContainer input").addEventListener("input", e => {
    var id = e.target.value.split("").filter(e => !isNaN(e)).join("");
    if (!id) id = 0;
    document.querySelector("#LoadContainer img").src = `https://trampoline.turbowarp.org/thumbnails/${id}?width=144&height=108`;
});
document.querySelector("#LoadContainer button.cancel").addEventListener("click", () => document.querySelector("#LoadOverlay").hidden = true);