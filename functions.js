const fs = require('fs');
const crypto = require('crypto');
const os = require('os');

async function getPassword() {
    try {
        const data = fs.readFileSync('./password.txt', 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function hashIt(code) {
    return crypto.createHash('sha256').update(code).digest('hex');
}

function getSubdomain(host) {
    var subdomain = host ? host.substring(0, host.lastIndexOf('.')) : null;
    return subdomain;
}

function cpuAverage() {

    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
  
    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {
  
      //Select CPU core
      var cpu = cpus[i];
  
      //Total up the time in the cores tick
      for(type in cpu.times) {
        totalTick += cpu.times[type];
     }     
  
      //Total up the idle time of the core
      totalIdle += cpu.times.idle;
    }
  
    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
  }

module.exports = {
    getSubdomain,
    getPassword,
    hashIt,
    cpuAverage
}