const fs = require('fs')

async function getPassword() {
    try {
        const data = fs.readFileSync('./password.txt', 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function getSubdomain(host) {
    var subdomain = host ? host.substring(0, host.lastIndexOf('.')) : null;
    return subdomain;
}

module.exports = {
    getSubdomain,
    getPassword
}