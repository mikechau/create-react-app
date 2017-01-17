var path = require('path');
var fs = require('fs');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var paths = require('./paths');

function alphabetSort(a, b) {
  if (a.names[0] === 'base') {
    return -1;
  }

  if (b.names[0] === 'base') {
    return 1;
  }

  if (a.names[0] > b.names[0]) {
    return 1;
  }

  if (a.names[0] < b.names[0]) {
    return -1;
  }

  return 0;
}

function buildEntryPointConfig(baseConfig) {
  var entryPointConfig = baseConfig || {};
  var appSrcPath = paths.appSrc;
  var entryPointPaths = glob.sync('*.index.+(ts|tsx|js|tsx)', { cwd: appSrcPath });

  return entryPointPaths.reduce(function(config, newPath) {
    var entryPointName = path.basename(newPath).split('.')[0].toLowerCase();

    config[entryPointName] = path.resolve(appSrcPath, newPath);

    return config;
  }, entryPointConfig);
}

function getIndexName(name) {
  switch(name.toLowerCase()) {
    case 'app':
      return 'index.html';
    case 'index':
      return 'index.index.html';
    default:
      return name + '.html';
  }
}

function buildHtmlWebpackPlugins(opts) {
  var options = opts || {};
  var entryPointConfig = Object.assign({}, options.entryPointConfig);
  var isProduction = options.production || false;
  var appPublicPath = paths.appPublic;
  var appHtmlPath = paths.appHtml;

  delete entryPointConfig.base;

  return Object.keys(entryPointConfig).map(function(key) {
    var indexFilename = getIndexName(key);
    var customTemplatePath = path.resolve(appPublicPath, indexFilename);
    var templatePath = fs.existsSync(customTemplatePath) ? customTemplatePath : appHtmlPath;

    var customHtmlConfig = isProduction ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
    } : {};

    var htmlConfig = Object.assign(
      {
        inject: true,
        chunks: ['base', key],
        template: templatePath,
        chunksSortMode: alphabetSort
      },
      customHtmlConfig,
      {
        filename: indexFilename
      });

    return new HtmlWebpackPlugin(htmlConfig);
  });
}

module.exports = {
  buildEntryPointConfig: buildEntryPointConfig,
  buildHtmlWebpackPlugins: buildHtmlWebpackPlugins
};
