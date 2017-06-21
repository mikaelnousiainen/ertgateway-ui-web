/* eslint consistent-return:0 */

const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

const appServer = http.createServer(app);

const proxyHost = process.env.npm_config_proxyhost;
const proxyPort = process.env.npm_config_proxyport;

if (proxyHost && proxyPort) {
  const target = `${proxyHost}:${proxyPort}/api`;
  console.log(`Proxying /api to ${target}`);

  const proxy = httpProxy.createProxyServer({
    target: `http://${proxyHost}:${proxyPort}`,
    ws: true,
  });

  proxy.on('error', (err, req, res) => {
    if (err) {
      console.error(err.stack);
    }

    if (res && res.writeHead) {
      try {
        res.writeHead(502);
      } catch (e) {
        console.error(e.stack);
      }
    }

    if (res && res.end) {
      try {
        res.end('Proxy server error');
      } catch (e) {
        console.error(e.stack);
      }
    }
  });

  app.use('/api', (req, res) => {
    proxy.web(req, res, {
      target: `http://${proxyHost}:${proxyPort}/api`,
    });
  });

  appServer.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
  });
}

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
appServer.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, connectUrl) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, connectUrl);
    });
  } else {
    logger.appStarted(port);
  }
});
