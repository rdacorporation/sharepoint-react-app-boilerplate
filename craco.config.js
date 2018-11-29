const { whenDev } = require('@craco/craco');

module.exports = {
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
