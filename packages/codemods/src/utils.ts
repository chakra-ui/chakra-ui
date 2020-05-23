import * as j from "jscodeshift"
import _ from "lodash/fp"

const nodeIsType = <T>(fn: any) => (
  node: any,
  ...rest: any | any[]
): node is T => fn(node, ...rest)

const isJSXExpressionContainer = (node: j.)