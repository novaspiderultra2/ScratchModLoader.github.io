function addInfoSprite() {
    return new Promise(async resolve => {
        const costume = await new Costume("data:image/svg+xml," + encodeURIComponent(await genChangeLog()), "svg");
        const info = ProjectData.json.targets.find(e => e.variables.type && e.variables.type[1] == "info");
        info.costumes.pop();
        costume[1].name = "Changelog";
        costume[1].rotationCenterX = 235;
        costume[1].rotationCenterY = 175;
        info.costumes.push(costume[1]);
        ProjectData.costumes[costume[0].ID] = costume[0];
        for (let md5 of ["a495179c2afaf32be5b6d6663322addf.svg","313a2f6dc464184effee4d00886e4f3b.svg","260d068183f55d13b6f5185d6da5ed8c.svg","a20339b99d60b9e6de994679d535778f.svg","555955d07859d7c019b3558ad5726ba4.svg","bedf600df89a6aaee9b2082192d669f3.svg","856fba7b72c7fe607ab3b8c6829cb827.svg","3fc0af6a7d697f38974c4214e5007a62.svg","243fc68b8b881712bb459c38eba93cb6.svg","4ec293ab68468a2f8386cbc748dde992.svg","271ab44e58b74d226a0a0b1284e453e0.svg","404b4c99837e516c3fdf192ecf7e2882.svg","d84da8cac08855d336ff9d5254684728.svg","dfc6671bc25135869fb5f9e24258d188.svg","77dcbe1b8a6d220dc633a1f38bceeaba.svg","b842b50262c27485367102cbfd4577ef.svg"]) sb3.file(md5, await (await fetch(`https://cdn.assets.scratch.mit.edu/internalapi/asset/${md5}/get/`)).blob());    
    });
}
function genChangeLog() {
    return new Promise(async resolve => {
        const changelogData = {
            items: [],
            blocks: [],
            tools: [],
            masks: [],
            npcs: [],
            recipes: [],
            npcDrops: [],
            worldGen: false,
            javaScript: false
        }
        for (var i = 1; i < ProjectData.json.targets.length; i++) {
            const target = ProjectData.json.targets[i];
            const type = target.variables.type[1];
            if (type == "Other") {
                changelogData.items.push({
                    name: target.name,
                    icon: ProjectData.costumes[target.costumes[0].assetId].dataURL
                });
            } else if (["Block", "Object 1x1", "Object 2x2", "Object 1x2", "Object 2x1", "Door", "Beam", "Fence", "Platform", "Torch", "Chain", "Table", "Chair"].indexOf(type) > -1) {
                changelogData.blocks.push({
                    name: target.name,
                    icon: ProjectData.costumes[target.costumes[0].assetId].dataURL
                });
            } else if (["Pickaxe", "Axe", "Sword", "Staff"].indexOf(type) > -1) {
                changelogData.tools.push({
                    name: target.name,
                    icon: ProjectData.costumes[target.costumes[0].assetId].dataURL
                });
            } else if (type == "Mask") {
                changelogData.masks.push({
                    name: target.name,
                    icon: ProjectData.costumes[target.costumes[0].assetId].dataURL
                });
            } else if (type == "NPC") {
                changelogData.masks.push({
                    name: target.name,
                    icon: ProjectData.costumes[target.costumes[0].assetId].dataURL
                });
            } else if (type == "Recipe") {
                changelogData.recipes.push(target.variables["item"][1]);
            } else if (type == "NPC Drop") {
                changelogData.npcDrops.push({
                    item: target.variables["item"][1],
                    npc: target.variables["npc"][1]
                });
            } else if (type == "World Gen") {
                changelogData.worldGen = true;
            } else if (type == "JavaScript") {
                changelogData.worldGen = true;
            }
        }
        const text = [];
        const images = [];
        function addText(string, y) {
            text.push(`<text xmlns="http://www.w3.org/2000/svg" transform="translate(6,${y+1}) scale(0.5,0.5)" font-size="40" xml:space="preserve" fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="Scratch" font-weight="normal" text-anchor="start" style="mix-blend-mode: normal"><tspan x="0" dy="0">${string}</tspan></text>`);
            text.push(`<text xmlns="http://www.w3.org/2000/svg" transform="translate(5,${y}) scale(0.5,0.5)" font-size="40" xml:space="preserve" fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="Scratch" font-weight="normal" text-anchor="start" style="mix-blend-mode: normal"><tspan x="0" dy="0">${string}</tspan></text>`);
            offset += 22;
        }
        function addIcon(icon, y) {
            return new Promise(async (resolve, reject) => {
                let img = new Image();
                await new Promise(e => {
                    img.src = icon;
                    img.onload = e;
                });
                const scale = 16/Math.max(img.width, img.height);
                images.push(`<image x="0" y="0" transform="translate(${16-img.width*scale/2},${y-22+16-img.height*scale/2}) scale(${scale},${scale}) " width="${img.width}" height="${img.height}" xlink:href="${icon}" fill="none" stroke-width="0.5" />`);
                resolve();
            });
        }
        var offset = 22;
        if (changelogData.blocks.length > 0) {
            addText("Added Blocks:", offset);
            for (let {name, icon} of changelogData.blocks) {
                await addIcon(icon, offset);
                addText("  " + name, offset);
            }
            offset += 22;
        }
        if (changelogData.items.length > 0) {
            addText("Added Items:", offset);
            for (let {name, icon} of changelogData.items) {
                await addIcon(icon, offset);
                addText("  " + name, offset);
            }
            offset += 22;
        }
        if (changelogData.tools.length > 0) {
            addText("Added Tools:", offset);
            for (let {name, icon} of changelogData.tools) {
                await addIcon(icon, offset);
                addText("  " + name, offset);
            }
            offset += 22;
        }
        if (changelogData.masks.length > 0) {
            addText("Added Masks:", offset);
            for (let {name, icon} of changelogData.masks) {
                await addIcon(icon, offset);
                addText("  " + name, offset);
            }
            offset += 22;
        }
        if (changelogData.npcs.length > 0) {
            addText("Added NPCs:", offset);
            for (let {name, icon} of changelogData.npcs) {
                await addIcon(icon, offset);
                addText("  " + name, offset);
            }
            offset += 22;
        }
        if (changelogData.recipes.length > 0) {
            addText("Added Recipes:", offset);
            for (let item of changelogData.recipes) {
                console.log(item);
                if (isNaN(item) || parseInt(item) > 300) {
                    await addIcon(ProjectData.costumes[ProjectData.json.targets.find(target => target.name == item).costumes[0].assetId].dataURL, offset);
                    addText("  " + item, offset);
                } else {
                    await addIcon(await getTileIcon(parseInt(item)-1), offset);
                    addText("  " + ModItems[parseInt(item)-1], offset);
                }
            }
            offset += 22;
        }
        if (changelogData.npcDrops.length > 0) {
            addText("Added Drops:", offset);
            for (let {item, npc} of changelogData.npcDrops) {
                if (!isNaN(npc) && parseInt(npc) < 25) npc = NPCs[parseInt(npc) - 1];
                if (isNaN(item) || parseInt(item) > 300) {
                    await addIcon(ProjectData.costumes[ProjectData.json.targets.find(target => target.name == item).costumes[0].assetId].dataURL, offset);
                    addText(`  ${item} from ${npc}`, offset);
                } else {
                    await addIcon(await getTileIcon(parseInt(item)-1), offset);
                    addText(`  ${ModItems[parseInt(item)-1]} from ${npc}`, offset);
                }
            }
            offset += 22;
        }
        if (changelogData.worldGen) addText("Includes Custom World Gen", offset);
        if (changelogData.javaScript) addText("Includes Custom JavaScript", offset);
        offset += 22;
        resolve(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="480" height="${offset}" viewBox="0,0,480,${offset}"> <g transform="translate(-4.5,-9.58333)"> <g data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill-rule="nonzero" stroke="none" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal">${[...text, ...images].join(" ")}</g></g></svg><!--rotationCenter:235:180-->`);
    });
}