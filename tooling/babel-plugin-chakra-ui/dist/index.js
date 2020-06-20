"use strict";

exports.__esModule = true;
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _helperAnnotateAsPure = _interopRequireDefault(require("@babel/helper-annotate-as-pure"));

var _core = require("@babel/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PURE_CALLS = new Map([["@chakra-ui/system", ["forwardRef", "memo"]], ["@chakra-ui/core", ["forwardRef", "memo"]]]);

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-react-pure-annotations",
    visitor: {
      CallExpression(path) {
        if (isImported(path)) {
          (0, _helperAnnotateAsPure.default)(path);
        }
      }

    }
  };
});

exports.default = _default;

function isImported(path) {
  if (!_core.types.isMemberExpression(path.node.callee)) {
    const callee = path.get("callee");

    for (const [module, methods] of PURE_CALLS) {
      for (const method of methods) {
        if (callee.referencesImport(module, method)) {
          return true;
        }
      }
    }

    return false;
  }

  return false;
}