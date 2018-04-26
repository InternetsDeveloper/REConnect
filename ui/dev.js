/**
 * Created by mark on 6/20/17.
 */
/* Do not do this to regular JS files */
/* eslint "strict": "off" */
/* eslint "sort-vars": "off" */
/* eslint "max-lines": "off" */
/* eslint "no-nested-ternary": "off" */
/* eslint "no-magic-numbers": "off" */
/* eslint "angular/json-functions": "off" */

const bodyParser = require('body-parser'),
    config = require('./gulp-config.json'),
    express = require('express'),
    app = express(),
    packageJson = require('./package.json'),
    proxy = require('http-proxy-middleware'),
    ENV = process.env.ENV,
    isProd = ENV === 'production',
    port = 3000,
    opbeatAppEnvId = {
        development: 'n',
        stage: 'o',
        production: 'p'
    };

var apiUrl;

if (ENV === 'stage') {
    apiUrl = config.stage.url;
} else if (ENV === 'production') {
    apiUrl = config.production.url;
} else {
    apiUrl = config.development.url;
}

/**
 *
 *
 * Universal Gulp Code
 *
 *
 */
app.set('port', port);
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/authentication', (req, res) => {
    if (req.body.username === 'admin' && req.body.password === '993c0cce6a3325f1b84698c1a3bcb1d8') {
        return res.status(200).send({});
    }

    return res.status(403).send({
        success: false,
        message: 'Incorrect username and password.'
    });
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/favicon.ico', express.static('favicon.ico'));
app.use('/images', express.static(__dirname + '/server/images'));

/**
 *
 *
 * Login Server Code
 *
 *
 */
app.use('/login/fonts', express.static(__dirname + '/server/login/fonts'));

app.get(/login\/(js|styles|html)\/(.+)/, function (req, res) {
    const isCss = req.url.includes('css'),
        isJavaScript = req.url.includes('js');

    res.sendFile(__dirname + '/server' + req.url + '.gz', {
        headers: {
            'Content-Encoding': 'gzip',
            'Content-Type': (isCss ? 'text/css' : isJavaScript ? 'text/javascript' : 'text/html') + '; charset=UTF-8'
        }
    });
});

app.get(/login(.*?)/, (req, res) => {
    res.render(__dirname + '/server/login/index.html', {
        api: apiUrl,
        opbeatAppEnvId: opbeatAppEnvId[ENV] || opbeatAppEnvId.development,
        debugInfoEnabled: !isProd,
        version: packageJson.version
    });
});

/**
 *
 *
 * Office Server Code
 *
 *
 */
app.use('/office/fonts', express.static(__dirname + '/server/office/fonts'));

app.get(/office\/(js|styles|html)\/(.+)/, function (req, res) {
    const isCss = req.url.includes('css'),
        isJavaScript = req.url.includes('js');

    res.sendFile(__dirname + '/server' + req.url + '.gz', {
        headers: {
            'Content-Encoding': 'gzip',
            'Content-Type': (isCss ? 'text/css' : isJavaScript ? 'text/javascript' : 'text/html') + '; charset=UTF-8'
        }
    });
});

app.get(/office(.*?)/, (req, res) => {
    res.render(__dirname + '/server/office/index.html', {
        api: apiUrl,
        opbeatAppEnvId: opbeatAppEnvId[ENV] || opbeatAppEnvId.development,
        debugInfoEnabled: !isProd,
        version: packageJson.version
    });
});

/**
 *
 *
 * Field Server Code
 *
 *
 */
app.use('/field/fonts', express.static(__dirname + '/server/field/fonts'));

app.get(/field\/(js|styles|html)\/(.+)/, function (req, res) {
    const isCss = req.url.includes('css'),
        isJavaScript = req.url.includes('js');

    res.sendFile(__dirname + '/server' + req.url + '.gz', {
        headers: {
            'Content-Encoding': 'gzip',
            'Content-Type': (isCss ? 'text/css' : isJavaScript ? 'text/javascript' : 'text/html') + '; charset=UTF-8'
        }
    });
});

app.get(/field(.*?)/, (req, res) => {
    res.render(__dirname + '/server/field/index.html', {
        api: apiUrl,
        opbeatAppEnvId: opbeatAppEnvId[ENV] || opbeatAppEnvId.development,
        debugInfoEnabled: !isProd,
        version: packageJson.version
    });
});

/**
 *
 *
 * Admin Server Code
 *
 *
 */
app.use('/admin/fonts', express.static(__dirname + '/server/admin/fonts'));

app.get(/admin\/(js|styles|html)\/(.+)/, function (req, res) {
    const isCss = req.url.includes('css'),
        isJavaScript = req.url.includes('js');

    res.sendFile(__dirname + '/server' + req.url + '.gz', {
        headers: {
            'Content-Encoding': 'gzip',
            'Content-Type': (isCss ? 'text/css' : isJavaScript ? 'text/javascript' : 'text/html') + '; charset=UTF-8'
        }
    });
});

app.get(/admin(.*?)/, (req, res) => {
    res.render(__dirname + '/server/admin/index.html', {
        api: apiUrl,
        opbeatAppEnvId: opbeatAppEnvId[ENV] || opbeatAppEnvId.development,
        debugInfoEnabled: !isProd,
        version: packageJson.version
    });
});

/**
 *
 *
 * Universal Server Code
 *
 *
 */
app.use('/api/v1/1/', proxy({
    target: apiUrl,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        proxyReq.write(JSON.stringify(req.body));
    }
}));

app.get('/*', (req, res) => {
    res.render(__dirname + '/server/login/index.html', {
        api: apiUrl,
        opbeatAppEnvId: opbeatAppEnvId[ENV] || opbeatAppEnvId.development,
        debugInfoEnabled: !isProd,
        version: packageJson.version
    });
});


app.listen(port);
