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
