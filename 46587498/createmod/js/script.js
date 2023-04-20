//--------------------
//Global Variables
//--------------------
const Editor = document.getElementById("Editor");
const Mod = document.getElementById("Mod");
var UnsavedChanges = false;
var ModItemsElement;
const tempCanvas = new Canvas();
const tempCTX = tempCanvas.getContext("2d");
const enabledMods = ["Block", "Pickaxe", "Axe", "Sword", "Recipe", "Other", "Object 1x1", "Object 2x2", "JavaScript", "NPC Drop"];
const ModItems = [];
for (var i = 0; i < 300; i++) ModItems[i] = ["Grass", "Dirt", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Stone", "Stone", "Iron Pickaxe", "Iron Axe", "Wood", "Wood", "Sand", "Sand", "Iron Ore", "Iron Ore", "Bed", "Acorn", "Sapling", "Door Top", "Door Bottom", "Wooden Door", "Platform", "Work Bench", "Furnace", "Iron Bar", "Iron Bar", "Stone Brick", "Stone Brick", "Bed", "Bed", "Chair", "Chair", "Torch", "Torch (left)", "Torch (right)", "Sand Brick", "Sand Brick", "Chandelier", "Bench", "Dresser", "Table", "Barrel", "Chest", "Sign", "Anvil", "Sawmill", "Chain", "Grandfather Clock", "Grandfather Clock", "Grandfather Clock", "Cloud", "Cloud", "Glass", "Glass", "Ice Block", "Ice Block", "Clay", "Clay", "Brick", "Brick", "Gold Ore", "Gold Ore", "Gold Bar", "Gold Brick", "Gold Brick", "Silver Ore", "Silver Ore", "Silver Bar", "Silver Brick", "Silver Brick", "Seed", "Plant", "Plant", "Plant", "Plant", "Plant", "Plant", "Plant", "Plant", "Mushroom", "Plant", "Fence", "Iron Fence", "Gold Chandelier", "Candelabra", "Gold Chest", "Bath Tub", "Trash Can", "Toilet", "Cooking Pot", "Bath Tub", "Bath Tub", "Builder Potion", "Mining Potion", "Swiftness Potion", "Diamond Ore", "Diamond", "Diamond Slab", "Diamond Slab", "Stone Slab", "Sand Slab", "Pot Plant", "Bookcase", "Bookcase", "Bookcase", "Bookcase", "Bookcase", "Sky Chest", "Heavy Work Bench", "Bug Net", "Bunny", "Beam", "Beam", "Sofa", "Sofa", "Sofa", "Piano", "Piano", "Piano", "Chain", "Frog", "Slime", "Wooden Sword", "Iron Sword", "Gel", "Platinum Ore", "Platinum Ore", "Platinum Bar", "Gold Pickaxe", "Gold Axe", "Gold Sword", "Platinum Pickaxe", "Platinum Axe", "Platinum Sword", "Demon Eye", "Lens", "Zombie", "Easter Egg", "Chocolate", "Chocolate", "Land Claim Sign", "Crab", "Molten Pickaxe", "Blue Phaseblade", "Diamond Staff", "Water", "Water 15/16", "Water 14/16", "Water 13/16", "Water 12/16", "Water 11/16", "Water 10/16", "Water 9/16", "Water 8/16", "Water 7/16", "Water 6/16", "Water 5/16", "Water 4/16", "Water 3/16", "Water 2/16", "Water 1/16", "Goldfish", "Jellyfish", "Lava", "Lava 15/16", "Lava 14/16", "Lava 13/16", "Lava 12/16", "Lava 11/16", "Lava 10/16", "Lava 9/16", "Lava 8/16", "Lava 7/16", "Lava 6/16", "Lava 5/16", "Lava 4/16", "Lava 3/16", "Lava 2/16", "Lava 1/16", "Obsidian", "Lesser Healing Potion", "Healing Potion", "Greater Healing Potion", "Featherfall Potion", "Spelunker Potion", "Obsidian Skin Potion", "Gills Potion", "Purple Slime", "Bunny Slime", "Dungeon Slime", "Lava Slime", "Pyranha", "Shark", "Shark Fin", "Hook", "Zombie Arm", "Copper Pickaxe", "Copper Sword", "Copper Axe", "Bucket", "Water Bucket", "Lava Bucket", "Hellstone", "Hellstone", "Hellstone Bar", "Vine", "Hellforge", "Bat", "Lava Bat", "Water Chest", "Obsidian Chest", "Copper Coin", "Silver Coin", "Gold Coin", "Topaz Stone", "Topaz", "Ruby Stone", "Ruby", "Emerald Stone", "Emerald", "Sapphire Stone", "Sapphire", "Amethyst Stone", "Amethyst", "Iron Door", "Glass Door", "Obsidian Door", "Iron Door Top", "Iron Door Bottom", "Glass Door Top", "Glass Door Bottom", "Obsidian Door Top", "Obsidian Door Bottom", "Glass Kiln", "Butterfly", "Glass Table", "Glass Lantern", "Glass Chandelier", "Pot", "Wooden Sink", "Glass Platform", "Squirrel", "Mouse", "Firefly", "Fiery Greatsword", "Glass Bed", "Glass Bed L", "Glass Bed R", "Obsidian Bed", "Obsidian Bed L", "Obsidian Bed R", "Gold Bed", "Gold Bed L", "Gold Bed R", "Mushroom Bed", "Mushroom Bed L", "Mushroom Bed R", "Wooden Crate", "Iron Crate", "Mushroom Block", "Mushroom Block", "Table L", "Table R", "Iron Table", "Iron Table L", "Iron Table R", "Obsidian Table", "Obsidian Table L", "Obsidian Table R", "Mushroom Table", "Mushroom Table L", "Mushroom Table R", "Glass Table L", "Glass Table R", "Blue Dungeon Vase", "Green Dungeon Vase", "Pink Dungeon Vase", "Obsidian Vase", "Suspicious Looking Eye", "Demon Altar", "Demonite Ore", "Demonite Ore", "Demonite Bar", "Light's Bane", "Eye of Cthulhu Mask", "Santa Mask"][i];
// const TileData = vm.runtime.targets[0].lookupVariableByNameAndType("_TileData", "list").value;
// const NPCs = [];
// for (var i = 0; i < TileData.length; i+=8) {
//     if (parseInt(TileData[i+3]) == 100 || parseInt(TileData[i+3]) == 2) {
//         NPCs[parseInt(TileData[i+5])-1] = TileData[i+1];
//     }
// }
// console.log(NPCs);
const NPCs = [
    "Bunny",
    "Frog",
    "Slime",
    "Slime (Angry)",
    "Demon Eye",
    "Zombie",
    "Crab",
    "Goldfish",
    "Jellyfish",
    "Purple Slime",
    "Purple Slime (Angry)",
    "Bunny Slime",
    "Bunny Slime (Angry)",
    "Dungeon Slime",
    "Lava Slime",
    "Pyranha",
    "Shark",
    "Bat",
    "Lava Bat",
    "Butterfly",
    "Squirrel",
    "Mouse",
    "Firefly",
    "Eye of Cthulhu"
];
//--------------------
//Images
//--------------------
const assets = {
    block: "https://cdn.assets.scratch.mit.edu/internalapi/asset/999a77dc64a8c4c37e29d2d26ad45737.png/get/",
    pickaxe: "https://cdn.assets.scratch.mit.edu/internalapi/asset/5ccbea0f874664d49b44b67cb0897cd5.png/get/",
    mask: "https://cdn.assets.scratch.mit.edu/internalapi/asset/06a5d27fddeeeeafb6aa3b532422250a.png/get/",
    door: "https://cdn.assets.scratch.mit.edu/internalapi/asset/2be54e296826faeee00c28af84d6c27e.png/get/",
    potion: "https://cdn.assets.scratch.mit.edu/internalapi/asset/2d1f80466ea0288a00e2e01df19ed01b.png/get/",
    torch: "https://cdn.assets.scratch.mit.edu/internalapi/asset/9d710f2e694d204fdf35678850653beb.png/get/",
    object1x1: "https://cdn.assets.scratch.mit.edu/internalapi/asset/6d2752f72c580f3ae8f1f3aa088acc24.png/get/",
    object2x1: "https://cdn.assets.scratch.mit.edu/internalapi/asset/f2c8be1e6819d92f2399347a7ac8160c.png/get/",
    object1x2: "https://cdn.assets.scratch.mit.edu/internalapi/asset/27b687c370854241c30b5cc6021e64a1.png/get/",
    object2x2: "https://cdn.assets.scratch.mit.edu/internalapi/asset/3389c5990450aa8aeef2202c15a198ac.png/get/",
    bookcase1: "https://cdn.assets.scratch.mit.edu/internalapi/asset/bdcdf283287b49cdad21bbacb55f49b4.png/get/",
    bookcase2: "https://cdn.assets.scratch.mit.edu/internalapi/asset/f7da4112f2c62f8175638653da1b2f80.png/get/",
    bookcase3: "https://cdn.assets.scratch.mit.edu/internalapi/asset/660a62a19b7a3e0b9cf803ce5e6b572c.png/get/",
    bookcase4: "https://cdn.assets.scratch.mit.edu/internalapi/asset/2482df961e37cf2baaa59760554134b6.png/get/",
    bookcase_item: "https://cdn.assets.scratch.mit.edu/internalapi/asset/ff334c9b8c12a766d9e04d67b6d93a32.png/get/",
    npc: "https://cdn.assets.scratch.mit.edu/internalapi/asset/2f3c462b5e8ce9c4eecba58fd65c3483.png/get/",
    craftingRecipe: "https://cdn.assets.scratch.mit.edu/internalapi/asset/1c7a1d7d38f1d9d7b4d3227f197beb40.png/get/",
    other: "https://cdn.assets.scratch.mit.edu/internalapi/asset/d196bfd105485f57a3ff48b795bef642.png/get/",
    javaScript: "https://cdn.assets.scratch.mit.edu/internalapi/asset/0cded3a3276425911d55a2552bf361bf.png/get/",
    paintBrush: "https://cdn.assets.scratch.mit.edu/internalapi/asset/0acaede5cd13b6049a41e2f22c5dbb38.svg/get/",
    dirt: "https://cdn.assets.scratch.mit.edu/internalapi/asset/85c0fe775a65f8d4272fc329073dc613.png/get/",
    trash: "https://cdn.assets.scratch.mit.edu/internalapi/asset/710a6ef1048f968401b16a6b9eb07773.png/get/",
    axe: "https://cdn.assets.scratch.mit.edu/internalapi/asset/8a3de2f9955f6a17be0d6fdcd482e63d.png/get/",
    sword: "https://cdn.assets.scratch.mit.edu/internalapi/asset/e571bffc4d611cd13ddccd713cf81ff7.png/get/",
    staff: "https://cdn.assets.scratch.mit.edu/internalapi/asset/68ca074dbb53f6a8bf7621ebc1c91bee.svg/get/",
    beam: "https://cdn.assets.scratch.mit.edu/internalapi/asset/c01129a7283a29e7631d5654c8f0d653.png/get/",
    trashBtn: "https://cdn.assets.scratch.mit.edu/internalapi/asset/710a6ef1048f968401b16a6b9eb07773.png/get/",
    zombieArm: "https://cdn.assets.scratch.mit.edu/internalapi/asset/b6b22cb0ab0f8c52bdd625a7c85c0520.png/get/",
};
Object.keys(assets).forEach(async (key) => assets[key] = await ReadAsDataURL(await (await fetch(assets[key])).blob()));

//--------------------
//Project Data
//--------------------
const ProjectData = {};
ProjectData.blankCostume = {
    "ID": md5('<svg version="1.1" width="2" height="2" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'),
    "type": "svg",
    "data": '<svg version="1.1" width="2" height="2" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'
}
ProjectData.costumes = {};
ProjectData.costumes[ProjectData.blankCostume.ID] = ProjectData.blankCostume;
ProjectData.json = {
    "targets": [
        {
            "isStage": true,
            "name": "Stage",
            "variables": {},
            "lists": {},
            "broadcasts": {},
            "blocks": {},
            "comments": {},
            "currentCostume": 0,
            "costumes": [
                {
                    "assetId": ProjectData.blankCostume.ID,
                    "bitmapResolution": 1,
                    "dataFormat": ProjectData.blankCostume.type,
                    "md5ext": `${ProjectData.blankCostume.ID}.${ProjectData.blankCostume.type}`,
                    "name": "",
                    "rotationCenterX": 0,
                    "rotationCenterY": 0
                }
            ],
            "sounds": [],
            "volume": 100,
            "layerOrder": 0,
            "tempo": 60,
            "videoTransparency": 50,
            "videoState": "on",
            "textToSpeechLanguage": null
        }
    ],
    "monitors": [],
    "extensions": [],
    "meta": {
        "semver": "3.0.0",
        "vm": "0.2.0",
        "agent": "Scratcharia Mod Loader | Mod Creator"
    }
}
Object.defineProperty(ProjectData, "Sprite", {
    get: () => {
        return {
            "isStage": false,
            "name": "",
            "variables": {},
            "lists": {},
            "broadcasts": {},
            "blocks": {},
            "comments": {},
            "currentCostume": 0,
            "costumes": [
                {
                    "assetId": ProjectData.blankCostume.ID,
                    "bitmapResolution": 1,
                    "dataFormat": ProjectData.blankCostume.type,
                    "md5ext": `${ProjectData.blankCostume.ID}.${ProjectData.blankCostume.type}`,
                    "name": "",
                    "rotationCenterX": 0,
                    "rotationCenterY": 0
                }
            ],
            "sounds": [],
            "visible": false,
            "volume": 100,
            "layerOrder": 1,
            "tempo": 60,
            "videoTransparency": 50,
            "videoState": "on",
            "textToSpeechLanguage": null
        }
    },
});


//--------------------
//Unsaved Changes
//--------------------
if (false) window.onbeforeunload = function (e) {
    if (UnsavedChanges) {
        (e || window.event).returnValue = true;
        return true;
    }
}

//--------------------
//Create New Mod
//--------------------
document.getElementById("CreateNewMod").onclick = function () {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Create New Mod" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "The Name of Your New Mod", "Name", "My New Mod");
    //const author = new StringInput("Author", "Your Name", "Username");
    const description = new TextboxInput("Description", "Short Summary of Your New Mod");
    const createNewMod = new Button({ "innerText": "Create New Mod" });
    Editor.appendChild(name);
    //Editor.appendChild(author);
    Editor.appendChild(description);
    createNewMod.onclick = () => {
        ProjectData.json.targets[0].variables.manifest = [
            "mainfest.json",
            JSON.stringify({
                "name": name.value,
                //"author": author.value,
                "description": description.value
            })
        ];
        SetupModEditor(name.value, description.value);
        Editor.hidden = true;
        Mod.hidden = false;
    }
    Editor.appendChild(createNewMod);
    document.getElementById("Menu").hidden = true;
    Editor.hidden = false;
}

//--------------------
//Load Mod
//--------------------
document.getElementById("EditMod").onclick = function () {
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

//--------------------
//Mod Menu
//--------------------
function SetupModEditor(name) {
    Mod.innerHTML = "";
    Mod.appendChild(new Text({ "innerText": name }, { "color": "#fff", "font-size": "3em" }));
    Mod.appendChild(new Br);
    const editManifest = new Button({ "innerText": "Edit Manifest Data" });
    editManifest.onclick = EditManifest;
    Mod.appendChild(editManifest);
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

//--------------------
//Edit Manifest
//--------------------
function EditManifest() {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Edit Manifest" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const manifestData = JSON.parse(ProjectData.json.targets[0].variables.manifest[1]);
    const name = new StringInput("Name", "The Name of Your New Mod", "Name", manifestData.name);
    const author = new StringInput("Author", "Your Name", "Username", manifestData.author);
    const description = new TextboxInput("Description", "Short Summary of Your New Mod", manifestData.description);
    const saveChanges = new Button({ "innerText": "Save Changes" });
    Editor.appendChild(name);
    Editor.appendChild(author);
    Editor.appendChild(description);
    saveChanges.onclick = () => {
        ProjectData.json.targets[0].variables.manifest = [
            "mainfest.json",
            JSON.stringify({
                "name": name.value,
                "author": author.value,
                "description": description.value
            })
        ];
        Mod.children[0].innerText = name.value;
        Editor.hidden = true;
        Mod.hidden = false;
    }
    Editor.appendChild(saveChanges);
    Mod.hidden = true;
    Editor.hidden = false;
}

//--------------------
//Download Mod
//--------------------
async function DownloadMod() {
    const sb3 = new JSZip();
    Object.values(ProjectData.costumes).forEach(data => sb3.file(`${data.ID}.${data.type}`, data.data));
    sb3.file("project.json", JSON.stringify(ProjectData.json));
    new A({
        "href": `data:application/zip;base64,${await sb3.generateAsync({ "type": "base64" })}`,
        "download": `${JSON.parse(ProjectData.json.targets[0].variables.manifest[1]).name}.sb3`
    }).click();
}

//--------------------
//Item
//--------------------
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
    Editor.appendChild(new ModSelect("Door", assets.door));
    Editor.appendChild(new ModSelect("Torch", assets.torch));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Object 1x1", assets.object1x1));
    Editor.appendChild(new ModSelect("Object 2x1", assets.object2x1));
    Editor.appendChild(new ModSelect("Object 1x2", assets.object1x2));
    Editor.appendChild(new ModSelect("Object 2x2", assets.object2x2));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Pickaxe", assets.pickaxe));
    Editor.appendChild(new ModSelect("Axe", assets.axe));
    Editor.appendChild(new ModSelect("Sword", assets.sword));
    Editor.appendChild(new ModSelect("Staff", assets.staff));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Mask", assets.mask));
    Editor.appendChild(new ModSelect("Recipe", assets.craftingRecipe));
    Editor.appendChild(new ModSelect("NPC Drop", assets.zombieArm));
    Editor.appendChild(new ModSelect("Other", assets.other));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Intermediate" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new ModSelect("Potion", assets.potion));
    Editor.appendChild(new ModSelect("NPC", assets.npc));
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
        }
    }
}

