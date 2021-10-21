function getSubdomain(host) {
    var subdomain = host ? host.substring(0, host.lastIndexOf('.')) : null;
    return subdomain;
}

module.exports = {
    getSubdomain
}