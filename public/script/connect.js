const socket = io();
const textPerc = document.getElementById("perc");
const roundPerc = document.getElementById("progress-circle");
let prevperc = 1;
const machineIdEvent = document.getElementById("machineId");

// Startup
socket.emit("auth", getCookie("G_VER"));
// End Startup

// Start Connect id section

machineIdEvent.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        connectId();
    }
});

// End Connect id section
// Start Socket events

socket.on("adminCpu", (data) => {
    setPerc(data);
});

socket.on("adminConnect", (data) => {
    console.log(`Error: ${data.error}`);
});

// End Socket events