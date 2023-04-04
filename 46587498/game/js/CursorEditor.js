(() => {
    const style = document.createElement("style");
    const CursorDraw = document.createElement("canvas");
    const cursorOutline = document.createElement("img");
    const CursorDisplay = document.getElementById("CursorDisplay");
    var ctxCursorDraw;
    var CanvasBaseCursor;
    var ctxBaseCursor;
    var ctxDisplay;
    style.id = "CursorEditor";
    style.innerText = "#ColorHue{-webkit-appearance:none !important;height:7px;border-radius:5px}#ColorHue::-webkit-slider-thumb{-webkit-appearance:none !important;height:12px;width:12px;border-radius:50%}#ColorSaturation{-webkit-appearance:none !important;height:7px;border-radius:5px}#ColorSaturation::-webkit-slider-thumb{-webkit-appearance:none !important;height:12px;width:12px;border-radius:50%}#ColorLight{-webkit-appearance:none !important;height:7px;border-radius:5px}#ColorLight::-webkit-slider-thumb{-webkit-appearance:none !important;height:12px;width:12px;border-radius:50%}*{cursor:var(--Cursor) !important}.CursorEditor{z-index:99999} :root{--Cursor: auto}";
    document.head.appendChild(style);
    document.querySelectorAll(".CursorEditor").forEach((A) => A.hidden = true);
    const BaseCursor = document.createElement("img");
    BaseCursor.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAXUlEQVR4nK2SwQ3AMAgDr1InYhcYkmHYgFnSVyoVJY+o+GnJOhuBuw93HxzqPg28QTO7ACp1+v3EaogIqwa1yX9i3aqqAGQmABHxadK3caqS6pX7iTtSP3H3SW3EB3xKKjZdpnf2AAAAAElFTkSuQmCC";
    BaseCursor.crossOrigin = "anonymous";
    BaseCursor.onload = () => {
        CursorDraw.width = BaseCursor.width;
        CursorDraw.height = BaseCursor.height;
        ctxCursorDraw = CursorDraw.getContext("2d");
        CanvasBaseCursor = document.createElement("canvas");
        CanvasBaseCursor.width = BaseCursor.width;
        CanvasBaseCursor.height = BaseCursor.height;
        ctxBaseCursor = CanvasBaseCursor.getContext("2d");
        ctxBaseCursor.drawImage(BaseCursor, 0, 0);
        Object.defineProperty(this, "BaseCursorData", { get: function () { return ctxBaseCursor.getImageData(0, 0, BaseCursor.width, BaseCursor.height); } });
        cursorOutline.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAVUlEQVR4nMWUwQoAIAhDG/T/v1ynXQxZmdaOguvxhNowacH06KIsslQA8JaIL3p+vLklrXO0G5KSLJ9IuVJk/x0xdY5OCa6LvCxF0evVO7Jk6hdII5phNzA9DruqgwAAAABJRU5ErkJggg==";
        cursorOutline.crossOrigin = "anonymous";
        cursorOutline.onload = () => {
            CursorDisplay.width = cursorOutline.width;
            CursorDisplay.height = cursorOutline.height;
            CursorDisplay.style.width = "129px";
            ctxDisplay = CursorDisplay.getContext("2d");
            ctxDisplay.drawImage(cursorOutline, 0, 0);
            CursorHSL();
        }
    }
    const Hue = document.getElementById("ColorHue");
    const Saturation = document.getElementById("ColorSaturation");
    const Light = document.getElementById("ColorLight");
    Hue.addEventListener("input", () => { CursorHSL() });
    Saturation.addEventListener("input", () => { CursorHSL() });
    Light.addEventListener("input", () => { CursorHSL() });
    document.getElementById("CursorEditorSaveButton").addEventListener("click", () => document.querySelectorAll(".CursorEditor").forEach((A) => A.hidden = true));

    function CursorHSL(H = Hue.value, S = Saturation.value, L = Light.value) {
        const StyleSheet = document.getElementById("CursorEditor").sheet;
        var i;
        var HueGradient = "linear-gradient(to right";
        for (i = 0; i < 361; i++) {
            HueGradient += ", hsl(" + i + "," + S + "%," + (L / 2 + 50) * 0.75 + "%)";
        }
        HueGradient += ")";
        var LightGradient = "linear-gradient(to right";
        for (i = 0; i < 101; i++) {
            LightGradient += ", hsl(" + H + "," + S + "%," + i + "%)";
        }
        LightGradient += ")";
        StyleSheet.cssRules[0].style["background-image"] = HueGradient;
        StyleSheet.cssRules[2].style["background-image"] = "linear-gradient(to right,hsl(" + H + ",0%," + (L / 2 + 50) * 0.75 + "%),hsl(" + H + ",100%," + (L / 2 + 50) * 0.75 + "%))"
        StyleSheet.cssRules[4].style["background-image"] = LightGradient;
        StyleSheet.cssRules[1].style["background-color"] = "hsl(" + H + "," + S + "%," + (L / 2 + 50) + "%)";
        StyleSheet.cssRules[3].style["background-color"] = "hsl(" + H + "," + S + "%," + (L / 2 + 50) + "%)";
        StyleSheet.cssRules[5].style["background-color"] = "hsl(" + H + "," + S + "%," + (L / 2 + 50) + "%)";
        const CursorData = BaseCursorData;
        const colorData = hsl2rgb(H, S / 100, (L / 2 + 50) / 100);
        for (i = 0; i < CursorData.data.length; i += 4) {
            CursorData.data[i] *= colorData[0];
            CursorData.data[i + 1] *= colorData[1];
            CursorData.data[i + 2] *= colorData[2];
        }
        ctxCursorDraw.putImageData(CursorData, 0, 0);
        const InnerCursor = document.createElement("img");
        InnerCursor.src = CursorDraw.toDataURL();
        InnerCursor.onload = () => {
            ctxDisplay.drawImage(InnerCursor, 2, 2);
            StyleSheet.cssRules[8].style.setProperty("--Cursor", "url(" + CursorDisplay.toDataURL() + "), auto", "important");
        }
    }

    var Rainbow = null;
    CursorDisplay.addEventListener("click", (event) => {
        if (event.detail == 3) {
            if (Rainbow == null) {
                Rainbow = setInterval(() => {
                    CursorHSL(Math.round(Date.now() / 10) % 360, 100, 0);
                });
            }
            else {
                clearInterval(Rainbow);
                Rainbow = null;
            }
        }
    });

    //https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion/64090995#64090995
    function hsl2rgb(h, s, l) {
        let a = s * Math.min(l, 1 - l);
        let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return [f(0), f(8), f(4)];
    }
    //https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion/64090995#64090995


    //https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/54071699#54071699
    function rgb2hsl(r, g, b) {
        let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = (1 - Math.abs(v + v - c - 1));
        let h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c));
        return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
    }
    //https://stackoverflow.com/questions/2348597/why-doesnt-this-javascript-rgb-to-hsl-code-work/54071699#54071699
})();