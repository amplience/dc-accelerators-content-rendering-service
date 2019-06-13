const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  // handlebars-helpers uses lazy-cache which is not supported by webpack. The unlazy-loader plugin resolves this.
  config.module.rules.push({
    test: /(handlebars-helpers|create-frame|set-getter)[\\\/].*\.js$/,
    use: ['unlazy-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.node = {
    readline: 'empty',
    fs: 'empty'
  }

  config.resolve = {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js',
      'handlebars-helpers': 'handlebars-helpers/index.js',
      'lory.js': 'lory.js/dist/lory.js'
    }
  }

  config.module.unknownContextCritical = false;

  // Return the altered config
  return config;
};