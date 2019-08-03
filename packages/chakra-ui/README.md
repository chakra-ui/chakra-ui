<!-- [![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls] -->

# **Welcome to Chakra UI ⚡️**

- Works out of the box. Chakra UI contains a set of polished React components
  that work out of the box.

- Flexible & composable. Chakra UI components are built on top of a React UI
  Primitive for endless composability.

- Accessible. Chakra UI components follows the WAI-ARIA guidelines
  specifications.

- Dark Mode 😍: All components work in dark mode compatible.

## Install and use components

⚡️Chakra UI is made up of multiple components and tools which you can import
one by one. All you need to do is install the `chakra-ui` package:

```sh
$ yarn add chakra-ui
# or
$ npm install --save chakra-ui
```

A working version, assuming you are using something like
[Create React App](https://github.com/facebookincubator/create-react-app), might
look like this:

```js
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "chakra-ui";

ReactDOM.render(
  <Button>I just consumed some ⚡️Chakra!</Button>,
  document.getElementById("root"),
);
```

<!-- [build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo -->
