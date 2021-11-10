const socket = io("ws://admin.192.168.0.24");

socket.on("adminCpu", (data) => {
    console.log(data);
});

socket.on("adminConnect", (data) => {
    console.log(data);
});

socket.on("adminTest", (data) => {
    console.log(data);
});