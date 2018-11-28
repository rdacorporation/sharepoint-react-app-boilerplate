'use strict';

const runAll = require('npm-run-all');

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(x => x === 'build' || x === 'start' || x === 'test');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

require('dotenv').config();
var RestProxy = require('sp-rest-proxy/dist/RestProxy');
var settings = {
  configPath: process.env.SP_Rest_Proxy_ConfigPath || './sp-rest-proxy/private.json',
  port: process.env.SP_Rest_Proxy_Port || 3001,
  staticRoot: process.env.SP_Rest_Proxy_StaticRoot || './static'
};
var proxy = new RestProxy.default(settings);
proxy.serve((server, context, settings) => {
  switch (script) {
    case 'build':
    case 'start':
    case 'test':
      runAll([`${script}-*`], {
        parallel: true,
        stdout: process.stdout,
        stderr: process.stderr
      })
        .then(() => {
          process.exit();
        })
        .catch(err => {
          console.dir(err);
          process.exit(1);
        });
      break;
    default:
      console.log(`Unknown script "${script}".`);
      break;
  }
});
