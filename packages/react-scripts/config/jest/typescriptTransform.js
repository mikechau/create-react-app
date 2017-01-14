// Copyright 2004-present Facebook. All Rights Reserved.

var tsc = require('typescript');
var paths = require('../paths');
var tsConfig = require(paths.appTsconfigJson);

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
