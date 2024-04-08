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