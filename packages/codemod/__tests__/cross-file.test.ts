import { describe, expect, it } from "vitest"
import colorPalette from "../src/transforms/props/color-palette"
import { findCrossFileReExports } from "../src/utils/chakra-tracker"
import { applyTransformFiles, createTestProject } from "./test-utils"

describe("findCrossFileReExports", () => {
  it("reports the file location, name, and source of each resolved re-export", () => {
    const project = createTestProject()
    project.createSourceFile(
      "ui.ts",
      `export { Button } from '@chakra-ui/react'\n`,
    )
    const app = project.createSourceFile(
      "app.tsx",
      `import { Button } from './ui'\nconst a = <Button />\n`,
    )
    expect(findCrossFileReExports(app)).toEqual([
      { name: "Button", from: "./ui", line: 1 },
    ])
  })
})

describe("cross-file barrel resolution (prop transforms)", () => {
  it("migrates props on a component imported through a direct re-export barrel", async () => {
    const out = await applyTransformFiles(
      colorPalette,
      {
        "ui.ts": `export { Button } from '@chakra-ui/react'\n`,
        "app.tsx": `import { Button } from './ui'\nconst a = <Button colorScheme="blue">Go</Button>\n`,
      },
      "app.tsx",
    )
    expect(out["app.tsx"]).toContain('colorPalette="blue"')
    expect(out["app.tsx"]).not.toContain("colorScheme")
  })

  it("resolves an import-then-reexport barrel", async () => {
    const out = await applyTransformFiles(
      colorPalette,
      {
        "ui.ts": `import { Button } from '@chakra-ui/react'\nexport { Button }\n`,
        "app.tsx": `import { Button } from './ui'\nconst a = <Button colorScheme="blue">Go</Button>\n`,
      },
      "app.tsx",
    )
    expect(out["app.tsx"]).toContain('colorPalette="blue"')
  })

  it("resolves an aliased re-export", async () => {
    const out = await applyTransformFiles(
      colorPalette,
      {
        "ui.ts": `export { Button as Btn } from '@chakra-ui/react'\n`,
        "app.tsx": `import { Btn } from './ui'\nconst a = <Btn colorScheme="blue">Go</Btn>\n`,
      },
      "app.tsx",
    )
    expect(out["app.tsx"]).toContain('colorPalette="blue"')
  })

  it("resolves a transitive barrel chain", async () => {
    const out = await applyTransformFiles(
      colorPalette,
      {
        "chakra.ts": `export { Button } from '@chakra-ui/react'\n`,
        "ui.ts": `export { Button } from './chakra'\n`,
        "app.tsx": `import { Button } from './ui'\nconst a = <Button colorScheme="blue">Go</Button>\n`,
      },
      "app.tsx",
    )
    expect(out["app.tsx"]).toContain('colorPalette="blue"')
  })

  it("does not touch a local component that is not re-exported from Chakra", async () => {
    const out = await applyTransformFiles(
      colorPalette,
      {
        "ui.ts": `export const Button = (p: any) => null\n`,
        "app.tsx": `import { Button } from './ui'\nconst a = <Button colorScheme="blue">Go</Button>\n`,
      },
      "app.tsx",
    )
    expect(out["app.tsx"]).toContain("colorScheme")
    expect(out["app.tsx"]).not.toContain("colorPalette")
  })
})
