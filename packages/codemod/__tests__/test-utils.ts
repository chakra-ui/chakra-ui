import type { API, FileInfo } from "jscodeshift"
import { format } from "prettier"
import { createParserFromPath } from "../src/utils/parser"

export function createTestAPI(): API {
  return {
    jscodeshift: createParserFromPath("test.tsx"),
    j: createParserFromPath("test.tsx"),
    stats: () => {},
    report: () => {},
  } as any
}

export function createTestFileInfo(): FileInfo {
  return {
    path: "test.tsx",
    source: "",
  }
}

export async function applyTransform(
  transform: (
    file: FileInfo,
    api: API,
    options: any,
  ) => string | null | undefined,
  source: string,
): Promise<string> {
  const api = createTestAPI()
  const fileInfo = createTestFileInfo()
  const result = transform({ ...fileInfo, source }, api, {}) || source

  // Format the output with prettier
  try {
    return await format(result, {
      parser: "typescript",
      semi: false,
      singleQuote: true,
      trailingComma: "all",
    })
  } catch {
    // If formatting fails, return unformatted result
    return result
  }
}
