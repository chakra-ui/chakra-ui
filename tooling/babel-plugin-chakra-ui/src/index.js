import { declare } from "@babel/helper-plugin-utils"
import annotateAsPure from "@babel/helper-annotate-as-pure"
import { types } from "@babel/core"

const PURE_CALLS = new Map([
  ["@chakra-ui/system", ["forwardRef", "memo"]],
  ["@chakra-ui/core", ["forwardRef", "memo"]],
])

export default declare((api) => {
  api.assertVersion(7)

  return {
    name: "transform-react-pure-annotations",
    visitor: {
      CallExpression(path) {
        if (isImported(path)) {
          annotateAsPure(path)
        }
      },
    },
  }
})
function isImported(path) {
  if (!types.isMemberExpression(path.node.callee)) {
    const callee = path.get("callee")
    for (const [module, methods] of PURE_CALLS) {
      for (const method of methods) {
        if (callee.referencesImport(module, method)) {
          return true
        }
      }
    }

    return false
  }

  return false
}
