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