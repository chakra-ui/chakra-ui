import { transform } from "sucrase"
import { pretty } from "./pretty"

export function convertTsxToJsx(code: string) {
  const jsx = transform(code, {
    transforms: ["jsx", "typescript"],
    jsxRuntime: "preserve",
  })
  return pretty(jsx.code, {
    parser: "babel",
    jsxSingleQuote: true,
    singleQuote: true,
    printWidth: 80,
  })
}
