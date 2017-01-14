# react-scripts-ts-sass

This package is a fork from the vanilla `react-scripts`, in order to add custom support for [Typescript](https://www.typescriptlang.org/) and [Sass](http://sass-lang.com/).

This package includes scripts and configuration used by [Create React App](https://github.com/facebookincubator/create-react-app).
Please refer to its documentation:

* [Getting Started](https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

## Support

* [x] JS/ES6
* [x] Typescript
* [x] SASS
* [x] Multiple Entry Points
* [x] Automatic Browser Open disabled by default (`CRA_OPEN_BROWSER=true` to reenable)

JS/ES6 support has been kept in, so you can use JS/ES6 and Typescript in the same project if you need to.

## Usage

By default, you should have a `src/index.js` or `src/index.tsx` entry point. This will create the primary `app` bundle.

### Multiple Entry Points

Your application `src` directory should contain a `index.js` or `index.tsx` file.

Alternatively, if you are building a an application with [multiple entry points](https://webpack.github.io/docs/multiple-entry-points.html), you can create additional entry points by appending `index` before the filename extension.

When a filename following the convention of `src/*.index.(ts|tsx|js|jsx)` is detected, a new entry point will be added to the webpack entrypoint config.

A new html file will also be automatically generated, and default to using the `public/index.html` template if you did not create a custom template inside `public`.

To use a custom `index.html`, you can create a new html file with the matching entry point key.

Example:

```
src/index.tsx -> public/index.html
src/alt.index.tsx -> public/alt.html
```

The filetypes support for entry points are:

- tsx
- ts
- js
- jsx

**NOTE**: Periods after the first one will be ignored. If you want to generate additional index files for bundles named like `one.two.three.index.js`, it will be ignored and treated like `one.index.js` and generate a `one.html`. Use dashes or underscores as an alternative (ie. `one-two-three.index.js` -> `one-two-three.html`).

## References

* [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript)
* [sass-loader](https://github.com/jtangelder/sass-loader)
