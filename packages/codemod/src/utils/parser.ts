import j from "jscodeshift"
// @ts-ignore
import babylonParse from "jscodeshift/parser/babylon"
// @ts-ignore
import tsOptions from "jscodeshift/parser/tsOptions"

interface DtsOptions extends Record<string, unknown> {
  plugins: Array<string | [string, Record<string, boolean>]>
}

const dtsOptions: DtsOptions = {
  ...tsOptions,
  plugins: [
    ...tsOptions.plugins.filter((plugin: string) => plugin !== "typescript"),
    ["typescript", { dts: true }],
  ],
}

function createParserFromPath(filePath: string): j.JSCodeshift {
  const isDeclarationFile = /\.d\.(m|c)?ts$/.test(filePath)
  if (isDeclarationFile) {
    return j.withParser(babylonParse(dtsOptions))
  }

  // jsx is allowed in .js files, feed them into the tsx parser.
  // tsx parser :.js, .jsx, .tsx
  // ts parser: .ts, .mts, .cts
  const isTsFile = /\.(m|c)?.ts$/.test(filePath)
  return isTsFile ? j.withParser("ts") : j.withParser("tsx")
}

export { createParserFromPath }
