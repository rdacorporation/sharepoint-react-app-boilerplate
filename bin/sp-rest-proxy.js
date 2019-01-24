'use strict';

const runAll = require('npm-run-all');

const args = process.argv.slice(2);

require('dotenv').config();
const RestProxy = require('sp-rest-proxy/dist/RestProxy');
const settings = {
  configPath: process.env.SPRestProxy_ConfigPath || './sp-rest-proxy/private.json',
  port: process.env.SPRestProxy_Port || 3001,
  staticRoot: process.env.SPRestProxy_StaticRoot || './static',
  hostname: process.env.SPRestProxy_Hostname || process.env.HOSTNAME || 'localhost',
  authConfigSettings: {
    username: process.env.SPRestProxy_Username || undefined,
    password: process.env.SPRestProxy_Password || undefined,
    clientId: process.env.SPRestProxy_ClientId || undefined,
    clientSecret: process.env.SPRestProxy_ClientSecret || undefined,
    encryptPassword: process.env.SPRestProxy_EncryptPassword || undefined,
    saveConfigOnDisk: process.env.SPRestProxy_SaveConfigOnDisk || undefined
  }
};

const proxy = new RestProxy.default(settings);
// proxy.app.use('*/_vti_bin/barista/v1/barista.svc', proxy.routers.apiRestRouter);
proxy.serve((server, context, settings) => {
  runAll(args, {
    parallel: true,
    stdout: process.stdout,
    stderr: process.stderr,
    stdin: process.stdin
  })
    .then(() => {
      console.log('SharePoint REST Proxy has been stopped');
      process.exit();
    })
    .catch(err => {
      console.dir(err);
      console.log('SharePoint REST Proxy has been stopped');
      process.exit(1);
    });
});
