function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const socket = io();
socket.emit("auth", getCookie("G_VER"));

socket.on("adminConnect", (data) => {
    console.log(data);
});

function customCommand() {
    console.log("Custom Command");
}

const textPerc = document.getElementById("perc");
const roundPerc = document.getElementById("progress-circle");
let prevperc = 1;
function map_range(value) {
    return 189 + (0 - 189) * (value - 0) / (100 - 0);
}

function setPerc(percentage) {
    let perc = prevperc;
    let jeff = setInterval(()=> {
        if (perc==percentage) {
            prevperc = perc;
            clearInterval(jeff);
        }
        textPerc.innerHTML = `${perc}%`;
        roundPerc.style.strokeDashoffset = map_range(perc);
        if (percentage<perc) {
            perc--;
        } else {
            perc++;
        }
    }, 10);
}
socket.on("adminCpu", (data) => {
    setPerc(data);
    console.log(data);
});