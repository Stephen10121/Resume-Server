const fs = require('fs');
const crypto = require('crypto');

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

module.exports = {
    getSubdomain,
    getPassword,
    hashIt
}