(() => {
    const YouTube = new Image();
    YouTube.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAZiS0dEAP8A/wD/oL2nkwAAAg9JREFUaIHtmbFO21AUhj9f0pJCp5aZtgNShwoiMbQjArG0iLdAYkW8CWLqXB4CKQOwMKEC6hBLDKbKSJkSEhorfwdftyUVIa2v7bjyJx0dXV/p3P/oHOtax1BSUlJSkgDvvg3BG6AKzAA14DXwGKhYe2TXk9ZXB/aNNYC+tdDad6Br/a31vYH9BnAKXAFdD76MlJFgTxAINGYWCPaGCZ8XhGMg9CHrCebvtJCiNrkEpkYqU/60gRcefIt79CPFEQ8wTaT5ZwVa9mGRaHvw1Ag+UDzxANOC9wZ4nreSBMwY4FXeKhLw0gCLeatIwKIBnjgLd3EBm5vOwo3AFIIDZ5dMpyNJ0vm5tLycxaV2gODYWcBWS3eo19NO4NhtCw2ysgJhCLu7aZ1QReCnVoHfabel7W3XFfCRyy/PYQnE+L60vu4qgQBBM9MEYo6OpIWFpGc2zcNtlhL9fiQhKZm3UKMhra05baFsXuJWS9raciU8Nh/BaaoJhKG0s+NaeGyfK0AneSPeQ70Oq6uphQe6hmgq4IaJicifncHSUtriAW4N0TjDDc0mbGxArQaHh87CDqFXAW6chZubcxZqRG4McJL1qQ45MUCQt4oEBIZodFdUroo/VrGL/Vyl/Bv78Guw9Qz4SnGq0AZmPbg2AB5cA++IRtvjTgi8tZr/ROM7Xr8UfBrU+//94CgpKSkp+Rt+ADJByy/wftj9AAAAAElFTkSuQmCC";
    const Tree = new Image();
    Tree.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAA40lEQVQ4ja2TPQ/BUBSGnyIWgwSxi0qaWiwGHzHa/AT/wU/pbPVDLD4GIhLRdNCIkSKxkBCp4fY2NAbRnu2cvPc8973nXIVAJKsZN1gDuM/Oynse+yb6JfwukpTr1QDIN4sAHEY2AEdj+kH+m5gIFiRp31+IK+nprwejI0pPkuSal2iJSrBQr+guQLdRAGAw3gKw1p4A3GwnHNH36G/MQ+SaqgrSaQNAqiPymxGWKEnZti4IngdrI0hlKw7A3I5qc2SHa9Fx3wk0PoWR/Q7/VSVJzm+42gHQKmU8hZjvZGmG8/gC7i5HV6EdCGMAAAAASUVORK5CYII=";
    const Mod = new Image();
    Mod.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAALNSURBVEhL7ZVLaFNREIYnaWOrjY1Ba00WWhOtD6gQkbjwWQTX4mshFGm3LgSxiyBiREVBEFzo0qKCG1HctlSkZKEGMaSVio+kFmxMUmtMLZpSMPaf3Amn13t7Yy3ioh8c5jznPzNnckMLVIrPt6WIpg3/DRCM9PVym6u4XbOm6COT/lDqEzd1Duj3m2HTrCFwcLvrGvePt59ii7EICmu9nhnrAONkst/Uv6XwuYunyWazsXMR7HrUw1ZoP7CfrbonfObq3IUBxMOXOrkvgoPrhsjRUEuOVUtpKv2N1j/18LxcwEoUVGnWEL3oq/eP6XPQRlWHV9OiSTtNblhMxaY6yqaHKRN9SalskQIb/bR33w6KxxLhXC5zng8bYFhcEFTfF6Kbgtu4j0hr3vxgUXtflvtLWhp4DXskKzgrfnhCx2/CIihFJKK17mW8PhZP0veBURZFqtPdcR4D7BFxnBU/RuKGEeOQFAkQUVDv9dJ4KlUSvfO8NI4ltdWZe/V+VAwLADfE2+qjBXdvhGiicfoCAR9fgDIFcmaI2k5c1nYQFXJf6XX0BRebWaFZfkD0oiAw4qI9kRydnPByXxUF6hkzLIUFiNa0bSZn53Z6V52n1pYmSmZy2uqfU7EwGOsZ5GJqrXNrMyVwKclGpRhWtfx28Uax7l7uI514S2d/gT7mf9JwNs/ziF4yIeI4U/6YTPuquKrfJhLcBEe9iy3E5T3XrHSRr9HN0UsmgOwFej8qplUNe6zjIDX7/VzdwSOHaGq8FOWz61dod/NyfmNEj6hBR+gmRe8/4GgheO/WQ543qupZv6e4gF4cRC6EqG2nj54MfGDhXWdLWdCLzvufxNEVX8pvjKhHPVu5X37XCv4kLCMWURW5gCCCKlbi1ZqdFfW9kHq9kLqOi5oVlEpFqYaV28tYMoHIgH79r1JtBpwjcmBVRPMOxCW6Bf5jiH4BCaqNAbzJmf8AAAAOZVhJZk1NACoAAAAIAAAAAAAAANJTkwAAAABJRU5ErkJggg==";
    const CustomEmojis = {
        "▶️": YouTube,
        "🌳": Tree,
        "⚙️": Mod
    }
    window.CanvasRenderingContext2D.prototype.originalFillText = CanvasRenderingContext2D.prototype.fillText;
    window.CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
        var renderText = [text];
        Object.keys(CustomEmojis).forEach(emojiToReplace => {
            for (var i = 0; i < renderText.length; i++) {
                if (typeof renderText[i] == "string") {
                    var newRenderText = [];
                    renderText.map((element, index) => {
                        if (index == i) renderText[i].split(emojiToReplace).map((element, index, array) => {
                            if (index + 1 == array.length) newRenderText.push(element);
                            else newRenderText.push(element, [emojiToReplace, CustomEmojis[emojiToReplace]]);
                        });
                        else newRenderText.push(element);
                    });
                    renderText = newRenderText;
                }
            }
        });
        var xOffset = 0;
        renderText.forEach((item) => {
            if (typeof item == "string") {
                this.originalFillText(item, x + xOffset, y, maxWidth);
                xOffset += this.measureText(item).width;
            }
            else {
                let measurement = this.measureText(item[0]);
                let scale = Math.min(measurement.width / item[1].width, measurement.width / item[1].height);
                this.drawImage(item[1], x + xOffset, y - measurement.actualBoundingBoxAscent, item[1].width * scale, item[1].height * scale);
                xOffset += item[1].width * scale;
            }
        });
    };
})();