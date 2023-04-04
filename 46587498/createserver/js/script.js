window.Project = {
    json: {},
    assets: [],
    zip: {}
}
const LoadingTitle = document.getElementById('LoadingTitle');
const LoadingDiv = document.getElementById('LoadingDiv');
const LoadingStatus = document.getElementById('LoadingStatus');
const LoadingPercent = document.getElementById('LoadingPercent');
var LoadingStatusText = 'Insert Status Here';
setInterval(() => {
    LoadingTitle.innerText = 'Loading.'
    LoadingStatus.innerText = LoadingStatusText + '.';
    setTimeout(() => {
        LoadingTitle.innerText = 'Loading..'
        LoadingStatus.innerText = LoadingStatusText + '..';
    }, 1000);
    setTimeout(() => {
        LoadingTitle.innerText = 'Loading...'
        LoadingStatus.innerText = LoadingStatusText + '...';
    }, 2000);
}, 3000);
const Select = {
    'createServer': {
        'openMenu': () => {
            document.getElementById('Menu').hidden = true;
            document.getElementById('ServerCreator').hidden = false;
        },
        'create': async () => {
            document.getElementById('ServerCreator').hidden = true;
            LoadingDiv.hidden = false;
            LoadingStatusText = 'Creating project.json';
            const zip = new JSZip();
            var md5text = md5('<svg version="1.1" width="2" height="2" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>');
            zip.file(md5text + '.svg', '<svg version="1.1" width="2" height="2" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>');
            const Project = {
                "targets": [
                    {
                        "isStage": true,
                        "name": "Stage",
                        "variables": {
                            "serverFor": [
                                "Server For",
                                "Scratcharia Mod Loader"
                            ],
                            "name": [
                                "Name",
                                document.getElementById('name').value
                            ],
                            "security": [
                                "Security",
                                (document.getElementById('Security').innerText[0] == '☑')
                            ],
                            "chatFilter": [
                                "Chat Filter",
                                (document.getElementById('ChatFilter').innerText[0] == '☑')
                            ],
                            "allowTexture": [
                                "Allow Texture Pack Loading",
                                (document.getElementById('AllowTexture').innerText[0] == '☑')
                            ],
                            "allowMod": [
                                "Allow Mod Loading",
                                (document.getElementById('AllowMod').innerText[0] == '☑')
                            ],
                            "private": [
                                "Private Server",
                                (document.getElementById('Private').innerText[0] == '☑')
                            ],
                            "cloud-server": [
                                "Cloud Server",
                                document.getElementById('server').value
                            ],
                            "maxPlayers": [
                                "Max Players",
                                document.getElementById('players').value
                            ],
                            "width": [
                                "Width",
                                document.getElementById('width').value
                            ],
                            "height": [
                                "Height",
                                document.getElementById('height').value
                            ]
                        },
                        "lists": {
                            "description": [
                                "Description",
                                document.getElementById('description').value.split('\n')
                            ],
                            "admin": [
                                "Admin",
                                []
                            ],
                            "ban": [
                                "Banned Users",
                                []
                            ],
                            "texture": [
                                "Texture Packs",
                                []
                            ],
                            "mod": [
                                "Mods",
                                []
                            ],
                            "allowedUsers": [
                                "Allowed Users",
                                []
                            ],
                            "filter": [
                                "Chat Filter",
                                []
                            ]
                        },
                        "broadcasts": {},
                        "blocks": {},
                        "comments": {
                            "Instructions": {
                                blockId: null,
                                height: 1000,
                                minimized: false,
                                text: "Server For Scratcharia Mod Loader\nhttps://scratch.mit.edu/projects/625560487/",
                                width: 1000,
                                x: 0,
                                y: 0
                            }
                        },
                        "currentCostume": 0,
                        "costumes": [
                            {
                                "assetId": md5text,
                                "bitmapResolution": 1,
                                "dataFormat": "svg",
                                "md5ext": md5text + ".svg",
                                "name": 'Icon',
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
                    "agent": ""
                }
            };
            [...document.getElementById('AdminList').children].forEach((Element) => {
                Project.targets[0].lists.admin[1].push(Element.children[0].value);
            });
            [...document.getElementById('BanList').children].forEach((Element) => {
                Project.targets[0].lists.ban[1].push(Element.children[0].value);
            });
            [...document.getElementById('TexturePackList').children].forEach((Element) => {
                Project.targets[0].lists.texture[1].push(Element.children[0].value);
            });
            [...document.getElementById('ModList').children].forEach((Element) => {
                Project.targets[0].lists.mod[1].push(Element.children[0].value);
            });
            [...document.getElementById('AllowedUsersList').children].forEach((Element) => {
                Project.targets[0].lists.allowedUsers[1].push(Element.children[0].value);
            });
            [...document.getElementById('FilterList').children].forEach((Element) => {
                Project.targets[0].lists.filter[1].push(Element.children[0].value);
            });
            LoadingStatusText = 'Zipping Files';
            zip.file('project.json', JSON.stringify(Project));
            zip.generateAsync({ type: "blob" }, (A) => {
                LoadingPercent.innerText = A.percent + '%';
            }).then(async (A) => {
                const download = document.getElementById('FinishedDownload');
                download.href = await blobToDataUrl(A);
                if (document.getElementById('name').value != "") {
                    download.download = document.getElementById('name').value + '.sb3';
                }
                else {
                    download.download = 'Server.sb3';
                }
                LoadingDiv.hidden = true;
                document.getElementById('Download').hidden = false;
                download.click();
            });
        }
    },
    "editServer": () => {
        const upload = document.createElement("input");
        upload.type = "file";
        upload.accept = ".sb3";
        upload.onchange = async () => {
            const zip = await JSZip.loadAsync(upload.files[0]);
            const project = JSON.parse(await zip.file("project.json").async("string")).targets[0];
            console.log(project);
            document.getElementById("Create/Edit").innerText = "Edit Server";
            if ("name" in project.variables) document.getElementById("name").value = project.variables.name[1];
            if ("description" in project.lists) document.getElementById("description").value = project.lists.description[1].join("\n");
            if ("admin" in project.lists) project.lists.admin[1].forEach((value) => {
                const listItem = new ListItem("Username");
                listItem.children[0].value = value;
                document.getElementById("AdminList").appendChild(listItem);
            });
            if ("ban" in project.lists) project.lists.ban[1].forEach((value) => {
                const listItem = new ListItem("Username");
                listItem.children[0].value = value;
                document.getElementById("BanList").appendChild(listItem);
            });
            if ("texture" in project.lists) project.lists.texture[1].forEach((value) => {
                const listItem = new ListItem("Project ID");
                listItem.children[0].value = value;
                document.getElementById("TexturePackList").appendChild(listItem);
            });
            if ("mod" in project.lists) project.lists.mod[1].forEach((value) => {
                const listItem = new ListItem("Project ID");
                listItem.children[0].value = value;
                document.getElementById("ModList").appendChild(listItem);
            });
            if ("filter" in project.lists) project.lists.filter[1].forEach((value) => {
                const listItem = new ListItem("Word");
                listItem.children[0].value = value;
                document.getElementById("FilterList").appendChild(listItem);
            });
            if ("allowedUsers" in project.lists) project.lists.allowedUsers[1].forEach((value) => {
                const listItem = new ListItem("Username");
                listItem.children[0].value = value;
                document.getElementById("AllowedUsersList").appendChild(listItem);
            });
            if ("private" in project.variables) document.getElementById("Private").innerText = project.variables.private[1] ? "☑ Private Server" : "☐ Private Server";
            if ("security" in project.variables) document.getElementById("Security").innerText = project.variables.security[1] ? "☑ Require Login" : "☐ Require Login";
            if ("chatFilter" in project.variables) document.getElementById("ChatFilter").innerText = project.variables.chatFilter[1] ? "☑ Chat Filter" : "☐ Chat Filter";
            if ("allowMod" in project.variables) document.getElementById("AllowTexture").innerText = project.variables.allowTexture[1] ? "☑ Allow Texture Pack Loading" : "☐ Allow Texture Pack Loading";
            if ("allowTexture" in project.variables) document.getElementById("AllowMod").innerText = project.variables.allowMod[1] ? "☑ Allow Mod Loading" : "☐ Allow Mod Loading";
            if ("cloud-server" in project.variables) document.getElementById("server").value = project.variables["cloud-server"][1];
            if ("maxPlayers" in project.variables) document.getElementById("players").value = project.variables.maxPlayers[1];
            if ("width" in project.variables) document.getElementById("width").value = project.variables.width[1];
            if ("height" in project.variables) document.getElementById("height").value = project.variables.height[1];
            document.getElementById('Menu').hidden = true;
            document.getElementById('ServerCreator').hidden = false;
        }
        upload.click();
    },
    'updateWorldSize': () => {
        let size = document.querySelector("#width").value;
        size *= document.querySelector("#height").value;
        if (size > 60000) document.querySelector("#warning").hidden = false;
        else document.querySelector("#warning").hidden = true;
        document.querySelector("#size").innerText = `Blocks: ${size}`;
    }
}
document.getElementById('CreateServer').addEventListener('click', Select.createServer.openMenu);
document.getElementById('AddAdmin').addEventListener('click', () => document.getElementById('AdminList').appendChild(new ListItem("Username")));
document.getElementById('AddBan').addEventListener('click', () => document.getElementById('BanList').appendChild(new ListItem("Username")));
document.getElementById('AddTexturePack').addEventListener('click', () => document.getElementById('TexturePackList').appendChild(new ListItem("Project ID")));
document.getElementById('AddMod').addEventListener('click', () => document.getElementById('ModList').appendChild(new ListItem("Project ID")));
document.getElementById('AddAllowedUser').addEventListener('click', () => document.getElementById('AllowedUsersList').appendChild(new ListItem("Username")));
document.getElementById('AddFilter').addEventListener('click', () => document.getElementById('FilterList').appendChild(new ListItem("Word")));
document.getElementById('Create').addEventListener('click', Select.createServer.create);
document.getElementById('EditServer').addEventListener('click', Select.editServer);
document.getElementById('width').addEventListener('input', Select.updateWorldSize);
document.getElementById('height').addEventListener('input', Select.updateWorldSize);
[...document.getElementsByClassName("Toggle")].forEach((Element) => {
    Element.addEventListener('click', (A) => {
        const newText = A.target.innerText.split("");
        newText[0] = (newText[0] == "☐") ? "☑" : "☐";
        A.target.innerText = newText.join("");
        if (Element.id == "Private") document.getElementById("AllowedUsers").hidden = (newText[0] == "☐");
    });
});
function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const Reader = new FileReader();
        Reader.readAsDataURL(blob);
        Reader.onload = (A) => {
            resolve(Reader.result);
        }
    });
}
function blobToJSON(blob) {
    return new Promise((resolve, reject) => {
        const Reader = new FileReader();
        Reader.readAsText(blob);
        Reader.onload = () => {
            resolve(JSON.parse(Reader.result));
        }
    });
}
function ListItem(type) {
    const listitem = document.createElement('listitem');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = type;
    if (type == "Project ID") {
        input.oninput = () => {
            var newValue = '';
            input.value.split('').forEach((char) => {
                if (!isNaN(char)) newValue += parseInt(char);
            });
            input.value = newValue;
        }
    }
    else if (type == "Username") {
        const AllowedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"
        input.oninput = () => {
            var newValue = '';
            input.value.split('').forEach((char) => {
                if (AllowedCharacters.includes(char)) newValue += char;
            });
            input.value = newValue;
        }
    }
    const image = document.createElement('img');
    image.src = 'https://cdn.assets.scratch.mit.edu/internalapi/asset/710a6ef1048f968401b16a6b9eb07773.png/get/';
    image.onclick = () => {
        listitem.remove();
    }
    listitem.appendChild(input);
    listitem.appendChild(image);
    return listitem;
}