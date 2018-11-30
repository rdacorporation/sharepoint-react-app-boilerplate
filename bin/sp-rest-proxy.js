'use strict';

const runAll = require('npm-run-all');

const args = process.argv.slice(2);

require('dotenv').config();
var RestProxy = require('sp-rest-proxy/dist/RestProxy');
var settings = {
  configPath: process.env.SP_Rest_Proxy_ConfigPath || './sp-rest-proxy/private.json',
  port: process.env.SP_Rest_Proxy_Port || 3001,
  staticRoot: process.env.SP_Rest_Proxy_StaticRoot || './static'
};
var proxy = new RestProxy.default(settings);
proxy.serve((server, context, settings) => {
  runAll(args, {
    parallel: true,
    stdout: process.stdout,
    stderr: process.stderr,
    stdin: process.stdin
  })
    .then(() => {
      process.exit();
    })
    .catch(err => {
      console.dir(err);
      process.exit(1);
    });
});
