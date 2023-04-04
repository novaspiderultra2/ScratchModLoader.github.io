window.getProjectData = () => new Promise(async (resolve, reject) => {
    const token = (await (await fetch("https://trampoline.turbowarp.org/proxy/projects/767890722")).json()).project_token;
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        resolve(xhr.response);
    };
    xhr.onerror = () => {
        if (location.protocol === 'file:') {
            reject(new Error('Zip environment must be used from a website, not from a file URL.'));
        } else {
            reject(new Error('Request to load project data failed.'));
        }
    };
    xhr.onprogress = (e) => {
        if (e.lengthComputable) {
            setProgress(0.1 + (e.loaded / e.total) * 0.1);
        }
    };
    xhr.responseType = 'arraybuffer';
    xhr.open("GET", `https://projects.scratch.mit.edu/767890722?token=${token}`);
    xhr.send();
});