// Copyright 2004-present Facebook. All Rights Reserved.

var tsc = require('typescript');
var paths = require('../paths');
var tsConfig = require('../../tsconfig.json');

var config = Object.assign({}, tsConfig.compilerOptions, { rootDir: paths.appSrc })

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(
        src,
        config,
        path,
        []
      );
    }
    return src;
  },
};
