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
        resolve();
    });
}