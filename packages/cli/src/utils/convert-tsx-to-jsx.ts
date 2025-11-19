import { transformFromAstSync } from "@babel/core"
import { type ParserOptions, parse } from "@babel/parser"
// @ts-ignore - Plugin doesn't have types
import transformTypescript from "@babel/plugin-transform-typescript"
import * as recast from "recast"
import { pretty } from "./pretty"

const PARSE_OPTIONS: ParserOptions = {
  sourceType: "module",
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    "asyncGenerators",
    "bigInt",
    "classPrivateMethods",
    "classPrivateProperties",
    "classProperties",
    "classStaticBlock",
    "decimal",
    "decorators-legacy",
    "doExpressions",
    "dynamicImport",
    "exportDefaultFrom",
    "exportNamespaceFrom",
    "functionBind",
    "functionSent",
    "importAssertions",
    "importMeta",
    "nullishCoalescingOperator",
    "numericSeparator",
    "objectRestSpread",
    "optionalCatchBinding",
    "optionalChaining",
    ["pipelineOperator", { proposal: "minimal" }],
    ["recordAndTuple", { syntaxType: "hash" }],
    "throwExpressions",
    "topLevelAwait",
    "v8intrinsic",
    "typescript",
    "jsx",
  ],
}

export async function convertTsxToJsx(code: string) {
  const ast = recast.parse(code, {
    parser: {
      parse: (code: string) => {
        return parse(code, PARSE_OPTIONS)
      },
    },
  })

  const result = transformFromAstSync(ast, code, {
    cloneInputAst: false,
    plugins: [transformTypescript],
    retainLines: true,
  })

  if (!result?.code) {
    throw new Error("Failed to transform code")
  }

  return await pretty(result.code, {
    parser: "babel",
    jsxSingleQuote: true,
    singleQuote: true,
    printWidth: 80,
  })
}
