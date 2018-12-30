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
    return {
      proxy: [
        {
          context: ['/_api', '/_vti_bin'],
          target: 'http://localhost:3001'
        }
      ]
    };
  })
};
