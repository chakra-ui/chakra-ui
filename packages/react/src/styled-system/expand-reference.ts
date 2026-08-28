import { esc } from "./esc"

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

    if (char === "{") {
      const endIndex = str.indexOf("}", index)

      if (endIndex === -1) {
        break
      }

      const path = str.slice(index + 1, endIndex)
      const resolved = resolve(path)
      expanded += resolved ?? path
      index = endIndex + 1
      continue
    }

    if (state === "token") {
      if (char === ",") {
        if (str[index] === "") {
          index++
        }

        state = "fallback"
        currentStates.push(state)

        const resolved = resolve(tokenPath)
        if (resolved?.endsWith(")")) {
          expanded += resolved.slice(0, -1)
        }

        tokenPath = ""
        fallback = ""
        continue
      }
    }

    if (state === "fallback") {
      const nextFallback = fallback + char

      if (nextFallback === ", var(") {
        const innerEndIndex = cssVarParser(str.slice(index + 1))
        const endIndex = innerEndIndex + index + 1

        const cssVar = str.slice(index + 1, endIndex)
        if (endIndex === -1) {
          break
        }

        expanded += ", var(" + cssVar + ")"
        index = endIndex + 1
        state = currentStates.pop() ?? state
        fallback = ""
        continue
      }
    }

    if (state === "token" || state === "fallback") {
      index++

      if (char === ")") {
        state = currentStates.pop() ?? state ?? "char"
        fallback += char

        const resolved = tokenPath
          ? (resolve(tokenPath) ?? esc(tokenPath))
          : tokenPath

        if (fallback) {
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
