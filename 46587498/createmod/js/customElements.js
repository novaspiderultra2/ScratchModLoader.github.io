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
    const textarea = new Textarea({ "value": args[2] ? args[2] : "" });
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
function ClassSelect(id) {
    const images = NPCClass[id].images;
    const className = NPCClass[id].name;
    const frames = NPCClass[id].frames;
    const item = NPCClass[id].item;
    const classSelect = document.createElement("ClassSelect");
    const button = new Button({}, { "background-color": "#00000080", "width": "fit-content", "height": "68px" });
    images.forEach(e => {
        button.appendChild(new Img({ "src": e }, { "width": "50px", "height": "50px", "object-fit": "contain" }));
    });
    button.appendChild(new Br);
    const name = new Text({ "innerText": className }, { "color": "#fff", "font-size": "0.75em" });
    button.appendChild(name);
    Object.defineProperty(classSelect, "name", {
        get: () => { return name.innerText },
        set: (x) => name.innerText = x
    });
    classSelect.onclick = e => {
        var target = e.target;
        while (target && target.tagName != "CLASSSELECT") target = target.parentElement;
        if (target.tagName == "CLASSSELECT") SelectMod("NPC", null, id, frames, item);
    }
    classSelect.appendChild(button);
    return classSelect;
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
function costumeToData(costume) {
    const data = costume;
    data.image = ProjectData.costumes[data.assetId].dataURL;
    return data;
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
        function variable(name) {
            return target.variables[name] ? target.variables[name][1] : undefined;
        }
        function list(name) {
            return target.lists[name] ? target.lists[name][1] : undefined;
        }
        let type = variable("type");
        console.log([target.name, variable("script")]);
        if (type == "JavaScript") SelectMod(type, args[3], target.name, variable("script"));
        else if (type == "Block" || type == "Beam") SelectMod(type, args[3], target.name, variable("material"), variable("digSpeed"), costumeToData(target.costumes[0]), costumeToData(target.costumes[1]), variable("light"));
        else if (type == "Pickaxe" || type == "Axe" || type == "Sword") SelectMod(type, args[3], target.name, variable("digSpeed"), costumeToData(target.costumes[0]), costumeToData(target.costumes[1]));
        else if (type == "Recipe") SelectMod(type, args[3], variable("item"), variable("amount"), variable("useStation"), variable("station"), list("items"), list("amounts"));
        else if (type == "Other") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]));
        else if (type == "Object 1x1" || type == "Fence" || type == "Platform") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), variable("material"), variable("digSpeed"), variable("light"));
        else if (type == "Object 2x2") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), variable("material"), variable("digSpeed"), costumeToData(target.costumes[1]), costumeToData(target.costumes[2]), costumeToData(target.costumes[3]), costumeToData(target.costumes[4]), variable("light"));
        else if (type == "NPC Drop") SelectMod(type, args[3], variable("item"), variable("min"), variable("max"), variable("chance"), variable("npc"));
        else if (type == "Mask") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), costumeToData(target.costumes[1]));
        else if (type == "NPC") SelectMod(type, args[3], target.variables.cls[1], target.costumes.slice(1).map(costumeToData), costumeToData(target.costumes[0]), target.name, variable("hp"), variable("agr"), variable("spd"), variable("sizX"), variable("sizY"), variable("rotStyle"), variable("showHealth"), variable("isBoss"));
        else if (type == "Object 2x1" || type == "Object 1x2" || type == "Torch" || type == "Table") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), variable("material"), variable("digSpeed"), costumeToData(target.costumes[1]), costumeToData(target.costumes[2]), variable("light"));
        else if (type == "Door") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), variable("material"), variable("digSpeed"), costumeToData(target.costumes[1]), costumeToData(target.costumes[2]), costumeToData(target.costumes[3]), variable("light"));
        else if (type == "Chain") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), variable("material"), variable("digSpeed"), costumeToData(target.costumes[1]), variable("light"));
        else if (type == "Staff") SelectMod(type, args[3], target.name, variable("digSpeed"), costumeToData(target.costumes[0]), costumeToData(target.costumes[1]), costumeToData(target.costumes[3]), costumeToData(target.costumes[4]), costumeToData(target.costumes[5]));
        else if (type == "Chest") SelectMod(type, args[3], variable("max"), variable("item"), variable("chance"), variable("rarity"));
        else if (type == "Chair") SelectMod(type, args[3], target.name, costumeToData(target.costumes[0]), costumeToData(target.costumes[1]), variable("material"), variable("digSpeed"), variable("light"));
        else if (type == "World Gen") SelectMod(type, args[3], target.name, variable("xml"));
        Mod.hidden = true;
        Editor.hidden = false;
    }
    trash.onclick = () => {
        if (confirm(`Delete ${args[1]}?`)) {
            ProjectData.json.targets.splice(args[3], 1);
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
        if (["Recipe", "NPC Drop", "JavaScript"].indexOf(ProjectData.json.targets[i].variables.type[1]) == -1) {
            addedItems.push(ProjectData.json.targets[i].name);
        }
    }
    const select = new Select([...ModItems, ...addedItems], ...args);
    if (value) select.value = isNaN(value) ? [...ModItems, ...addedItems].indexOf(value) : value - 1;
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
    for (var i = 1; i < ProjectData.json.targets.length; i++) {
        if (ProjectData.json.targets[i].variables.type[1] == "NPC") {
            addedNPCs.push(ProjectData.json.targets[i].name);
        }
    }
    const select = new Select([...NPCs, ...addedNPCs], ...args);
    if (value) select.value = isNaN(value) ? [...NPCs, ...addedNPCs].indexOf(value) : value - 1;
    Object.defineProperty(selectModNPCInput, "name", {
        get: () => select.options[select.selectedIndex].innerText,
        set: (x) => select.options[select.selectedIndex].innerText = x
    });
    window.test = select;
    Object.defineProperty(selectModNPCInput, "value", {
        get: () => {
            return parseInt(select.value) < 24 ? parseInt(select.value) + 1 : select.options[select.selectedIndex].innerText
        },
        set: (x) => {
            if (isNaN(x)) select.value = [...select.options].find(element => element.innerText == x).value;
            else select.value = x;
        }
    });
    selectModNPCInput.appendChild(select);
    return selectModNPCInput;
}
function RecipeIngredientsList(value) {
    const recipeIngredientsList = document.createElement("RecipeIngredientsList");
    const name = new Text({ "innerText": "Ingredients" }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": "What You Need To Craft The Item" }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const ingredients = new Div({}, { "width": "fit-content", "margin": "0px auto", "max-height": "125px", "overflow": "auto" });
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
function CodeEditor(name, desc, toolbox, workspace) {
    const editor = document.createElement("codeeditor");
    const title = new Text({ "innerText": name }, { "color": "#fff", "font-size": "1.5em" });
    const description = new Text({ "innerText": desc }, { "color": "#bfbfbf", "font-size": "0.75em" });
    const button = new Button({innerText: "Open Code Editor"});
    var codeEditor = null;
    var xml = workspace;
    button.onclick = () => {
        if (!codeEditor || codeEditor.closed) {
            codeEditor = window.open("./code", "popup", "width=1000,height=750");
            codeEditor.defaultToolbox = toolbox;
            codeEditor.defaultWorkspace = xml;
            codeEditor.addEventListener("blocklyLoaded", () => {
                codeEditor.workspace.addChangeListener(e => xml = codeEditor.toXml());
            });
        } else {
            codeEditor.focus();
        }
    }
    Object.defineProperty(editor, "value", {
        get: () => {
            if (codeEditor) return codeEditor.toXml();
            return xml;
        },
        set: e => {
            xml = e;
            if (codeEditor) codeEditor.fromXml(xml);
        }
    });
    editor.appendChild(title);
    editor.appendChild(new Br);
    editor.appendChild(description);
    editor.appendChild(new Br);
    editor.appendChild(button);
    return editor;
}
function ImageEditor(defaultState, crop = true) {
    const imageEditor = document.createElement("ImageEditor");
    const display = new Img({ src: defaultState.image, className: "ImageEditorDisplay" });
    const overlay = new Img({ src: assets.paintBrush, className: "ImageEditorOverlay" });
    const ImageData = defaultState;
    Object.defineProperty(imageEditor, "value", {
        get: () => { return ImageData },
        set: async x => ImageData = x
    });
    
    imageEditor.setImage = (IsSVG, imageData, rcx, rcy) => {
        var imgDataUrl;
        if (crop) {
            const img = new Image();
            img.onload = () => {
                if (IsSVG) {
                    let d = 160;
                    let sd = 16;
                    tempCTX.clearRect(0, 0, d, d);
                    tempCanvas.width = d;
                    tempCanvas.height = d;
                    tempCTX.drawImage(img, rcx, rcy - sd, sd, sd, 0, 0, d, d);
                    display.src = tempCanvas.toDataURL();
                    img.remove();
                } else {
                    let d = 32;
                    tempCTX.clearRect(0, 0, d, d);
                    tempCanvas.width = d;
                    tempCanvas.height = d;
                    tempCTX.drawImage(img, rcx, rcy - d, d, d, 0, 0, d, d);
                    display.src = tempCanvas.toDataURL();
                    img.remove();
                }
            }
            if (IsSVG) {
                imgDataUrl = `data:image/svg+xml,${encodeURIComponent(imageData)}`;
                img.src = `data:image/svg+xml,${encodeURIComponent(imageData.replace("</svg>", `<style>${scratchfontstyles}</style></svg>`))}`;
            } else {
                tempCanvas.width = imageData.width;
                tempCanvas.height = imageData.height;
                tempCTX.putImageData(imageData, 0, 0);
                imgDataUrl = img.src = tempCanvas.toDataURL();
            }
            [ImageData.rotationCenterX, ImageData.rotationCenterY, ImageData.image, ImageData.imageFormat, ImageData.bitmapResolution] = [rcx, rcy, imgDataUrl, IsSVG ? "svg" : "png", IsSVG ? 1 : 2];
        } else {
            if (IsSVG) {
                imgDataUrl = `data:image/svg+xml,${encodeURIComponent(imageData)}`;
                display.src = `data:image/svg+xml,${encodeURIComponent(imageData.replace("</svg>", `<style>${scratchfontstyles}</style></svg>`))}`;
            } else {
                tempCanvas.width = imageData.width;
                tempCanvas.height = imageData.height;
                tempCTX.putImageData(imageData, 0, 0);
                imgDataUrl = display.src = tempCanvas.toDataURL();
            }
            [ImageData.rotationCenterX, ImageData.rotationCenterY, ImageData.image, ImageData.imageFormat, ImageData.bitmapResolution] = [rcx, rcy, imgDataUrl, IsSVG ? "svg" : "png", IsSVG ? 1 : 2];
        }
    }
    overlay.onclick = async () => {
        const paint = await openZippedHTMLPage("https://cdn.assets.scratch.mit.edu/internalapi/asset/277a00bb2a17cc4d8c531e281d57d963.zip/get/", "popup,width=875,height=550", true, { defaultState });
        paint.onUpdateImage = imageEditor.setImage;
    }
    imageEditor.appendChild(display);
    imageEditor.appendChild(overlay);
    display.src = defaultState.image;
    (async () => {
        console.log(ImageData);
        if (ImageData.imageFormat == "svg") display.src = `data:image/svg+xml,${encodeURIComponent((await (await fetch(ImageData.image)).text()).replace("</svg>", `<style>${scratchfontstyles}</style></svg>`))}`;

        if (crop) {
            const img = new Image();
            img.onload = async () => {
                if (defaultState.imageFormat == "svg") {
                    let d = 160;
                    let sd = 16;
                    tempCTX.clearRect(0, 0, d, d);
                    tempCanvas.width = d;
                    tempCanvas.height = d;
                    tempCTX.drawImage(img, defaultState.rotationCenterX, defaultState.rotationCenterY - sd, sd, sd, 0, 0, d, d);
                    display.src = tempCanvas.toDataURL();
                    img.remove();
                } else {
                    let d = 32;
                    tempCTX.clearRect(0, 0, d, d);
                    tempCanvas.width = d;
                    tempCanvas.height = d;
                    tempCTX.drawImage(img, defaultState.rotationCenterX, defaultState.rotationCenterY - d, d, d, 0, 0, d, d);
                    display.src = tempCanvas.toDataURL();
                    img.remove();
                }
            }
            img.src = display.src;
        }
    })();
    return imageEditor;
}