const Title = document.querySelector("#Title");
const Loop = setInterval(() => Title.style.transform = `rotate(${5 * Math.cos((Math.PI * (Date.now() * 0.08)) / 180)}deg)`);

document.querySelectorAll(".buttonAnimation").forEach((element) => {
    element.addEventListener("mouseover", async (event) => {
        const Loop = setInterval(() => event.target.style.transform = `translateY(${3 * Math.sin((Math.PI * (Date.now() * 0.25)) / 180)}px)`);
        const mouseLeave = event.target.addEventListener("mouseleave", (event) => {
            clearInterval(Loop);
            event.target.style.transform = "";
            event.target.removeEventListener("mouseleave", mouseLeave);
        });
    });
});