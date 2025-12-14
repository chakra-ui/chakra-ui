import type { Node, ObjectExpression, Property } from "jscodeshift"
import type { API, FileInfo } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

function isObjectExpression(node: Node): node is ObjectExpression {
  return node.type === "ObjectExpression"
}

function wrapColorValues(j: any, obj: Node) {
  if (!isObjectExpression(obj) || !Array.isArray(obj.properties)) return

  obj.properties.forEach((prop: Node) => {
    if (prop.type !== "Property") return
    const property = prop as Property

    if (!property.value) return

    if (isObjectExpression(property.value)) {
      wrapColorValues(j, property.value)
    } else {
      property.value = j.objectExpression([
        j.property("init", j.identifier("value"), property.value),
      ])
    }
  })

  const keys = obj.properties
    .filter((p): p is Property => p.type === "Property")
    .map((p) =>
      p.key.type === "Identifier"
        ? p.key.name
        : p.key.type === "Literal"
          ? String(p.key.value)
          : "",
    )

  if (keys.includes("50") && keys.includes("900") && !keys.includes("950")) {
    obj.properties.push(
      j.property(
        "init",
        j.literal("950"),
        j.objectExpression([
          j.property("init", j.identifier("value"), j.literal("#09090b")),
        ]),
      ),
    )
  }
}

export default function transformer(file: FileInfo, _api: API) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Process all ObjectExpressions
  root.find(j.ObjectExpression).forEach((path) => {
    wrapColorValues(j, path.node)
  })

  return root.toSource({ quote: "single" })
}
