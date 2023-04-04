window.appElement = document.getElementById('app');
window.launchScreen = document.getElementById('launch');
window.loadingScreen = document.getElementById('loading');
window.loadingInner = document.getElementById('loading-inner');
window.errorScreen = document.getElementById('error');
window.errorScreenMessage = document.getElementById('error-message');
window.errorScreenStack = document.getElementById('error-stack');

window.handleError = (error) => {
    console.error(error);
    if (!errorScreen.hidden) return;
    errorScreen.hidden = false;
    errorScreenMessage.textContent = '' + error;
    let debug = error && error.stack || 'no stack';
    debug += '\nUser agent: ' + navigator.userAgent;
    errorScreenStack.textContent = debug;
};
window.setProgress = (progress) => {
    if (loadingInner) loadingInner.style.width = progress * 100 + '%';
};
try {
    window.scaffolding = new Scaffolding.Scaffolding();
    scaffolding.setup();
    scaffolding.appendTo(appElement);

    window.scaffolding = scaffolding;
    window.vm = scaffolding.vm;

    const { storage, vm } = scaffolding;
    vm.setRuntimeOptions({ maxClones: Infinity });
    storage.addWebStore(
        [storage.AssetType.ImageVector, storage.AssetType.ImageBitmap, storage.AssetType.Sound],
        (asset) => new URL('https://cdn.assets.scratch.mit.edu/internalapi/asset/' + asset.assetId + '.' + asset.dataFormat + '/get/', location).href
    );
    storage.onprogress = (total, loaded) => {
        setProgress(0.2 + (loaded / total) * 0.78);
    };
    setProgress(0.1);

    scaffolding.setUsername("player####".replace(/#/g, () => Math.floor(Math.random() * 10)));
    fetch(`https://sml-ip.terrariamodsscr.repl.co/login?username=${vm.runtime.ioDevices.userData._username}`);
    scaffolding.setAccentColor("#00");

    scaffolding.addCloudProvider(new Scaffolding.Cloud.WebSocketProvider("wss://clouddata.turbowarp.org", "610832335"));

    window.greenFlagButton = document.createElement('img');
    greenFlagButton.src = 'https://assets.scratch.mit.edu/2e0c4790f8f9cf28e3c346b9cef0fcb6.svg';
    greenFlagButton.className = 'control-button';
    greenFlagButton.addEventListener('click', () => {
        scaffolding.greenFlag();
    });
    scaffolding.addEventListener('PROJECT_RUN_START', () => {
        greenFlagButton.classList.add('active');
    });
    scaffolding.addEventListener('PROJECT_RUN_STOP', () => {
        greenFlagButton.classList.remove('active');
    });
    scaffolding.addControlButton({
        element: greenFlagButton,
        where: 'top-left'
    });

    window.stopAllButton = document.createElement('img');
    stopAllButton.src = 'https://assets.scratch.mit.edu/36fcc7dbca20720abcab01e49d4955f9.svg';
    stopAllButton.className = 'control-button';
    stopAllButton.addEventListener('click', () => {
        scaffolding.stopAll();
    });
    scaffolding.addControlButton({
        element: stopAllButton,
        where: 'top-left'
    });

    window.recordedData = [];
    window.mediaRecorder = null;
    window.recordButton = document.createElement("img");
    recordButton.src = "https://assets.scratch.mit.edu/a4da835ac62b59c6b9a52343de87318c.svg";
    recordButton.className = "control-button";
    recordButton.addEventListener("click", () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            recordButton.src = "https://assets.scratch.mit.edu/a4da835ac62b59c6b9a52343de87318c.svg";
            mediaRecorder = null;
        } else {
            new RecordPopup(async (recorder, microphone, framerate) => {
                const stream = document.querySelector("canvas.sc-canvas").captureStream(framerate);
                const startRecorder = function () {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = (e) => {
                        recordedData.push(e.data);
                    }
                    mediaRecorder.onstop = event => {
                        const blob = new Blob(recordedData, { 'type': 'video/webm' });
                        recordedData = [];
                        const download = document.createElement("a");
                        download.href = URL.createObjectURL(blob);
                        download.download = "Recording.webm";
                        download.click();
                        URL.revokeObjectURL(blob);
                        download.remove();
                    }
                    mediaRecorder.start();
                    recordButton.src = "https://assets.scratch.mit.edu/e1606288ef3af8bcbd70943197f3d320.svg";
                }
                if (microphone) {
                    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((micStream) => {
                        stream.addTrack(micStream.getAudioTracks()[0]);
                        startRecorder();
                    }).catch(() => {
                        alert("Could Not Record Microphone\nReason: Permission Denied");
                        startRecorder();
                    });
                } else startRecorder();
            });
        }
    });
    scaffolding.addControlButton({
        element: recordButton,
        where: 'top-right'
    });

    if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
        window.isFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
        window.fullscreenButton = document.createElement('img');
        fullscreenButton.className = 'control-button fullscreen-button';
        fullscreenButton.addEventListener('click', () => {
            if (isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            } else {
                if (document.body.requestFullscreen) {
                    document.body.requestFullscreen();
                } else if (document.body.webkitRequestFullscreen) {
                    document.body.webkitRequestFullscreen();
                }
            }
        });
        window.updateFullScreen = () => {
            isFullScreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
            document.body.classList.toggle('is-fullscreen', isFullScreen);
            if (isFullScreen) {
                fullscreenButton.src = 'https://assets.scratch.mit.edu/dd55f4c6c20f5d25e520b6f5bfb090c5.svg';
            } else {
                fullscreenButton.src = 'https://assets.scratch.mit.edu/422b48c2206d5240a6717c92496ba21a.svg';
            }
        };
        updateFullScreen();
        document.addEventListener('fullscreenchange', updateFullScreen);
        document.addEventListener('webkitfullscreenchange', updateFullScreen);
        fullscreenButton.className = 'control-button fullscreen-button';
        scaffolding.addControlButton({
            element: fullscreenButton,
            where: 'top-right'
        });
    }
    if (vm.setRuntimeOptions) vm.setRuntimeOptions({
        fencing: false
    });
    if (typeof ScaffoldingAddons !== 'undefined') {
        ScaffoldingAddons.run(scaffolding, { "gamepad": true });
    }
} catch (e) {
    handleError(e);
}
const style = document.createElement('style');
style.innerText = '.HSVColorValue{background-color: #ff0000} .HueSlider { -webkit-appearance: none !important; height: 7px; border-radius: 5px; margin-top: 4; } .HueSlider::-webkit-slider-thumb { -webkit-appearance: none !important; height: 12px; width: 12px; border-radius: 50%; } .SaturationSlider { -webkit-appearance: none !important; height: 7px; border-radius: 5px;  margin-top: 4; } .SaturationSlider::-webkit-slider-thumb { -webkit-appearance: none !important; height: 12px; width: 12px; border-radius: 50%; } .ValueSlider { -webkit-appearance: none !important; height: 7px; border-radius: 5px;  margin-top: 4; } .ValueSlider::-webkit-slider-thumb { -webkit-appearance: none !important; height: 12px; width: 12px; border-radius: 50%; }';
document.head.appendChild(style);
const StyleSheet = style.sheet;
const oldMonitorUpdate = vm._events.MONITORS_UPDATE;
vm._events.MONITORS_UPDATE = (monitors) => {
    const NewMonitors = [];
    const EditedMonitors = [];
    for (const monitorData of monitors.valueSeq()) {
        const id = monitorData.get('id');
        if (!scaffolding._monitors.has(id)) {
            const visible = monitorData.get('visible');
            if (visible) {
                NewMonitors.push(id);
            }
        } else {
            const visible = monitorData.get('visible');
            if (visible) {
                EditedMonitors.push(id);
            }
        }
    }
    oldMonitorUpdate(monitors);
    NewMonitors.forEach((ID) => {
        const Monitor = scaffolding._monitors.get(ID);
        if (Monitor.params.VARIABLE == 'Hue') {
            Monitor.slider.classList.add('HueSlider');
            Monitor.valueElement.classList.add('HSVColorValue');
            Monitor.sliderRow.appendChild(document.createElement('br'));
            ChangeColor(vm.runtime.targets[0].lookupVariableByNameAndType('Hue', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Saturation', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Value', '').value);
        } else if (Monitor.params.VARIABLE == 'Saturation') {
            Monitor.slider.classList.add('SaturationSlider');
            Monitor.valueElement.classList.add('HSVColorValue');
            Monitor.sliderRow.appendChild(document.createElement('br'));
            ChangeColor(vm.runtime.targets[0].lookupVariableByNameAndType('Hue', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Saturation', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Value', '').value);
        } else if (Monitor.params.VARIABLE == 'Value') {
            Monitor.slider.classList.add('ValueSlider');
            Monitor.valueElement.classList.add('HSVColorValue');
            Monitor.sliderRow.appendChild(document.createElement('br'));
            ChangeColor(vm.runtime.targets[0].lookupVariableByNameAndType('Hue', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Saturation', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Value', '').value);
        }
    });
    EditedMonitors.forEach((ID) => {
        const Monitor = scaffolding._monitors.get(ID);
        if (Monitor.params.VARIABLE == 'Hue' || Monitor.params.VARIABLE == 'Saturation' || Monitor.params.VARIABLE == 'Value') {
            ChangeColor(vm.runtime.targets[0].lookupVariableByNameAndType('Hue', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Saturation', '').value, vm.runtime.targets[0].lookupVariableByNameAndType('Value', '').value);
        }
    });
}
ChangeColor(0, 0, 0);
function ChangeColor(Hue, Saturation, Value) {
    // input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
    //https://stackoverflow.com/a/54024653/860099
    function hsv2rgb(h, s, v) {
        let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
        return [f(5), f(3), f(1)];
    }
    let rgb = hsv2rgb((Hue / 200) * 360, (Saturation + 100) / 100, (Value + 100) / 100);
    rgb = 'rgb(' + rgb[0] * 255 + ',' + rgb[1] * 255 + ',' + rgb[2] * 255 + ')';
    StyleSheet.cssRules[0].style.setProperty('background-color', rgb, 'important');
    const HueSliderColors = [];
    for (var i = 0; i < 200; i++) {
        HueSliderColors[i] = hsv2rgb((i / 200) * 360, (Saturation + 100) / 100, (Value + 100) / 100);
        HueSliderColors[i] = 'rgb(' + HueSliderColors[i][0] * 255 + ',' + HueSliderColors[i][1] * 255 + ',' + HueSliderColors[i][2] * 255 + ')';
    }
    StyleSheet.cssRules[1].style['background-image'] = "linear-gradient(to right, " + HueSliderColors.join() + ")";
    let saturationrgb = hsv2rgb(0, 0, (Value + 100) / 100);
    saturationrgb = 'rgb(' + saturationrgb[0] * 255 + ',' + saturationrgb[1] * 255 + ',' + saturationrgb[2] * 255 + ')';
    let colorrgb = hsv2rgb((Hue / 200) * 360, 1, (Value + 100) / 100);
    colorrgb = 'rgb(' + colorrgb[0] * 255 + ',' + colorrgb[1] * 255 + ',' + colorrgb[2] * 255 + ')';
    StyleSheet.cssRules[3].style['background-image'] = "linear-gradient(to right, " + saturationrgb + ", " + colorrgb + ")";
    StyleSheet.cssRules[5].style['background-image'] = "linear-gradient(to right, #000000, " + rgb + ")";
    StyleSheet.cssRules[2].style['background-color'] = rgb;
    StyleSheet.cssRules[4].style['background-color'] = rgb;
    StyleSheet.cssRules[6].style['background-color'] = rgb;
}