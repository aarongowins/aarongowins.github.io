var urlUtils = require('url'),
    fs = require('fs');
var filesystem = {
    'bin' : { 'bash' : null, 'cat' : null, 'chmod' : null, 'cp' : null, 'csh' : null, 'date' : null, 'dd' : null, 'df' : null, 'domainname' : null,
                'echo' : null, 'ed' : null, 'expr' : null, 'hostname' : null, 'kill' : null, 'ksh' : null, 'launchctl' : null, 'link' : null, 'ln' : null,
                'ls' : null, 'mkdir' : null, 'mv' : null, 'pax' : null, 'ps' : null, 'pwd' : null, 'rcp' : null, 'rm' : null, 'rmdir' : null, 'sh' : null,
                'sleep' : null, 'stty' : null, 'sync' : null, 'tcsh' : null, 'test' : null, 'unlink' : null, 'wait4path' : null, 'zsh' : null
    },
    'dev' : {},
    'etc' : {},
    'home' : {},
    'sbin' : {},
    'usr' : {
        'bin' : { 'python' : null, 'node' : null, 'perl' : null },
        'etc' : {},
        'lib' : {},
        'sbin' : {}
    },
    'var' : {}
};

function getNode(pathComponents) {
    var exists = true,
        n = filesystem;
    pathComponents.forEach(function(component, i) {
        if (exists && n && n.hasOwnProperty(component)) {
            n = n[component];
        } else {
            exists = false;
        }
    });
    if (exists) {
        return n;
    } else {
        return undefined;
    }
}

function getType(pathNode) {
    return pathNode === null || typeof pathNode === 'string' ? 'file' : 'directory';
}

var server = require('http').createServer(function(req, res) {
    var url = urlUtils.parse(req.url, true),
        path = url.pathname,
        pathComponents = path.split('/').filter(function(item) { return item; }),
        pathNode = getNode(pathComponents),
        pathType = getType(pathNode);
    if (pathType === 'directory') {
        if (path.charAt(path.length - 1) !== '/') {
            res.writeHead(302, { 'Location': path + '/' });
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<body>');
            res.write('<ul>');
            for (var childNodeName in pathNode) {
                if (pathNode.hasOwnProperty(childNodeName)) {
                    console.log(childNodeName)
                    res.write('<li>');
                    var childNode = pathNode[childNodeName];
                    if (getType(childNode) === 'directory') {
                        res.write('<a href="' + childNodeName + '/">' + childNodeName + '</a>');
                    } else {
                        res.write(childNodeName);
                    }
                    res.write('</li>');
                }
            }
            res.write('</ul>');
            res.write('<script src="https://bitbucket.org/jhinch/memoir.js/raw/tip/memoir.js"></script>');
            res.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>');
            res.write('<script>');
            fs.readFile('examples/memoir-example.js', function(err, data) {
                res.write(data);
                res.write('</script>');
                res.write('</body>');
                res.write('</html>');
                res.end();
            })
        }
    } else if (pathType === 'file') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(pathNode);
        res.end();
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(8080);
