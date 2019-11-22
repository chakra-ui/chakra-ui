"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.wrapRootElement = void 0;

var _react = _interopRequireDefault(require("react"));

var _core = require("@chakra-ui/core");

var _theme = _interopRequireDefault(require("./theme"));

var _jsxFileName = "/Users/alexlobera/Projects/leanjscom/opensource/chakra-ui/packages/gatsby-plugin-chakra-ui/src/gatsby-browser.js";

var wrapRootElement = function wrapRootElement(_ref, _ref2) {
  var element = _ref.element;
  var _ref2$isResettingCSS = _ref2.isResettingCSS,
      isResettingCSS = _ref2$isResettingCSS === void 0 ? true : _ref2$isResettingCSS,
      _ref2$isUsingColorMod = _ref2.isUsingColorMode,
      isUsingColorMode = _ref2$isUsingColorMod === void 0 ? true : _ref2$isUsingColorMod;
  return _react.default.createElement(_core.ThemeProvider, {
    theme: _theme.default,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, isResettingCSS && !isUsingColorMode && _react.default.createElement(_core.CSSReset, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), isUsingColorMode ? _react.default.createElement(_core.ColorModeProvider, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, isResettingCSS && _react.default.createElement(_core.CSSReset, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }), element) : element);
};

exports.wrapRootElement = wrapRootElement;