//--------------------
//Select Mod
//--------------------
function SelectMod(type, ...args) {
    if (type == "JavaScript") {
        SelectJavaScriptMod(...args);
    } else if (type == "Block") {
        SelectBlockMod(...args);
    } else if (type == "Pickaxe") {
        SelectPickaxeMod(...args);
    } else if (type == "Axe") {
        SelectAxeMod(...args);
    } else if (type == "Sword") {
        SelectSwordMod(...args);
    } else if (type == "Recipe") {
        SelectRecipeMod(...args);
    } else if (type == "Other") {
        SelectOtherMod(...args);
    } else if (type == "Object 1x1") {
        SelectObject1x1Mod(...args);
    } else if (type == "Object 2x2") {
        SelectObject2x2Mod(...args);
    } else if (type == "NPC Drop") {
        SelectNPCDropMod(...args);
    } 
}

function SelectJavaScriptMod(ID, Name, Contents) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add JavaScript" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Script's Name", "Script Name", Name ? Name : "My New Script");
    const script = new TextboxInput("Script", "Script's Contents", "", Contents ? Contents : "");
    Editor.appendChild(name);
    Editor.appendChild(script);
    Editor.appendChild(new Br);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    Editor.appendChild(cancel);
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        const costume = await new Costume(assets.javaScript);
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "JavaScript"];
        Sprite.variables.script = ["Script", script.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Mod API" }, { "color": "#fff", "font-size": "2em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.targets" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.getSpriteTargetByName(\"Name\")" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.getTargetForStage()" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.greenFlag()" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.stop()" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
}
function SelectBlockMod(ID, Name, Material, DigSpeed, TopBlock, TopBlockImage, BottomBlock, BottomBlockImage) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Block" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const topBlock = new ImageEditor({
        name: "Top Block",
        rotationCenterX: TopBlock ? TopBlock.rotationCenterX : 0,
        rotationCenterY: TopBlock ? TopBlock.rotationCenterY : 32,
        imageFormat: TopBlock ? TopBlock.dataFormat : "png",
        image: TopBlockImage ? TopBlockImage : assets.block
    });
    const bottomBlock = new ImageEditor({
        name: "Bottom Block",
        rotationCenterX: BottomBlock ? BottomBlock.rotationCenterX : 0,
        rotationCenterY: BottomBlock ? BottomBlock.rotationCenterY : 32,
        imageFormat: BottomBlock ? BottomBlock.dataFormat : "png",
        image: BottomBlockImage ? BottomBlockImage : assets.dirt
    });
    const name = new StringInput("Name", "New Block's Name", "Name", Name ? Name : "My New Block");
    const material = new SelectInput("Material", "What The Block Is Made Out Of", [{ 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(topBlock.value.image, topBlock.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = topBlock.value.bitmapResolution;
        costume[1].rotationCenterX = topBlock.value.rotationCenterX;
        costume[1].rotationCenterY = topBlock.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(bottomBlock.value.image, bottomBlock.value.imageFormat);
        costume[1].name = `${name.value}2`;
        costume[1].bitmapResolution = bottomBlock.value.bitmapResolution;
        costume[1].rotationCenterX = bottomBlock.value.rotationCenterX;
        costume[1].rotationCenterY = bottomBlock.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Block"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Top Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(topBlock);
    Editor.appendChild(new Text({ "innerText": "Bottom Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(bottomBlock);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectPickaxeMod(ID, Name, DigSpeed, InventorySprite, InventorySpriteImage, UseSprite, UseSpriteImage) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Pickaxe" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Pickaxe's Name", "Name", Name ? Name : "My New Pickaxe");
    const inventorySprite = new ImageEditor({
        name: "Pickaxe",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 32,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "png",
        image: InventorySpriteImage ? InventorySpriteImage : assets.pickaxe
    });
    const useSprite = new ImageEditor({
        name: "Pickaxe (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 29,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSpriteImage ? UseSpriteImage : assets.pickaxe
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Pickaxe's Strength", "Dig Speed", DigSpeed ? DigSpeed : 5);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(inventorySprite.value.image, inventorySprite.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = inventorySprite.value.bitmapResolution;
        costume[1].rotationCenterX = inventorySprite.value.rotationCenterX;
        costume[1].rotationCenterY = inventorySprite.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(useSprite.value.image, useSprite.value.imageFormat);
        costume[1].name = `Use ${name.value}`;
        costume[1].bitmapResolution = useSprite.value.bitmapResolution;
        costume[1].rotationCenterX = useSprite.value.rotationCenterX;
        costume[1].rotationCenterY = useSprite.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new FlippedCostume(
            useSprite.value.image,
            useSprite.value.imageFormat,
            useSprite.value.bitmapResolution,
            useSprite.value.rotationCenterX,
            useSprite.value.rotationCenterY
        );
        costume[1].name = `Use ${name.value}2`;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Pickaxe"];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Inventory Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(inventorySprite);
    Editor.appendChild(new Text({ "innerText": "Use Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(useSprite);
    Editor.appendChild(name);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectAxeMod(ID, Name, DigSpeed, InventorySprite, InventorySpriteImage, UseSprite, UseSpriteImage) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Axe" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Axe's Name", "Name", Name ? Name : "My New Axe");
    const inventorySprite = new ImageEditor({
        name: "Axe",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 32,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "png",
        image: InventorySpriteImage ? InventorySpriteImage : assets.axe
    });
    const useSprite = new ImageEditor({
        name: "Axe (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 29,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSpriteImage ? UseSpriteImage : assets.axe
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Axe's Strength", "Dig Speed", DigSpeed ? DigSpeed : 5);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(inventorySprite.value.image, inventorySprite.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = inventorySprite.value.bitmapResolution;
        costume[1].rotationCenterX = inventorySprite.value.rotationCenterX;
        costume[1].rotationCenterY = inventorySprite.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(useSprite.value.image, useSprite.value.imageFormat);
        costume[1].name = `Use ${name.value}`;
        costume[1].bitmapResolution = useSprite.value.bitmapResolution;
        costume[1].rotationCenterX = useSprite.value.rotationCenterX;
        costume[1].rotationCenterY = useSprite.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new FlippedCostume(
            useSprite.value.image,
            useSprite.value.imageFormat,
            useSprite.value.bitmapResolution,
            useSprite.value.rotationCenterX,
            useSprite.value.rotationCenterY
        );
        costume[1].name = `Use ${name.value}2`;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Axe"];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Inventory Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(inventorySprite);
    Editor.appendChild(new Text({ "innerText": "Use Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(useSprite);
    Editor.appendChild(name);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectSwordMod(ID, Name, DigSpeed, InventorySprite, InventorySpriteImage, UseSprite, UseSpriteImage) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Sword" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Sword's Name", "Name", Name ? Name : "My New Sword");
    const inventorySprite = new ImageEditor({
        name: "Sword",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 32,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "png",
        image: InventorySpriteImage ? InventorySpriteImage : assets.sword
    });
    const useSprite = new ImageEditor({
        name: "Sword (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 29,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSpriteImage ? UseSpriteImage : assets.sword
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Sword's Strength", "Dig Speed", DigSpeed ? DigSpeed : 10);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(inventorySprite.value.image, inventorySprite.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = inventorySprite.value.bitmapResolution;
        costume[1].rotationCenterX = inventorySprite.value.rotationCenterX;
        costume[1].rotationCenterY = inventorySprite.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(useSprite.value.image, useSprite.value.imageFormat);
        costume[1].name = `Use ${name.value}`;
        costume[1].bitmapResolution = useSprite.value.bitmapResolution;
        costume[1].rotationCenterX = useSprite.value.rotationCenterX;
        costume[1].rotationCenterY = useSprite.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new FlippedCostume(
            useSprite.value.image,
            useSprite.value.imageFormat,
            useSprite.value.bitmapResolution,
            useSprite.value.rotationCenterX,
            useSprite.value.rotationCenterY
        );
        costume[1].name = `Use ${name.value}2`;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Sword"];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Inventory Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(inventorySprite);
    Editor.appendChild(new Text({ "innerText": "Use Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(useSprite);
    Editor.appendChild(name);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectRecipeMod(ID, Item, Amount, UseStation, CraftingStation, Items, Amounts) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Recipe" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const craftedItem = new SelectModItemInput(Item);
    const amountCrafted = new NumberInput("Amount Crafted", "How Much It Should Craft", "Amount Crafted", Amount ? Amount : 1);
    const useStation = new Input({ "type": "checkbox", "checked": UseStation != false });
    useStation.oninput = e => craftingStation.hidden = !e.target.checked;
    const craftingStation = new SelectModItemInput(CraftingStation);
    const recipeIngredients = new RecipeIngredientsList(Items ? (() => {
        var x = {};
        for (var i = 0; i < Items.length; i++) x[Items[i]] = Amounts[i];
        return x;
    })() : null);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = craftedItem.name;
        const costume = await new Costume(assets.craftingRecipe);
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        console.log(craftedItem.value);
        Sprite.variables.type = ["Type", "Recipe"];
        Sprite.variables.item = ["Item Crafted", craftedItem.value];
        Sprite.variables.amount = ["Amount Crafted", amountCrafted.value];
        Sprite.variables.useStation = ["Require Crafting Station?", useStation.checked];
        Sprite.variables.station = ["Crafting Station", craftingStation.value];
        Sprite.lists.items = ["Ingredients", Object.keys(recipeIngredients.value)];
        Sprite.lists.amounts = ["Amounts", Object.values(recipeIngredients.value)];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "The Item Being Crafted" }, { "color": "#bfbfbf", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(craftedItem);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Crafting Station" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Where You Can Craft The Item" }, { "color": "#bfbfbf", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(useStation);
    Editor.appendChild(new Text({ "innerText": "Crafting Station Required" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(craftingStation);
    Editor.appendChild(new Br);
    Editor.appendChild(amountCrafted);
    Editor.appendChild(recipeIngredients);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectOtherMod(ID, Name, Image, img) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Item" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 22,
        imageFormat: Image ? Image.dataFormat : "png",
        image: img ? img : assets.other
    });
    const name = new StringInput("Name", "New Item's Name", "Name", Name ? Name : "My New Item");
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Other"];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(image);
    Editor.appendChild(name);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectObject1x1Mod(ID, Name, Image, img, Material, DigSpeed) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Object 1x1" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : 0,
        rotationCenterY: Image ? Image.rotationCenterY : 28,
        imageFormat: Image ? Image.dataFormat : "png",
        image: img ? img : assets.object1x1
    });
    const name = new StringInput("Name", "New Object's Name", "Name", Name ? Name : "My New Object");
    const material = new SelectInput("Material", "What The Object Is Made Out Of", [{ 11: "Veg", 12: "Wood", 13: "Chest", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Object 1x1"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(image);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectObject2x2Mod(ID, Name, Image, img, Material, DigSpeed, TopLeft, TopLeftImg, BottomLeft, BottomLeftImg, TopRight, TopRightImg, BottomRight, BottomRightImg) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Object 2x2" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 30,
        imageFormat: Image ? Image.dataFormat : "png",
        image: img ? img : assets.bookcase_item
    });
    const topLeft = new ImageEditor({
        name: "Top Left",
        rotationCenterX: TopLeft ? TopLeft.rotationCenterX : -8,
        rotationCenterY: TopLeft ? TopLeft.rotationCenterY : 32,
        imageFormat: TopLeft ? TopLeft.dataFormat : "png",
        image: TopLeftImg ? TopLeftImg : assets.bookcase1
    });
    const bottomLeft = new ImageEditor({
        name: "Bottom Left",
        rotationCenterX: BottomLeft ? BottomLeft.rotationCenterX : -8,
        rotationCenterY: BottomLeft ? BottomLeft.rotationCenterY : 32,
        imageFormat: BottomLeft ? BottomLeft.dataFormat : "png",
        image: BottomLeftImg ? BottomLeftImg : assets.bookcase2
    });
    const topRight = new ImageEditor({
        name: "Top Right",
        rotationCenterX: TopRight ? TopRight.rotationCenterX : 0,
        rotationCenterY: TopRight ? TopRight.rotationCenterY : 32,
        imageFormat: TopRight ? TopRight.dataFormat : "png",
        image: TopRightImg ? TopRightImg : assets.bookcase3
    });
    const bottomRight = new ImageEditor({
        name: "Bottom Right",
        rotationCenterX: BottomRight ? BottomRight.rotationCenterX : 0,
        rotationCenterY: BottomRight ? BottomRight.rotationCenterY : 32,
        imageFormat: BottomRight ? BottomRight.dataFormat : "png",
        image: BottomRightImg ? BottomRightImg : assets.bookcase4
    });
    topLeft.style.display = "inline-block";
    topRight.style.display = "inline-block";
    bottomLeft.style.display = "inline-block";
    bottomRight.style.display = "inline-block";
    const name = new StringInput("Name", "New Object's Name", "Name", Name ? Name : "My New Object");
    const material = new SelectInput("Material", "What The Object Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(topLeft.value.image, topLeft.value.imageFormat);
        costume[1].name = name.value + "-TopLeft";
        costume[1].bitmapResolution = topLeft.value.bitmapResolution;
        costume[1].rotationCenterX = topLeft.value.rotationCenterX;
        costume[1].rotationCenterY = topLeft.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(bottomLeft.value.image, bottomLeft.value.imageFormat);
        costume[1].name = name.value + "-BottomLeft";
        costume[1].bitmapResolution = bottomLeft.value.bitmapResolution;
        costume[1].rotationCenterX = bottomLeft.value.rotationCenterX;
        costume[1].rotationCenterY = bottomLeft.value.rotationCenterY;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(topRight.value.image, topRight.value.imageFormat);
        costume[1].name = name.value + "-TopRight";
        costume[1].bitmapResolution = topRight.value.bitmapResolution;
        costume[1].rotationCenterX = topRight.value.rotationCenterX;
        costume[1].rotationCenterY = topRight.value.rotationCenterY;
        Sprite.costumes[3] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(bottomRight.value.image, bottomRight.value.imageFormat);
        costume[1].name = name.value + "-BottomRight";
        costume[1].bitmapResolution = bottomRight.value.bitmapResolution;
        costume[1].rotationCenterX = bottomRight.value.rotationCenterX;
        costume[1].rotationCenterY = bottomRight.value.rotationCenterY;
        Sprite.costumes[4] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Object 2x2"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(image);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Tiles" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(topLeft);
    Editor.appendChild(topRight);
    Editor.appendChild(new Br);
    Editor.appendChild(bottomLeft);
    Editor.appendChild(bottomRight);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectNPCDropMod(ID, Item, Min, Max, Chance, NPC) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add NPC Drop" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const item = new SelectModItemInput(Item);
    const min = new NumberInput("Minimum Dropped", "How Little it Can Drop", "Min", Min ? Min : 1);
    const max = new NumberInput("Maximum Dropped", "How Much it Can Drop", "Max", Max ? Max : 1);
    const chance = new NumberInput("Drop Chance", "0 = 0%, 0.5 = 50%, 1 = 100%", "Chance", Chance ? Chance : 1);
    const npc = new SelectModNPCInput(NPC);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        const Sprite = ProjectData.Sprite;
        Sprite.name = item.name + " from " + npc.name;
        const costume = await new Costume(assets.zombieArm);
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "NPC Drop"];
        Sprite.variables.item = ["Item Dropped", item.value];
        Sprite.variables.min = ["Min", min.value];
        Sprite.variables.max = ["Max", max.value];
        Sprite.variables.chance = ["Chance", chance.value];
        Sprite.variables.npc = ["NPC", parseInt(npc.value) + 1];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "The Item Being Dropped" }, { "color": "#bfbfbf", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(item);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "NPC" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "The NPC That Drops the Item" }, { "color": "#bfbfbf", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(npc);
    Editor.appendChild(min);
    Editor.appendChild(max);
    Editor.appendChild(chance);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
//--------------------
//Costume Constructor
//--------------------
function Costume(Link, type = "png") {
    return new Promise(async (resolve, reject) => {
        let Text = await (await fetch(Link)).text();
        let ArrayBuffer = await (await fetch(Link)).arrayBuffer();
        resolve([{
            ID: md5(Text),
            type: type,
            data: ArrayBuffer,
            dataURL: Link
        }, {
            "assetId": md5(Text),
            "bitmapResolution": 1,
            "dataFormat": type,
            "md5ext": `${md5(Text)}.${type}`,
            "name": "",
            "rotationCenterX": 0,
            "rotationCenterY": 0
        }]);
    });
}
function FlippedCostume(url, type, bitmapResolution, rotationCenterX, rotationCenterY) {
    return new Promise(async (resolve) => {
        let img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise(resolve => {
            img.src = url;
            img.onload = resolve;
        });
        if (type == "svg") {
            let text = await (await fetch(url)).text();
            let svg = (new DOMParser()).parseFromString(text, "image/svg+xml");
            svg.documentElement.children[0].setAttribute("transform", `scale(-1, 1) ${svg.documentElement.children[0].getAttribute("transform")} translate(${-img.width}, 0)`);
            let costume = await new Costume(`data:image/svg+xml,${encodeURIComponent(svg.documentElement.outerHTML)}`, type);
            costume[1].bitmapResolution = bitmapResolution;
            costume[1].rotationCenterX = -(rotationCenterX - img.width);
            costume[1].rotationCenterY = rotationCenterY;
            resolve(costume);
        } else {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, -img.width, img.height);
            let costume = await new Costume(canvas.toDataURL());
            costume[1].bitmapResolution = bitmapResolution;
            costume[1].rotationCenterX = -(rotationCenterX - img.width);
            costume[1].rotationCenterY = rotationCenterY;
            resolve(costume);
        }
    });
}


//--------------------
//Element Constructors
//--------------------
function Br() {
    return document.createElement("br");
}
function Input(...args) {
    const input = document.createElement("input");
    Object.assign(input, args[0]);
    Object.assign(input.style, args[1]);
    return input;
}
function Textarea(...args) {
    const textarea = document.createElement("textarea");
    Object.assign(textarea, args[0]);
    Object.assign(textarea.style, args[1]);
    return textarea;
}
function Button(...args) {
    const button = document.createElement("button");
    Object.assign(button, args[0]);
    Object.assign(button.style, args[1]);
    button.addEventListener("mouseover", ButtonAnimation); //Custom Animation
    return button;
}
function A(...args) {
    const a = document.createElement("a");
    Object.assign(a, args[0]);
    Object.assign(a.style, args[1]);
    return a;
}
function Div(...args) {
    const div = document.createElement("div");
    Object.assign(div, args[0]);
    Object.assign(div.style, args[1]);
    return div;
}
function Img(...args) {
    const img = new Image;
    Object.assign(img, args[0]);
    Object.assign(img.style, args[1]);
    return img;
}
function Canvas(...args) {
    const canvas = document.createElement("canvas");
    Object.assign(canvas, args[0]);
    Object.assign(canvas.style, args[1]);
    return canvas;
}
function Select(...args) {
    const select = document.createElement("select");
    Object.keys(args[0]).forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.innerText = args[0][value];
        select.appendChild(option);
    });
    Object.assign(select, args[1]);
    Object.assign(select.style, args[2]);
    return select;
}

//--------------------
//Custom Elements
//--------------------
function Text(...args) {
    const text = document.createElement("text");
    Object.assign(text, args[0]);
    Object.assign(text.style, args[1]);
    return text;
}
function StringInput(...args) {
    const stringInput = document.createElement("StringInput");
    const name = new Text({ "innerText": args[0] }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": args[1] }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const input = new Input({ "type": "text", "placeholder": args[2], "value": args[3] == null ? "" : args[3] });
    input.addEventListener("input", () => UnsavedChanges = true);
    Object.defineProperty(stringInput, 'name', {
        get: () => { return name.innerText },
        set: (x) => name.innerText = x
    });
    Object.defineProperty(stringInput, 'description', {
        get: () => { return description.innerText },
        set: (x) => description.innerText = x
    });
    Object.defineProperty(stringInput, 'value', {
        get: () => { return input.value },
        set: (x) => input.value = x
    });
    stringInput.appendChild(name);
    stringInput.appendChild(new Br);
    stringInput.appendChild(description);
    stringInput.appendChild(new Br);
    stringInput.appendChild(input);
    return stringInput;
}
function TextboxInput(...args) {
    const textboxInput = document.createElement("TextboxInput");
    const name = new Text({ "innerText": args[0] }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": args[1] }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const textarea = new Textarea({ "value": args[2] == null ? "" : args[2] });
    textarea.addEventListener("input", () => UnsavedChanges = true);
    Object.defineProperty(textboxInput, 'name', {
        get: () => { return name.innerText },
        set: (x) => name.innerText = x
    });
    Object.defineProperty(textboxInput, 'description', {
        get: () => { return description.innerText },
        set: (x) => description.innerText = x
    });
    Object.defineProperty(textboxInput, 'value', {
        get: () => { return textarea.value },
        set: (x) => textarea.value = x
    });
    textboxInput.appendChild(name);
    textboxInput.appendChild(new Br);
    textboxInput.appendChild(description);
    textboxInput.appendChild(new Br);
    textboxInput.appendChild(textarea);
    return textboxInput;
}
function ModSelect(...args) {
    const modSelect = document.createElement("ModSelect");
    if (enabledMods.indexOf(args[0]) == -1) modSelect.setAttribute("disabled", "");
    const button = new Button({}, { "background-color": "#00000080", "width": "100px", "height": "68px" });
    const img = new Img({ "src": args[1] }, { "width": "50px", "height": "50px", "object-fit": "contain" });
    if (args[2]) img.style.imageRendering = "auto";
    const name = new Text({ "innerText": args[0] }, { "color": "#fff", "font-size": "0.75em" });
    Object.defineProperty(modSelect, "img", {
        get: () => { return img.src },
        set: (x) => img.src = x
    });
    Object.defineProperty(modSelect, "name", {
        get: () => { return name.innerText },
        set: (x) => name.innerText = x
    });
    modSelect.onclick = e => {
        var target = e.target;
        while (target && target.tagName != "MODSELECT") target = target.parentElement;
        console.log(target);
        if (target.tagName == "MODSELECT") SelectMod(target.name);
    }
    button.appendChild(img);
    button.appendChild(new Br);
    button.appendChild(name);
    modSelect.appendChild(button);
    return modSelect;
}
function SelectInput(...args) {
    const selectInput = document.createElement("SelectInput");
    const name = new Text({ "innerText": args[0] }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": args[1] }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const select = new Select(...args[2]);
    Object.defineProperty(selectInput, "name", {
        get: () => { return name.innerText },
        set: (x) => name.innerText = x
    });
    Object.defineProperty(selectInput, "description", {
        get: () => { return description.innerText },
        set: (x) => description.innerText = x
    });
    Object.defineProperty(selectInput, "value", {
        get: () => { return select.value },
        set: (x) => select.value = x
    });
    selectInput.appendChild(name);
    selectInput.appendChild(new Br);
    selectInput.appendChild(description);
    selectInput.appendChild(new Br);
    selectInput.appendChild(select);
    return selectInput;
}
function NumberInput(...args) {
    const numberInput = document.createElement("NumberInput");
    const name = new Text({ "innerText": args[0] }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": args[1] }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const input = new Input({ "type": "number", "placeholder": args[2], "value": args[3] == null ? "" : args[3] });
    input.addEventListener("input", () => UnsavedChanges = true);
    Object.defineProperty(numberInput, "name", {
        get: () => { return name.innerText },
        set: (x) => name.innerText = x
    });
    Object.defineProperty(numberInput, "description", {
        get: () => { return description.innerText },
        set: (x) => description.innerText = x
    });
    Object.defineProperty(numberInput, "value", {
        get: () => { return input.value },
        set: (x) => input.value = x
    });
    numberInput.appendChild(name);
    numberInput.appendChild(new Br);
    numberInput.appendChild(description);
    numberInput.appendChild(new Br);
    numberInput.appendChild(input);
    return numberInput;
}
function ModItem(...args) {
    const modItem = document.createElement("ModItem");
    const button = new Button({}, { "width": "fit-content", "height": "fit-content" });
    const img = new Img({ "src": args[0] }, { "width": "50px", "height": "50px", "object-fit": "contain" });
    const name = new Text({ "innerText": args[1] }, { "color": "#fff", "font-size": "0.75em" });
    const type = new Text({ "innerText": args[2] }, { "color": "#fff", "font-size": "0.5em" });
    const trash = new Img({ src: assets.trash, className: "trash" }, {});
    button.onclick = () => {
        let target = ProjectData.json.targets[args[3]];
        let type = target.variables.type[1];
        if (type == "JavaScript") SelectMod(type, args[3], target.name, target.variables.script[1]);
        else if (type == "Block") SelectMod(type, args[3], target.name, target.variables.material[1], target.variables.digSpeed[1], target.costumes[0], ProjectData.costumes[target.costumes[0].assetId].dataURL, target.costumes[1], ProjectData.costumes[target.costumes[1].assetId].dataURL);
        else if (type == "Pickaxe" || type == "Axe" || type == "Sword") SelectMod(type, args[3], target.name, target.variables.digSpeed[1], target.costumes[0], ProjectData.costumes[target.costumes[0].assetId].dataURL, target.costumes[1], ProjectData.costumes[target.costumes[1].assetId].dataURL);
        else if (type == "Recipe") SelectMod(type, args[3], target.variables.item[1], target.variables.amount[1], target.variables.useStation[1], target.variables.station[1], target.lists.items[1], target.lists.amounts[1]);
        else if (type == "Other") SelectMod(type, args[3], target.name, target.costumes[0], ProjectData.costumes[target.costumes[0].assetId].dataURL);
        else if (type == "Object 1x1") SelectMod(type, args[3], target.name, target.costumes[0], ProjectData.costumes[target.costumes[0].assetId].dataURL, target.variables.material[1], target.variables.digSpeed[1]);
        else if (type == "Object 2x2") SelectMod(type, args[3], target.name, target.costumes[0], ProjectData.costumes[target.costumes[0].assetId].dataURL, target.variables.material[1], target.variables.digSpeed[1], target.costumes[1], ProjectData.costumes[target.costumes[1].assetId].dataURL, target.costumes[2], ProjectData.costumes[target.costumes[2].assetId].dataURL, target.costumes[3], ProjectData.costumes[target.costumes[3].assetId].dataURL, target.costumes[4], ProjectData.costumes[target.costumes[4].assetId].dataURL);
        else if (type == "NPC Drop") SelectMod(type, args[3], target.variables.item[1], target.variables.min[1], target.variables.max[1], target.variables.chance[1], target.variables.npc[1]);
        Mod.hidden = true;
        Editor.hidden = false;
    }
    trash.onclick = () => {
        if (confirm(`Delete ${args[1]}?`)) {
            ProjectData.json.targets.splice(args[3]);
            AddItemElements();
        }
    }
    modItem.appendChild(button);
    button.appendChild(img);
    button.appendChild(new Br);
    button.appendChild(name);
    button.appendChild(new Br);
    button.appendChild(type);
    modItem.appendChild(trash);
    return modItem;
}
function SelectModItemInput(value, ...args) {
    const selectModItemInput = document.createElement("SelectModItemInput");
    const addedItems = [];
    for (var i = 1; i < ProjectData.json.targets.length; i++) {
        if (ProjectData.json.targets[i].variables.type[1] != "Recipe" && ProjectData.json.targets[i].variables.type[1] != "NPC Drop") {
            addedItems.push(ProjectData.json.targets[i].name);
        }
    }
    const select = new Select([...ModItems, ...addedItems], ...args);
    if (value) select.value = isNaN(value) ? [...ModItems, ...addedItems].indexOf(value) : value-1;
    Object.defineProperty(selectModItemInput, "name", {
        get: () => { return select.options[select.selectedIndex].innerText },
        set: (x) => select.options[select.selectedIndex].innerText = x
    });
    Object.defineProperty(selectModItemInput, "value", {
        get: () => {
            return parseInt(select.value) < 300 ? parseInt(select.value) + 1 : select.options[select.selectedIndex].innerText
        },
        set: (x) => {
            if (isNaN(x)) select.value = [...select.options].find(element => element.innerText == x).value;
            else select.value = x;
        }
    });
    selectModItemInput.appendChild(select);
    return selectModItemInput;
}
function SelectModNPCInput(value, ...args) {
    const selectModNPCInput = document.createElement("SelectModNPCInput");
    const addedNPCs = [];
    // for (var i = 1; i < ProjectData.json.targets.length; i++) {
    //     if (ProjectData.json.targets[i].variables.type[1] != "Recipe" && ProjectData.json.targets[i].variables.type[1] != "NPC Drop") {
    //         addedItems.push(ProjectData.json.targets[i].name);
    //     }
    // }
    const select = new Select([...NPCs, ...addedNPCs], ...args);
    if (value) select.value = isNaN(value) ? [...NPCs, ...addedNPCs].indexOf(value) : value-1;
    Object.defineProperty(selectModNPCInput, "name", {
        get: () => select.options[select.selectedIndex].innerText,
        set: (x) => select.options[select.selectedIndex].innerText = x
    });
    Object.defineProperty(selectModNPCInput, "value", {
        get: () => select.value,
        set: (x) => select.value = x
    });
    selectModNPCInput.appendChild(select);
    return selectModNPCInput;
}
function RecipeIngredientsList(value) {
    const recipeIngredientsList = document.createElement("RecipeIngredientsList");
    const name = new Text({ "innerText": "Ingredients" }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": "What You Need To Craft The Item" }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const ingredients = new Div({}, {"width": "fit-content", "margin": "0px auto", "max-height" : "125px", "overflow": "auto"});
    const add = new Button();
    add.innerText = "Add Ingredient";
    add.onclick = () => {
        ingredients.appendChild(new RecipeIngredient);
    }
    Object.defineProperty(recipeIngredientsList, "value", {
        get: () => {
            let data = {};
            [...ingredients.children].forEach(element => {
                data[element.item] = element.amount;
            });
            return data;
        },
        set: (data) => {
            [...ingredients.children].forEach(element => element.remove());
            Object.keys(data).forEach(item => ingredients.appendChild(new RecipeIngredient(item, data[item])));
        }
    });
    if (value) recipeIngredientsList.value = value;
    recipeIngredientsList.appendChild(name);
    recipeIngredientsList.appendChild(new Br);
    recipeIngredientsList.appendChild(description);
    recipeIngredientsList.appendChild(ingredients);
    recipeIngredientsList.appendChild(add);
    return recipeIngredientsList;
}
function RecipeIngredient(item, amount) {
    const recipeIngredient = document.createElement("RecipeIngredient");
    const itemInput = new SelectModItemInput(item, {}, { "width": "100px", "height": "25px" });
    const count = new Input({ "type": "number", "placeholder": "Amount Needed", "value": amount == null ? 1 : amount }, { "width": "50px", "height": "25px" });
    const trash = new Img({ "src": assets.trashBtn }, { "width": "25px", "height": "25px", "background": "none" });
    trash.onclick = () => {
        recipeIngredient.remove();
    };
    Object.defineProperty(recipeIngredient, "item", {
        get: () => { return itemInput.value },
        set: (x) => itemInput.value = x
    });
    Object.defineProperty(recipeIngredient, "amount", {
        get: () => { return count.value },
        set: (x) => count.value = x
    });
    recipeIngredient.appendChild(itemInput);
    recipeIngredient.appendChild(count);
    recipeIngredient.appendChild(trash);
    return recipeIngredient;
}

//--------------------
//Animation
//--------------------
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

//--------------------
//Image Editor
//--------------------
function ImageEditor(defaultState, crop = true) {
    const imageEditor = document.createElement("ImageEditor");
    const display = new Img({ src: defaultState.image, className: "ImageEditorDisplay" });
    const overlay = new Img({ src: assets.paintBrush, className: "ImageEditorOverlay" });
    const ImageData = defaultState;
    Object.defineProperty(imageEditor, "value", {
        get: () => { return ImageData },
        set: x => ImageData = x
    });
    overlay.onclick = async () => {
        const paint = await openZippedHTMLPage("https://cdn.assets.scratch.mit.edu/internalapi/asset/277a00bb2a17cc4d8c531e281d57d963.zip/get/", "popup,width=875,height=550", true, { defaultState });
        paint.onUpdateImage = (IsSVG, imageData, rcx, rcy) => {
            if (crop) {
                const img = new Image();
                img.onload = () => {
                    let d = IsSVG ? 16 : 32;
                    tempCTX.clearRect(0, 0, d, d);
                    tempCanvas.width = d;
                    tempCanvas.height = d;
                    tempCTX.drawImage(img, rcx, rcy - d, d, d, 0, 0, d, d);
                    display.src = tempCanvas.toDataURL();
                    img.remove();
                }
                if (IsSVG) {
                    img.src = `data:image/svg+xml,${encodeURIComponent(imageData)}`;
                } else {
                    tempCanvas.width = imageData.width;
                    tempCanvas.height = imageData.height;
                    tempCTX.putImageData(imageData, 0, 0);
                    img.src = tempCanvas.toDataURL();
                }
                [ImageData.rotationCenterX, ImageData.rotationCenterY, ImageData.image, ImageData.imageFormat, ImageData.bitmapResolution] = [rcx, rcy, img.src, IsSVG ? "svg" : "png", IsSVG ? 1 : 2];
            } else {
                if (IsSVG) {
                    display.src = `data:image/svg+xml,${encodeURIComponent(imageData)}`;
                } else {
                    tempCanvas.width = imageData.width;
                    tempCanvas.height = imageData.height;
                    tempCTX.putImageData(imageData, 0, 0);
                    display.src = tempCanvas.toDataURL();
                }
                [ImageData.rotationCenterX, ImageData.rotationCenterY, ImageData.image, ImageData.imageFormat, ImageData.bitmapResolution] = [rcx, rcy, display.src, IsSVG ? "svg" : "png", IsSVG ? 1 : 2];
            }
        }
    }
    imageEditor.appendChild(display);
    imageEditor.appendChild(overlay);
    (async () => {
        const img = new Image();
        img.onload = () => {
            let d = defaultState.imageFormat == "svg" ? 16 : 32;
            tempCTX.clearRect(0, 0, d, d);
            tempCanvas.width = d;
            tempCanvas.height = d;
            tempCTX.drawImage(img, defaultState.rotationCenterX, defaultState.rotationCenterY - d, d, d, 0, 0, d, d);
            display.src = tempCanvas.toDataURL();
            img.remove();
        }
        img.src = defaultState.image;
    })();
    return imageEditor;
}

//--------------------
//Reader
//--------------------
function ReadAsDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

//--------------------
//Open Zipped HTML Pages
//--------------------
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
        Object.defineProperty(openedWindow, "windowData", { get: function () { return window.windowData } });
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