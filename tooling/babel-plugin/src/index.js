import { types } from "@babel/core"
import annotateAsPure from "@babel/helper-annotate-as-pure"

export default () => ({
  visitor: {
    CallExpression(path) {
      if (isImported(path)) {
        annotateAsPure(path)
      }
    },
  },
})

const PURE_CALLS = new Map([
  ["@chakra-ui/system", ["forwardRef", "memo"]],
  ["@chakra-ui/react", ["forwardRef", "memo"]],
])

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
