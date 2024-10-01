import { esc } from "./esc"

/**
 * Recursively parse a string to extract Panda token references (curly or with the `token` function syntax)
 * Allows nested token references, e.g. `token(colors.xxx.yyy, token(colors.aaa.bbb, blue))`
 * Properly ignore CSS vars in fallback syntax, e.g. `token(colors.xxx.yyy, var(--some-var, var(--can-be-nested, blue)))`
 */
export const expandTokenReferences = (
  str: string,
  resolve: (path: string) => string | undefined,
) => {
  let expanded = ""
  let index = 0

  type State = "char" | "token" | "fallback"
  let state = "char" as State
  let tokenPath = ""
  let fallback = ""
  const currentStates = [] as State[]

  while (index < str.length) {
    const char = str[index]

    // Starting a curly bracket token reference
    // `{colors.xxx.yyy}`
    if (char === "{") {
      const endIndex = str.indexOf("}", index)
      // Invalid string, a curly bracket was not closed
      if (endIndex === -1) {
        break
      }

      // Jump to the end of the curly bracket
      // Add the resolved token (CSS var) to the expanded string
      const path = str.slice(index + 1, endIndex)
      const resolved = resolve(path)
      expanded += resolved ?? path
      index = endIndex + 1
      continue
    }

    if (state === "token") {
      // Found a token ref fallback
      // `token(xxx, yyy)`
      if (char === ",") {
        if (str[index] === "") {
          index++
        }

        state = "fallback"
        currentStates.push(state)
        // `token(colors.xxx.yyy, colors.aaa.bbb)`
        // `token(colors.xxx.yyy, blue)`
        const resolved = resolve(tokenPath)
        if (resolved?.endsWith(")")) {
          // we need to get rid of this parenthesis for the fallback syntax
          // var(--colors-xxx-yyy), var(--colors-aaa-bbb)
          //                     ^
          expanded += resolved.slice(0, -1)
        }

        tokenPath = ""
        fallback = ""
        continue
      }
    }

    // `token(colors.xxx.yyy, colors.aaa.bbb)`
    //                      ^^^^^^^^^^^^^^^^^
    // `token(colors.xxx.yyy, blue)`
    //                      ^^^^^^^
    if (state === "fallback") {
      const nextFallback = fallback + char

      // `token(colors.xxx.yyy, var(--some-var, var(--can-be-nested, blue)))`
      //                      ^^^^^^
      if (nextFallback === ", var(") {
        // Compute the end index of the (fallback) CSS var
        const innerEndIndex = cssVarParser(str.slice(index + 1))
        const endIndex = innerEndIndex + index + 1

        // That's the last parenthesis of the CSS var
        // `token(colors.xxx.yyy, var(--some-var, var(--can-be-nested, blue)))`
        //                                                                  ^

        // Now we can extract the inner (fallback) CSS var content
        // `token(colors.xxx.yyy, var(--some-var, var(--can-be-nested, blue)))`
        //                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        const cssVar = str.slice(index + 1, endIndex)
        if (endIndex === -1) {
          break
        }

        // Add it to the expanded string and go back to the previous state
        expanded += ", var(" + cssVar + ")"
        index = endIndex + 1
        state = currentStates.pop() ?? state
        fallback = ""
        continue
      }
    }

    // Already inside a token fn reference
    if (state === "token" || state === "fallback") {
      index++

      // Closing a token fn reference
      // `token(colors.xxx.yyy)`
      //                      ^
      // `token(colors.xxx.yyy, blue)`
      //                            ^
      // `token(colors.xxx.yyy, var(--some-var, var(--can-be-nested, blue)))`
      //                                                                   ^
      if (char === ")") {
        state = currentStates.pop() ?? state ?? "char"
        fallback += char

        // Try to resolve the token path, which is the left part of the token fn
        // `token(tokenPath, fallback))`
        //        ^^^^^^^^^
        const resolved = tokenPath
          ? (resolve(tokenPath) ?? esc(tokenPath))
          : tokenPath

        if (fallback) {
          // `, colors.xxx.yyy` -> `colors.xxx.yyy`
          fallback = fallback.slice(1).trim()

          if (!fallback.startsWith("token(") && fallback.endsWith(")")) {
            fallback = fallback.slice(0, -1)
          }

          if (fallback.includes("token(")) {
            const parsed = expandTokenReferences(fallback, resolve)
            if (parsed) {
              fallback = parsed.slice(0, -1)
            }
          } else if (fallback) {
            const resolvedFallback = resolve(fallback)
            if (resolvedFallback) {
              fallback = resolvedFallback
            }
          }
        }

        const lastChar = expanded.at(-1)
        if (fallback) {
          if (lastChar?.trim()) {
            expanded += resolved.slice(0, -1) + (", " + fallback + ")")
          } else {
            expanded += fallback
          }
        } else {
          expanded += resolved || ")"
        }

        tokenPath = ""
        fallback = ""
        state = "char"
        continue
      }

      if (state === "token") {
        tokenPath += char
      }
      if (state === "fallback") {
        fallback += char
      }

      continue
    }

    const tokenIndex = str.indexOf("token(", index)
    // Starting a token fn reference, jump to the first character inside it
    // `token(colors.xxx.yyy)`
    if (tokenIndex !== -1) {
      const innerTokenIndex = tokenIndex + "token(".length
      expanded += str.slice(index, tokenIndex)
      index = innerTokenIndex
      state = "token"
      currentStates.push(state)
      continue
    }

    expanded += char
    index++
  }

  return expanded
}

/**
 * Finds the closing parenthesis index in a string starting from the start of a CSS var
 * @example cssVarParser('--colors-red-100, var(--colors-blue-200, var(--fallback)))')
 */
const cssVarParser = (str: string) => {
  let index = 0
  const openedParenthesises = ["("]

  while (index < str.length) {
    const char = str[index]
    if (char === "(") {
      openedParenthesises.push(char)
    } else if (char === ")") {
      openedParenthesises.pop()
      if (openedParenthesises.length === 0) {
        return index
      }
    }
    index++
  }

  return index
}
