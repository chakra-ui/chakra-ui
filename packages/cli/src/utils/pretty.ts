import * as prettier from "prettier"

export function pretty(value: any, options: prettier.Options = {}) {
  return prettier.format(value, {
    parser: "typescript",
    bracketSpacing: true,
    jsxSingleQuote: false,
    printWidth: 160,
    proseWrap: "always",
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "all",
    ...options,
  })
}
