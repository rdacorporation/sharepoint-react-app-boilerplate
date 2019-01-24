require('dotenv').config();
const { whenDev } = require('@craco/craco');
const CracoRawLoaderPlugin = require('@baristalabs/craco-raw-loader');

module.exports = {
  plugins: [
    {
      plugin: CracoRawLoaderPlugin,
      options: {
        test: /\.foo$/
      }
    }
  ],
  babel: [
    {
      plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
    }
  ],
  devServer: whenDev(() => {
    const protocol = process.env.SPRestProxy_Protocol || 'http';
    const hostname = process.env.SPRestProxy_Hostname || process.env.HOSTNAME || 'localhost';
    const port = process.env.SPRestProxy_Port || 3001;
    return {
      proxy: [
        {
          context: ['/_api', '/_vti_bin'],
          target: `${protocol}://${hostname}:${port}`
        }
      ]
    };
  })
};
