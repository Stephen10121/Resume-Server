const { getSubdomain, getPassword, hashIt, cpuAverage } = require('./functions.js');

function startSocket(io) {
    let whiteList = new Object();
    let startMeasure = cpuAverage();
    let prevPercentage = 0;
    io.on('connection', socket => {
        setInterval(()=>{
        var endMeasure = cpuAverage(); 
        var idleDifference = endMeasure.idle - startMeasure.idle;
        var totalDifference = endMeasure.total - startMeasure.total;
        var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
        if (percentageCPU != prevPercentage) {
            io.emit('adminCpu', percentageCPU);
            prevPercentage = percentageCPU;
        }
        }, 1000);
        socket.on("auth", async (data) => {
        let password = await getPassword()
        password = hashIt(password);
        if (data == password) {
            whiteList[socket.id] = 200;
            socket.emit("adminConnect", {id: socket.id, error: 200});
            socket.emit('adminCpu', prevPercentage);
        } else {
            socket.disconnect();
            console.log("disconnected someone");
            //socket.emit("adminConnect", {error: 403});
        }
        });
        socket.on('disconnect', () => {
        delete whiteList[socket.id];
        });
    
        socket.on("test", (data) => {
        if (whiteList[socket.id]) {
            socket.emit("adminTest", "Hi there");
        } else {
            socket.emit("adminTest", {error: 403});
        }
        });
    });
}

module.exports = {startSocket};