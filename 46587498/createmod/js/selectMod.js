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
    } else if (type == "Mask") {
        SelectMaskMod(...args);
    } else if (type == "NPC") {
        SelectNPCMod(...args);
    } else if (type == "Object 2x1") {
        SelectObject2x1Mod(...args);
    } else if (type == "Object 1x2") {
        SelectObject1x2Mod(...args);
    } else if (type == "Door") {
        SelectDoorMod(...args);
    } else if (type == "Beam") {
        SelectBeamMod(...args);
    } else if (type == "Fence") {
        SelectFenceMod(...args);
    } else if (type == "Platform") {
        SelectPlatformMod(...args);
    } else if (type == "Torch") {
        SelectTorchMod(...args);
    } else if (type == "Chain") {
        SelectChainMod(...args);
    } else if (type == "Staff") {
        SelectStaffMod(...args);
    } else if (type == "Chest Gen") {
        SelectChestGenMod(...args);
    } else if (type == "Table") {
        SelectTableMod(...args);
    } else if (type == "Chair") {
        SelectChairMod(...args);
    } else if (type == "World Gen") {
        SelectWorldGenMod(...args);
    }
}

function SelectJavaScriptMod(ID, Name, Contents) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add JavaScript" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Script's Name", "Script Name", Name ? Name : "My New Script");
    const script = new TextboxInput("Script", "Script's Contents", Contents ? Contents : "");
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
        UnsavedChanges = true;
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
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.addSprite()" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.addCostume()" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.addSound()" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "window.vm.runtime.storage" }, { "color": "#fff", "font-size": "1em", "font-family": "sans-serif" }));
    Editor.appendChild(new Br);
}
function SelectBlockMod(ID, Name, Material, DigSpeed, TopBlock, BottomBlock, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Block" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const topBlock = new ImageEditor({
        name: "Top Block",
        rotationCenterX: TopBlock ? TopBlock.rotationCenterX : 0,
        rotationCenterY: TopBlock ? TopBlock.rotationCenterY : 32,
        imageFormat: TopBlock ? TopBlock.dataFormat : "png",
        image: TopBlock ? TopBlock.image : assets.block
    });
    const bottomBlock = new ImageEditor({
        name: "Bottom Block",
        rotationCenterX: BottomBlock ? BottomBlock.rotationCenterX : 0,
        rotationCenterY: BottomBlock ? BottomBlock.rotationCenterY : 32,
        imageFormat: BottomBlock ? BottomBlock.dataFormat : "png",
        image: BottomBlock ? BottomBlock.image : assets.dirt
    });
    const name = new StringInput("Name", "New Block's Name", "Name", Name ? Name : "My New Block");
    const material = new SelectInput("Material", "What The Block Is Made Out Of", [{ 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectPickaxeMod(ID, Name, DigSpeed, InventorySprite, UseSprite) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Pickaxe" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Pickaxe's Name", "Name", Name ? Name : "My New Pickaxe");
    const inventorySprite = new ImageEditor({
        name: "Pickaxe",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 32,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "png",
        image: InventorySprite ? InventorySprite.image : assets.pickaxe
    });
    const useSprite = new ImageEditor({
        name: "Pickaxe (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 29,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSprite ? UseSprite.image : assets.pickaxe
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Pickaxe's Strength", "Dig Speed", DigSpeed ? DigSpeed : 5);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
function SelectAxeMod(ID, Name, DigSpeed, InventorySprite, UseSprite) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Axe" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Axe's Name", "Name", Name ? Name : "My New Axe");
    const inventorySprite = new ImageEditor({
        name: "Axe",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 32,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "png",
        image: InventorySprite ? InventorySprite.image : assets.axe
    });
    const useSprite = new ImageEditor({
        name: "Axe (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 29,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSprite ? UseSprite.image : assets.axe
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Axe's Strength", "Dig Speed", DigSpeed ? DigSpeed : 5);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
function SelectSwordMod(ID, Name, DigSpeed, InventorySprite, UseSprite) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Sword" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Sword's Name", "Name", Name ? Name : "My New Sword");
    const inventorySprite = new ImageEditor({
        name: "Sword",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 32,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "png",
        image: InventorySprite ? InventorySprite.image : assets.sword
    });
    const useSprite = new ImageEditor({
        name: "Sword (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 29,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSprite ? UseSprite.image : assets.sword
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Sword's Strength", "Dig Speed", DigSpeed ? DigSpeed : 10);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
        UnsavedChanges = true;
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
function SelectOtherMod(ID, Name, Image) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Item" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 22,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.other
    });
    const name = new StringInput("Name", "New Item's Name", "Name", Name ? Name : "My New Item");
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
function SelectObject1x1Mod(ID, Name, Image, Material, DigSpeed, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Object 1x1" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : 0,
        rotationCenterY: Image ? Image.rotationCenterY : 28,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.chest
    });
    const name = new StringInput("Name", "New Object's Name", "Name", Name ? Name : "My New Object");
    const material = new SelectInput("Material", "What The Object Is Made Out Of", [{ 11: "Veg", 12: "Wood", 13: "Chest", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectObject2x2Mod(ID, Name, Image, Material, DigSpeed, TopLeft, BottomLeft, TopRight, BottomRight, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Object 2x2" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 30,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.bookcase_item
    });
    const topLeft = new ImageEditor({
        name: "Top Left",
        rotationCenterX: TopLeft ? TopLeft.rotationCenterX : -8,
        rotationCenterY: TopLeft ? TopLeft.rotationCenterY : 32,
        imageFormat: TopLeft ? TopLeft.dataFormat : "png",
        image: TopLeft ? TopLeft.image : assets.bookcase1
    });
    const bottomLeft = new ImageEditor({
        name: "Bottom Left",
        rotationCenterX: BottomLeft ? BottomLeft.rotationCenterX : -8,
        rotationCenterY: BottomLeft ? BottomLeft.rotationCenterY : 32,
        imageFormat: BottomLeft ? BottomLeft.dataFormat : "png",
        image: BottomLeft ? BottomLeft.image : assets.bookcase2
    });
    const topRight = new ImageEditor({
        name: "Top Right",
        rotationCenterX: TopRight ? TopRight.rotationCenterX : 0,
        rotationCenterY: TopRight ? TopRight.rotationCenterY : 32,
        imageFormat: TopRight ? TopRight.dataFormat : "png",
        image: TopRight ? TopRight.image : assets.bookcase3
    });
    const bottomRight = new ImageEditor({
        name: "Bottom Right",
        rotationCenterX: BottomRight ? BottomRight.rotationCenterX : 0,
        rotationCenterY: BottomRight ? BottomRight.rotationCenterY : 32,
        imageFormat: BottomRight ? BottomRight.dataFormat : "png",
        image: BottomRight ? BottomRight.image : assets.bookcase4
    });
    topLeft.style.display = "inline-block";
    topRight.style.display = "inline-block";
    bottomLeft.style.display = "inline-block";
    bottomRight.style.display = "inline-block";
    const name = new StringInput("Name", "New Object's Name", "Name", Name ? Name : "My New Object");
    const material = new SelectInput("Material", "What The Object Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
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
        UnsavedChanges = true;
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
        Sprite.variables.npc = ["NPC", npc.value];
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
function SelectMaskMod(ID, Name, Item, Mask) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Mask" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const item = new ImageEditor({
        name: "Item",
        rotationCenterX: Item ? Item.rotationCenterX : -8,
        rotationCenterY: Item ? Item.rotationCenterY : 24,
        imageFormat: Item ? Item.dataFormat : "png",
        image: Item ? Item.image : assets.head
    });
    const mask = new ImageEditor({
        name: "Mask",
        rotationCenterX: Mask ? Mask.rotationCenterX : 8,
        rotationCenterY: Mask ? Mask.rotationCenterY : 16,
        imageFormat: Mask ? Mask.dataFormat : "png",
        image: Mask ? Mask.image : assets.head
    }, false);
    const name = new StringInput("Name", "New Mask's Name", "Name", Name ? Name : "My New Mask");
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(item.value.image, item.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = item.value.bitmapResolution;
        costume[1].rotationCenterX = item.value.rotationCenterX;
        costume[1].rotationCenterY = item.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(mask.value.image, mask.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = mask.value.bitmapResolution;
        costume[1].rotationCenterX = mask.value.rotationCenterX;
        costume[1].rotationCenterY = mask.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Mask"];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(item);
    Editor.appendChild(new Text({ "innerText": "Mask Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(mask);
    Editor.appendChild(name);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectNPCMod(ID, Class, Frames, Item, Name, Health, Aggressive, Speed, Width, Height, Rotation, ShowHealth, IsBoss) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add NPC" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    if (Class) {
        Editor.appendChild(new Text({ "innerText": NPCClass[Class].name + " Class" }, { "color": "#fff", "font-size": "2em" }));
        Editor.appendChild(new Br);
        Editor.appendChild(new Br);
        const item = new ImageEditor({
            name: "Item",
            rotationCenterX: Item.rotationCenterX,
            rotationCenterY: Item.rotationCenterY,
            imageFormat: Item.dataFormat,
            image: Item.image
        });
        Editor.appendChild(new Text({ "innerText": "Summon Item" }, { "color": "#fff", "font-size": "1.5em" }));
        Editor.appendChild(item);
        Editor.appendChild(new Br);
        Editor.appendChild(new Br);
        Editor.appendChild(new Text({ "innerText": "NPC Frames" }, { "color": "#fff", "font-size": "1.5em" }));
        const frames = Frames.map((e, i) => new ImageEditor({
            name: "Frame" + (i + 1).toString(),
            rotationCenterX: e.rotationCenterX,
            rotationCenterY: e.rotationCenterY,
            imageFormat: e.dataFormat,
            image: e.image
        }, false));
        frames.forEach(e => {
            Editor.appendChild(e);
        });
        const name = new StringInput("Summon Item Name", "Summon Item's Name", "Name", Name ? Name : "My New NPC");
        const hp = new NumberInput("Health", "New NPC's Health", "Health", Health ? Health : 5);
        const agr = new SelectInput("Aggressive", "New NPC's Aggression", [{ "0": "Passive", "1": "Aggressive", "10": "Eye of Cthulhu" }, { value: Aggressive ? Aggressive : "0" }]);
        const spd = new NumberInput("Speed", "New NPC's Speed", "Speed", Speed ? Speed : 1);
        const sizX = new NumberInput("Width", "New NPC's Width (Typically Equivalent to Sprite Width)", "Width", Width ? Width : 10);
        const sizY = new NumberInput("Height", "New NPC's Height (Typically Equivalent to Sprite Height)", "Height", Height ? Height : 10);
        const rotStyle = new SelectInput("Rotation Style", "New NPC's Rotation Style", [{ "left-right": "left-right", "don't rotate": "don't rotate", "all around": "all around" }, { value: Rotation ? Rotation : "left-right" }]);
        const showHealth = new Input({ "type": "checkbox", "checked": ShowHealth ? ShowHealth : false });
        const isBoss = new Input({ "type": "checkbox", "checked": IsBoss ? IsBoss : false });
        Editor.appendChild(new Br);
        Editor.appendChild(name);
        Editor.appendChild(hp);
        Editor.appendChild(agr);
        Editor.appendChild(spd);
        Editor.appendChild(sizX);
        Editor.appendChild(sizY);
        Editor.appendChild(rotStyle);
        Editor.appendChild(new Br);
        Editor.appendChild(new Br);
        Editor.appendChild(showHealth);
        Editor.appendChild(new Text({ "innerText": "Health Visible?" }, { "color": "#fff", "font-size": "1.5em" }));
        Editor.appendChild(new Br);
        Editor.appendChild(isBoss);
        Editor.appendChild(new Text({ "innerText": "Is Boss?" }, { "color": "#fff", "font-size": "1.5em" }));
        Editor.appendChild(new Br);
        Editor.appendChild(new Br);
        Editor.appendChild(cancel);
        const finish = new Button({ "innerText": "Finish" });
        finish.onclick = async () => {
        UnsavedChanges = true;
            const Sprite = ProjectData.Sprite;
            Sprite.name = name.value;
            Sprite.variables.type = ["Type", "NPC"];
            Sprite.variables.cls = ["Class", Class];
            var costume = await new Costume(item.value.image, item.value.imageFormat);
            costume[1].name = name.value;
            costume[1].bitmapResolution = item.value.bitmapResolution;
            costume[1].rotationCenterX = item.value.rotationCenterX;
            costume[1].rotationCenterY = item.value.rotationCenterY;
            Sprite.costumes[0] = costume[1];
            ProjectData.costumes[costume[0].ID] = costume[0];
            for (var i = 0; i < frames.length; i++) {
                let frame = frames[i];
                costume = await new Costume(frame.value.image, frame.value.imageFormat);
                costume[1].name = "Frame" + (i + 1).toString();
                costume[1].bitmapResolution = frame.value.bitmapResolution;
                costume[1].rotationCenterX = frame.value.rotationCenterX;
                costume[1].rotationCenterY = frame.value.rotationCenterY;
                Sprite.costumes.push(costume[1]);
                ProjectData.costumes[costume[0].ID] = costume[0];
            }
            Sprite.variables.hp = ["Health", hp.value];
            Sprite.variables.agr = ["Aggressive", agr.value];
            Sprite.variables.spd = ["Speed", spd.value];
            Sprite.variables.sizX = ["Size X", sizX.value];
            Sprite.variables.sizY = ["Size Y", sizY.value];
            Sprite.variables.rotStyle = ["Rotation Style", rotStyle.value];
            Sprite.variables.showHealth = ["Health Visible", showHealth.checked];
            Sprite.variables.isBoss = ["Boss", isBoss.checked];
            if (ID) ProjectData.json.targets[ID] = Sprite;
            else ProjectData.json.targets.push(Sprite);
            Editor.hidden = true;
            AddItemElements();
            Mod.hidden = false;
        };
        Editor.appendChild(finish);
        Editor.appendChild(new Br);
        Editor.appendChild(new Br);
    } else {
        Editor.appendChild(new Text({ "innerText": "Select NPC Class" }, { "color": "#fff", "font-size": "1.5em" }));
        Editor.appendChild(new Br);
        Object.keys(NPCClass).forEach(id => {
            Editor.appendChild(new ClassSelect(id));
            Editor.appendChild(new Br);
        });
    }
}
function SelectObject2x1Mod(ID, Name, Image, Material, DigSpeed, Left, Right, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Object 2x1" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : 0,
        rotationCenterY: Image ? Image.rotationCenterY : 26,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.bed_item
    });
    const left = new ImageEditor({
        name: "Left",
        rotationCenterX: Left ? Left.rotationCenterX : 0,
        rotationCenterY: Left ? Left.rotationCenterY : 32,
        imageFormat: Left ? Left.dataFormat : "png",
        image: Left ? Left.image : assets.bed1
    });
    const right = new ImageEditor({
        name: "Right",
        rotationCenterX: Right ? Right.rotationCenterX : 0,
        rotationCenterY: Right ? Right.rotationCenterY : 22,
        imageFormat: Right ? Right.dataFormat : "png",
        image: Right ? Right.image : assets.bed2
    });
    left.style.display = "inline-block";
    right.style.display = "inline-block";
    const name = new StringInput("Name", "New Object's Name", "Name", Name ? Name : "My New Object");
    const material = new SelectInput("Material", "What The Object Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(left.value.image, left.value.imageFormat);
        costume[1].name = name.value + "-Left";
        costume[1].bitmapResolution = left.value.bitmapResolution;
        costume[1].rotationCenterX = left.value.rotationCenterX;
        costume[1].rotationCenterY = left.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(right.value.image, right.value.imageFormat);
        costume[1].name = name.value + "-Right";
        costume[1].bitmapResolution = right.value.bitmapResolution;
        costume[1].rotationCenterX = right.value.rotationCenterX;
        costume[1].rotationCenterY = right.value.rotationCenterY;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Object 2x1"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(left);
    Editor.appendChild(right);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectObject1x2Mod(ID, Name, Image, Material, DigSpeed, Top, Bottom, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Object 1x2" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 30,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.clock_item
    });
    const top = new ImageEditor({
        name: "Top",
        rotationCenterX: Top ? Top.rotationCenterX : -4,
        rotationCenterY: Top ? Top.rotationCenterY : 32,
        imageFormat: Top ? Top.dataFormat : "png",
        image: Top ? Top.image : assets.clock1
    });
    const bottom = new ImageEditor({
        name: "Bottom",
        rotationCenterX: Bottom ? Bottom.rotationCenterX : -4,
        rotationCenterY: Bottom ? Bottom.rotationCenterY : 32,
        imageFormat: Bottom ? Bottom.dataFormat : "png",
        image: Bottom ? Bottom.image : assets.clock2
    });
    const name = new StringInput("Name", "New Object's Name", "Name", Name ? Name : "My New Object");
    const material = new SelectInput("Material", "What The Object Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(top.value.image, top.value.imageFormat);
        costume[1].name = name.value + "-Top";
        costume[1].bitmapResolution = top.value.bitmapResolution;
        costume[1].rotationCenterX = top.value.rotationCenterX;
        costume[1].rotationCenterY = top.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(bottom.value.image, bottom.value.imageFormat);
        costume[1].name = name.value + "-Bottom";
        costume[1].bitmapResolution = bottom.value.bitmapResolution;
        costume[1].rotationCenterX = bottom.value.rotationCenterX;
        costume[1].rotationCenterY = bottom.value.rotationCenterY;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Object 1x2"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(top);
    Editor.appendChild(bottom);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectDoorMod(ID, Name, Image, Material, DigSpeed, Top, Bottom, Open, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Door" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -7,
        rotationCenterY: Image ? Image.rotationCenterY : 32,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.door_item
    });
    const top = new ImageEditor({
        name: "Top",
        rotationCenterX: Top ? Top.rotationCenterX : -8,
        rotationCenterY: Top ? Top.rotationCenterY : 32,
        imageFormat: Top ? Top.dataFormat : "png",
        image: Top ? Top.image : assets.door1
    });
    const bottom = new ImageEditor({
        name: "Bottom",
        rotationCenterX: Bottom ? Bottom.rotationCenterX : -8,
        rotationCenterY: Bottom ? Bottom.rotationCenterY : 32,
        imageFormat: Bottom ? Bottom.dataFormat : "png",
        image: Bottom ? Bottom.image : assets.door2
    });
    const open = new ImageEditor({
        name: "Open",
        rotationCenterX: Open ? Open.rotationCenterX : 8,
        rotationCenterY: Open ? Open.rotationCenterY : 64,
        imageFormat: Open ? Open.dataFormat : "png",
        image: Open ? Open.image : assets.door_open
    }, false);
    const name = new StringInput("Name", "New Door's Name", "Name", Name ? Name : "My New Door");
    const material = new SelectInput("Material", "What The Door Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Block Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(top.value.image, top.value.imageFormat);
        costume[1].name = name.value + "-Top";
        costume[1].bitmapResolution = top.value.bitmapResolution;
        costume[1].rotationCenterX = top.value.rotationCenterX;
        costume[1].rotationCenterY = top.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(bottom.value.image, bottom.value.imageFormat);
        costume[1].name = name.value + "-Bottom";
        costume[1].bitmapResolution = bottom.value.bitmapResolution;
        costume[1].rotationCenterX = bottom.value.rotationCenterX;
        costume[1].rotationCenterY = bottom.value.rotationCenterY;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(open.value.image, open.value.imageFormat);
        costume[1].name = name.value + "-Open";
        costume[1].bitmapResolution = open.value.bitmapResolution;
        costume[1].rotationCenterX = open.value.rotationCenterX;
        costume[1].rotationCenterY = open.value.rotationCenterY;
        Sprite.costumes[3] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Door"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(top);
    Editor.appendChild(bottom);
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "Open" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(open);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectBeamMod(ID, Name, Material, DigSpeed, Top, Bottom, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Beam" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const top = new ImageEditor({
        name: "Top",
        rotationCenterX: Top ? Top.rotationCenterX : 0,
        rotationCenterY: Top ? Top.rotationCenterY : 32,
        imageFormat: Top ? Top.dataFormat : "png",
        image: Top ? Top.image : assets.beam_top
    });
    const bottom = new ImageEditor({
        name: "Bottom",
        rotationCenterX: Bottom ? Bottom.rotationCenterX : 0,
        rotationCenterY: Bottom ? Bottom.rotationCenterY : 32,
        imageFormat: Bottom ? Bottom.dataFormat : "png",
        image: Bottom ? Bottom.image : assets.beam
    });
    const name = new StringInput("Name", "New Beam's Name", "Name", Name ? Name : "My New Beam");
    const material = new SelectInput("Material", "What The Beam Is Made Out Of", [{ 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Beam Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(top.value.image, top.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = top.value.bitmapResolution;
        costume[1].rotationCenterX = top.value.rotationCenterX;
        costume[1].rotationCenterY = top.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(bottom.value.image, bottom.value.imageFormat);
        costume[1].name = `${name.value}2`;
        costume[1].bitmapResolution = bottom.value.bitmapResolution;
        costume[1].rotationCenterX = bottom.value.rotationCenterX;
        costume[1].rotationCenterY = bottom.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Beam"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Top Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(top);
    Editor.appendChild(new Text({ "innerText": "Bottom Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(bottom);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectFenceMod(ID, Name, Image, Material, DigSpeed, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Fence" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : 0,
        rotationCenterY: Image ? Image.rotationCenterY : 30,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.fence
    });
    const name = new StringInput("Name", "New Fence's Name", "Name", Name ? Name : "My New Fence");
    const material = new SelectInput("Material", "What The Fence Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Fence Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Fence"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectPlatformMod(ID, Name, Image, Material, DigSpeed, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Platform" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : 0,
        rotationCenterY: Image ? Image.rotationCenterY : 32,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.platform
    });
    const name = new StringInput("Name", "New Platform's Name", "Name", Name ? Name : "My New Platform");
    const material = new SelectInput("Material", "What The Platform Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Platform Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Platform"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectTorchMod(ID, Name, Image, Material, DigSpeed, Left, Right, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Torch" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -12,
        rotationCenterY: Image ? Image.rotationCenterY : 20,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.torch
    });
    const left = new ImageEditor({
        name: "Left",
        rotationCenterX: Left ? Left.rotationCenterX : 0,
        rotationCenterY: Left ? Left.rotationCenterY : 22,
        imageFormat: Left ? Left.dataFormat : "png",
        image: Left ? Left.image : assets.torch_left
    });
    const right = new ImageEditor({
        name: "Right",
        rotationCenterX: Right ? Right.rotationCenterX : -18,
        rotationCenterY: Right ? Right.rotationCenterY : 22,
        imageFormat: Right ? Right.dataFormat : "png",
        image: Right ? Right.image : assets.torch_right
    });
    left.style.display = "inline-block";
    right.style.display = "inline-block";
    const name = new StringInput("Name", "New Torch's Name", "Name", Name ? Name : "My New Torch");
    const material = new SelectInput("Material", "What The Torch Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Torch Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": Light == undefined ? true : !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(left.value.image, left.value.imageFormat);
        costume[1].name = name.value + "-Left";
        costume[1].bitmapResolution = left.value.bitmapResolution;
        costume[1].rotationCenterX = left.value.rotationCenterX;
        costume[1].rotationCenterY = left.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(right.value.image, right.value.imageFormat);
        costume[1].name = name.value + "-Right";
        costume[1].bitmapResolution = right.value.bitmapResolution;
        costume[1].rotationCenterX = right.value.rotationCenterX;
        costume[1].rotationCenterY = right.value.rotationCenterY;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Torch"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(image);
    Editor.appendChild(left);
    Editor.appendChild(right);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectChainMod(ID, Name, Image, Material, DigSpeed, Placed, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Chain" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 28,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.chain
    });
    const placed = new ImageEditor({
        name: "Placed",
        rotationCenterX: Placed ? Placed.rotationCenterX : -12,
        rotationCenterY: Placed ? Placed.rotationCenterY : 32,
        imageFormat: Placed ? Placed.dataFormat : "png",
        image: Placed ? Placed.image : assets.chain2
    });
    const name = new StringInput("Name", "New Chain's Name", "Name", Name ? Name : "My New Chain");
    const material = new SelectInput("Material", "What The Chain Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 60 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Chain Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(placed.value.image, placed.value.imageFormat);
        costume[1].name = name.value + "-Placed";
        costume[1].bitmapResolution = placed.value.bitmapResolution;
        costume[1].rotationCenterX = placed.value.rotationCenterX;
        costume[1].rotationCenterY = placed.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Chain"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(placed);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectStaffMod(ID, Name, DigSpeed, InventorySprite, UseSprite, Projectile1, Projectile2, Projectile3) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Staff" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "New Staff's Name", "Name", Name ? Name : "My New Staff");
    const inventorySprite = new ImageEditor({
        name: "Staff",
        rotationCenterX: InventorySprite ? InventorySprite.rotationCenterX : 0,
        rotationCenterY: InventorySprite ? InventorySprite.rotationCenterY : 16,
        imageFormat: InventorySprite ? InventorySprite.dataFormat : "svg",
        image: InventorySprite ? InventorySprite.image : assets.ITEM_DiamondStaff
    });
    const useSprite = new ImageEditor({
        name: "Staff (Use)",
        rotationCenterX: UseSprite ? UseSprite.rotationCenterX : -10,
        rotationCenterY: UseSprite ? UseSprite.rotationCenterY : 37,
        imageFormat: UseSprite ? UseSprite.dataFormat : "png",
        image: UseSprite ? UseSprite.image : assets.DiamondStaff
    }, false);
    const projectile1 = new ImageEditor({
        name: "Projectile1",
        rotationCenterX: Projectile1 ? Projectile1.rotationCenterX : 11,
        rotationCenterY: Projectile1 ? Projectile1.rotationCenterY : 11,
        imageFormat: Projectile1 ? Projectile1.dataFormat : "png",
        image: Projectile1 ? Projectile1.image : assets.Projectile1
    }, false);
    const projectile2 = new ImageEditor({
        name: "Projectile2",
        rotationCenterX: Projectile2 ? Projectile2.rotationCenterX : 11,
        rotationCenterY: Projectile2 ? Projectile2.rotationCenterY : 11,
        imageFormat: Projectile2 ? Projectile2.dataFormat : "png",
        image: Projectile2 ? Projectile2.image : assets.Projectile2
    }, false);
    const projectile3 = new ImageEditor({
        name: "Projectile3",
        rotationCenterX: Projectile3 ? Projectile3.rotationCenterX : 9,
        rotationCenterY: Projectile3 ? Projectile3.rotationCenterY : 9,
        imageFormat: Projectile3 ? Projectile3.dataFormat : "png",
        image: Projectile3 ? Projectile3.image : assets.Projectile3
    }, false);
    const digSpeed = new NumberInput("Dig Speed", "The Staff's Strength", "Dig Speed", DigSpeed ? DigSpeed : 10);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
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
        costume = await new Costume(projectile1.value.image, projectile1.value.imageFormat);
        costume[1].name = `Projectile1`;
        costume[1].bitmapResolution = projectile1.value.bitmapResolution;
        costume[1].rotationCenterX = projectile1.value.rotationCenterX;
        costume[1].rotationCenterY = projectile1.value.rotationCenterY;
        Sprite.costumes[3] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(projectile2.value.image, projectile2.value.imageFormat);
        costume[1].name = `Projectile2`;
        costume[1].bitmapResolution = projectile2.value.bitmapResolution;
        costume[1].rotationCenterX = projectile2.value.rotationCenterX;
        costume[1].rotationCenterY = projectile2.value.rotationCenterY;
        Sprite.costumes[4] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(projectile3.value.image, projectile3.value.imageFormat);
        costume[1].name = `Projectile3`;
        costume[1].bitmapResolution = projectile3.value.bitmapResolution;
        costume[1].rotationCenterX = projectile3.value.rotationCenterX;
        costume[1].rotationCenterY = projectile3.value.rotationCenterY;
        Sprite.costumes[5] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Staff"];
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
    Editor.appendChild(new Text({ "innerText": "Projectiles" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(projectile1);
    Editor.appendChild(projectile2);
    Editor.appendChild(projectile3);
    Editor.appendChild(name);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectChestGenMod(ID, Item, Max, Chance, Rarity) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Item to Chest Generation" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const item = new SelectModItemInput(Item);
    const rarity = new SelectInput("Rarity", "How it Generates", [{ "": "Rare | Only 1 Rare Item Generates Per Chest", "Common": "Common | No Limit" }, { value: Rarity ? Rarity : "" }]);
    const max = new NumberInput("Maximum Generated", "How Much it Can Contain", "Maximum Generated", Max ? Max : 1);
    const chance = new NumberInput("Probability", "0 = 0%, 0.5 = 50%, 1 = 100%", "Chance", Chance ? Chance : 1);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = item.name;
        const costume = await new Costume(assets.goldChest);
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Chest Gen"];
        Sprite.variables.item = ["Item", item.value];
        Sprite.variables.rarity = ["Rarity", rarity.value];
        Sprite.variables.chance = ["Probability", chance.value];
        Sprite.variables.max = ["Maximum", max.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Text({ "innerText": "The Item Being Generated" }, { "color": "#bfbfbf", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(item);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(rarity);
    Editor.appendChild(max);
    Editor.appendChild(chance);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectTableMod(ID, Name, Image, Material, DigSpeed, Left, Right, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Table" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : 0,
        rotationCenterY: Image ? Image.rotationCenterY : 27,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.ITEM_table
    });
    const left = new ImageEditor({
        name: "Left",
        rotationCenterX: Left ? Left.rotationCenterX : -2,
        rotationCenterY: Left ? Left.rotationCenterY : 32,
        imageFormat: Left ? Left.dataFormat : "png",
        image: Left ? Left.image : assets.table1
    });
    const right = new ImageEditor({
        name: "Right",
        rotationCenterX: Right ? Right.rotationCenterX : 0,
        rotationCenterY: Right ? Right.rotationCenterY : 32,
        imageFormat: Right ? Right.dataFormat : "png",
        image: Right ? Right.image : assets.table2
    });
    left.style.display = "inline-block";
    right.style.display = "inline-block";
    const name = new StringInput("Name", "New Table's Name", "Name", Name ? Name : "My New Table");
    const material = new SelectInput("Material", "What The Table Is Made Out Of", [{ 11: "Veg", 12: "Wood", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Table Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value;
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(left.value.image, left.value.imageFormat);
        costume[1].name = name.value + "-Left";
        costume[1].bitmapResolution = left.value.bitmapResolution;
        costume[1].rotationCenterX = left.value.rotationCenterX;
        costume[1].rotationCenterY = left.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        costume = await new Costume(right.value.image, right.value.imageFormat);
        costume[1].name = name.value + "-Right";
        costume[1].bitmapResolution = right.value.bitmapResolution;
        costume[1].rotationCenterX = right.value.rotationCenterX;
        costume[1].rotationCenterY = right.value.rotationCenterY;
        Sprite.costumes[2] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Table"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
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
    Editor.appendChild(left);
    Editor.appendChild(right);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectChairMod(ID, Name, Image, Left, Material, DigSpeed, Light) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add Chair" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const image = new ImageEditor({
        name: "Item",
        rotationCenterX: Image ? Image.rotationCenterX : -8,
        rotationCenterY: Image ? Image.rotationCenterY : 32,
        imageFormat: Image ? Image.dataFormat : "png",
        image: Image ? Image.image : assets.chair_right
    });
    const left = new ImageEditor({
        name: "Left",
        rotationCenterX: Left ? Left.rotationCenterX : -8,
        rotationCenterY: Left ? Left.rotationCenterY : 32,
        imageFormat: Left ? Left.dataFormat : "png",
        image: Left ? Left.image : assets.chair_left
    });
    const name = new StringInput("Name", "New Chair's Name", "Name", Name ? Name : "My New Chair");
    const material = new SelectInput("Material", "What The Chair Is Made Out Of", [{ 11: "Veg", 12: "Wood", 13: "Chest", 20: "Dirt", 30: "Stone", 50: "Ore", 60: "Metal", 63: "Metal Chest", 70: "Hellstone" }, { value: Material ? Material : 12 }]);
    const digSpeed = new NumberInput("Dig Speed", "How Fast The Chair Will Break", "Dig Speed", DigSpeed ? DigSpeed : "");
    const light = new Input({ "type": "checkbox", "checked": !!Light });
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        var costume = await new Costume(image.value.image, image.value.imageFormat);
        costume[1].name = name.value + "_Right";
        costume[1].bitmapResolution = image.value.bitmapResolution;
        costume[1].rotationCenterX = image.value.rotationCenterX;
        costume[1].rotationCenterY = image.value.rotationCenterY;
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        var costume = await new Costume(left.value.image, left.value.imageFormat);
        costume[1].name = name.value + "_Left";
        costume[1].bitmapResolution = left.value.bitmapResolution;
        costume[1].rotationCenterX = left.value.rotationCenterX;
        costume[1].rotationCenterY = left.value.rotationCenterY;
        Sprite.costumes[1] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "Chair"];
        Sprite.variables.material = ["Material", material.value];
        Sprite.variables.digSpeed = ["Dig Speed", digSpeed.value];
        Sprite.variables.light = ["Emits Light?", light.checked];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(new Text({ "innerText": "Item Sprite" }, { "color": "#fff", "font-size": "1.5em" }));
    Editor.appendChild(image);
    Editor.appendChild(left);
    Editor.appendChild(name);
    Editor.appendChild(material);
    Editor.appendChild(digSpeed);
    Editor.appendChild(new Br);
    Editor.appendChild(light);
    Editor.appendChild(new Text({ "innerText": "Emits Light?" }, { "color": "#fff", "font-size": "0.75em" }));
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}
function SelectWorldGenMod(ID, Name, Xml) {
    Editor.innerHTML = "";
    Editor.appendChild(new Text({ "innerText": "Add World Gen" }, { "color": "#fff", "font-size": "3em" }));
    Editor.appendChild(new Br);
    const name = new StringInput("Name", "World Gen ID", "World Gen ID", Name ? Name : "My New Script");
    const xml = new CodeEditor("World Generation Code", "Scripts that Execute at the End of World Generation", defaultToolbox["World Gen"], Xml ? Xml : defaultWorkspace["World Gen"]);
    const cancel = new Button({ "innerText": "Cancel" });
    cancel.onclick = async () => {
        Editor.hidden = true;
        Mod.hidden = false;
    };
    const finish = new Button({ "innerText": "Finish" });
    finish.onclick = async () => {
        UnsavedChanges = true;
        const Sprite = ProjectData.Sprite;
        Sprite.name = name.value;
        const costume = await new Costume(assets.worldGen);
        Sprite.costumes[0] = costume[1];
        ProjectData.costumes[costume[0].ID] = costume[0];
        Sprite.variables.type = ["Type", "World Gen"];
        Sprite.variables.xml = ["Xml", xml.value];
        if (ID) ProjectData.json.targets[ID] = Sprite;
        else ProjectData.json.targets.push(Sprite);
        Editor.hidden = true;
        AddItemElements();
        Mod.hidden = false;
    };
    Editor.appendChild(name);
    Editor.appendChild(xml);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
    Editor.appendChild(cancel);
    Editor.appendChild(finish);
    Editor.appendChild(new Br);
    Editor.appendChild(new Br);
}