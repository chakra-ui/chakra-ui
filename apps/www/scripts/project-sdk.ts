import { glob } from "fast-glob"
import { findUpSync } from "find-up"
import { existsSync, readFileSync, readdirSync } from "node:fs"
import { dirname, extname, join, parse, resolve } from "node:path"
import { trainCase } from "scule"
import { Project } from "ts-morph"

const excludeSet = new Map([
  ["checkbox", ["checkbox-card-*.tsx"]],
  ["radio", ["radio-card-*.tsx"]],
])

const importReplacements = new Map([
  [
    'import { DecorativeBox } from "compositions/lib/decorative-box"',
    'import { Box } from "@chakra-ui/react"',
  ],
])

const componentReplacements = new Map([["DecorativeBox", "Box"]])

const nativeDependencies = new Set(["@chakra-ui/react", "react", "react-dom"])

function refine(str: string) {
  return str.replaceAll("compositions/ui", "@/components/ui")
}

export class ProjectSdk {
  #project: Project

  constructor() {
    this.#project = new Project({
      skipLoadingLibFiles: true,
      useInMemoryFileSystem: true,
    })
  }

  get rootPath(): string {
    const root = findUpSync("pnpm-workspace.yaml")
    if (!root) throw new ReferenceError("Could not find project root path")
    return root
  }

  get publicPath(): string {
    const dir = findUpSync("public", { type: "directory" })
    if (!dir) throw new ReferenceError("Could not find public directory")
    return dir
  }

  get compositionsDir(): string {
    const dir = findUpSync("compositions", { type: "directory" })
    if (!dir) throw new ReferenceError("Could not find compositions directory")
    return dir
  }

  get componentDir(): string {
    const rootDir = dirname(this.rootPath)
    return resolve(rootDir, "packages", "react", "src", "components")
  }

  get examplesDir(): string {
    return resolve(this.compositionsDir, "src", "examples")
  }

  get components(): string[] {
    const componentDir = this.componentDir
    const dirs = readdirSync(componentDir)
    return dirs.filter((v) => !extname(v).startsWith(".ts"))
  }

  getSnippetPath(component: string): string {
    return join(this.compositionsDir, "src", "ui", `${component}.tsx`)
  }

  getSnippetImportPath(component: string): string {
    return join("compositions", "ui", component)
  }

  private createSourceFile(path: string, content: string) {
    const existingSourceFile = this.#project.getSourceFile(path)
    if (existingSourceFile) this.#project.removeSourceFile(existingSourceFile)
    return this.#project.createSourceFile(path, content)
  }

  private getImportSpecifiers(content: string): string[] {
    const sourceFile = this.createSourceFile("example.tsx", content)
    const imports = sourceFile.getImportDeclarations()
    return imports.map((importDecl) =>
      importDecl.getModuleSpecifier().getLiteralText(),
    )
  }

  isImportFromModule(content: string, moduleName: string): boolean {
    const imports = this.getImportSpecifiers(content)
    return imports.some((importDecl) => importDecl === moduleName)
  }

  getImportPaths(content: string): string[] {
    const sourceFile = this.createSourceFile("example.tsx", content)
    const imports = sourceFile.getImportDeclarations()
    return imports.map((importDecl) => {
      const text = importDecl.getText()
      return importReplacements.get(text) || text
    })
  }

  stripImports(content: string): string {
    const sourceFile = this.createSourceFile("example.tsx", content)
    sourceFile.getImportDeclarations().forEach((importDecl) => {
      importDecl.remove()
    })
    let text = sourceFile.getText()
    componentReplacements.forEach((replacement, component) => {
      text = text.replaceAll(component, replacement)
    })
    return text
  }

  mergeImports(imports: string[]): string[] {
    const importsByModule = new Map<
      string,
      {
        types: Set<string>
        values: Set<string>
      }
    >()

    for (const importStr of imports) {
      const tempFile = this.createSourceFile("temp.tsx", importStr)
      const decl = tempFile.getImportDeclarations()[0]
      if (!decl) continue

      const mod = decl.getModuleSpecifier().getLiteralText()
      if (!importsByModule.has(mod)) {
        importsByModule.set(mod, { types: new Set(), values: new Set() })
      }

      const groups = importsByModule.get(mod)!
      decl.getNamedImports().forEach((named) => {
        const isTypeOnly = named.isTypeOnly() || decl.isTypeOnly()
        const name = named.getText()
        if (isTypeOnly) groups.types.add(name)
        else groups.values.add(name)
      })
    }

    const result: string[] = []

    for (const [moduleSpecifier, { types, values }] of importsByModule) {
      const typeImports = Array.from(types).sort()
      const valueImports = Array.from(values).sort()
      if (typeImports.length > 0) {
        result.push(
          `import type { ${typeImports.join(", ")} } from "${moduleSpecifier}"`,
        )
      }
      if (valueImports.length > 0) {
        result.push(
          `import { ${valueImports.join(", ")} } from "${moduleSpecifier}"`,
        )
      } else if (typeImports.length === 0) {
        // If no named imports at all, keep original side-effect import
        result.push(`import "${moduleSpecifier}"`)
      }
    }
    return result
  }

  getExamples(component: string): Promise<string[]> {
    const ignore = excludeSet.get(component) ?? []
    return glob(`${component}-*.tsx`, {
      cwd: this.examplesDir,
      ignore: ignore.concat("*-table.tsx"),
    })
  }

  hasSnippet(content: string, component: string): boolean {
    const importPath = this.getSnippetImportPath(component)
    return this.isImportFromModule(content, importPath)
  }

  parseExample(component: string, file: string): ParseExampleResult {
    const content = readFileSync(resolve(this.examplesDir, file), "utf-8")
    const hasSnippet = this.hasSnippet(content, component)
    const { npmDependencies, fileDependencies } = this.getDependencies(content)

    const importPaths = this.getImportPaths(content).map(refine)

    const snippetImportPath = refine(this.getSnippetImportPath(component))

    const importPath =
      importPaths.find((path) => path.includes(snippetImportPath)) ||
      `import { ${component.split("-").map(trainCase).join("")} } from "@chakra-ui/react"`

    const finalContent = this.stripImports(content)
    const finalName = parse(file).name

    return {
      name: finalName,
      content: finalContent,
      hasSnippet,
      importPaths,
      importPath,
      npmDependencies,
      fileDependencies,
    }
  }

  async parseExamples(component: string): Promise<ParseExampleResult[]> {
    const examples = await this.getExamples(component)
    return Promise.all(
      examples.map((file) => this.parseExample(component, file)),
    )
  }

  getSnippetCode(component: string): string | null {
    const snippetPath = this.getSnippetPath(component)
    if (!existsSync(snippetPath)) return null
    return refine(readFileSync(snippetPath, "utf-8"))
  }

  private isNpmDependency(dependencies: string[], importString: string) {
    return dependencies.some((dep) => importString.includes(dep))
  }

  private isFileDependency(importString: string) {
    return (
      importString.startsWith(".") || importString.startsWith("compositions/ui")
    )
  }

  private getInstalledDependencies(): string[] {
    const pkgJson = readFileSync(
      join(this.compositionsDir, "package.json"),
      "utf-8",
    )
    return Object.keys(JSON.parse(pkgJson).dependencies).filter(
      (dep) => !nativeDependencies.has(dep),
    )
  }

  getDependencies(content: string): SnippetDependencies {
    const imports = this.getImportSpecifiers(content)
    const dependencies = this.getInstalledDependencies()

    const fileDependencies: string[] = []
    const npmDependencies: string[] = []

    imports.forEach((mod) => {
      if (this.isNpmDependency(dependencies, mod)) {
        const resolved = dependencies.find((dep) => mod.startsWith(dep))
        if (resolved) npmDependencies.push(resolved)
      } else if (this.isFileDependency(mod)) {
        fileDependencies.push(mod)
      }
    })

    return {
      npmDependencies: npmDependencies.length ? npmDependencies : undefined,
      fileDependencies: fileDependencies.length ? fileDependencies : undefined,
    }
  }
}

export interface ParseExampleResult extends SnippetDependencies {
  name: string
  content: string
  hasSnippet: boolean
  importPaths: string[]
  importPath?: string | undefined
}

export interface SnippetDependencies {
  npmDependencies?: string[] | undefined
  fileDependencies?: string[] | undefined
}
