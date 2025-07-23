import { Docs, docs } from "@/.velite"
import { colorPalettes } from "compositions/lib/color-palettes"

///////////////////////////////////////////////////////////////////////

const excludeSet = new Map([
  ["checkbox", ["checkbox-card"]],
  ["radio", ["radio-card"]],
])

export function findMatchingDocs(component: string) {
  const componentDocs = docs.filter((doc) => {
    if (excludeSet.has(component)) {
      const exclude = excludeSet.get(component)
      if (exclude && exclude.some((pattern) => doc.slug.match(pattern))) {
        return false
      }
    }
    return doc.slug.startsWith(`docs/components/${component}`)
  })
  return componentDocs
}

///////////////////////////////////////////////////////////////////////

export function parseComponent(component: string) {
  const minify = !component.includes("-full.txt")
  component = component.replace(".txt", "").replace("-full", "")
  return { minify, component }
}

///////////////////////////////////////////////////////////////////////

const colorPaletteRegex =
  /import { colorPalettes } from "compositions\/lib\/color-palettes"\n/g
const colorPaletteReplacement = JSON.stringify(colorPalettes)

export function replaceColorPalettes(content: string) {
  const hasColorPaletteImport = content.includes("lib/color-palettes")
  if (hasColorPaletteImport) {
    content = content
      .replace(colorPaletteRegex, "")
      .replace(/colorPalettes/g, colorPaletteReplacement)
  }
  return content
}

///////////////////////////////////////////////////////////////////////

const decorativeBoxRegex =
  /import { DecorativeBox } from "compositions\/lib\/decorative-box"\n/g
const boxImportRegex =
  /import\s+{\s*(?:.*,\s*)?Box(?:\s*,\s*.*)?}\s+from\s+["']@chakra-ui\/react["']/g

export function replaceDecorativeBox(content: string) {
  const hasDecorativeBoxImport = content.includes("lib/decorative-box")
  if (hasDecorativeBoxImport) {
    const isBoxImported = content.match(boxImportRegex)
    content = content.replace(
      decorativeBoxRegex,
      isBoxImported ? "" : 'import { Box } from "@chakra-ui/react"\n',
    )
    content = content.replace(/DecorativeBox/g, "Box")
  }
  return content
}

///////////////////////////////////////////////////////////////////////

export function cleanupContent(content: string) {
  content = replaceColorPalettes(content)
  content = replaceDecorativeBox(content)
  return content
}

export function minifyContent(content: string) {
  const examplesStart = content.indexOf("## Examples")
  const setupStart = content.indexOf("## Setup")
  const usageStart = content.indexOf("## Usage")
  const propsStart = content.indexOf("## Props")

  if (examplesStart !== -1 && propsStart !== -1) {
    content = content.slice(0, examplesStart) + content.slice(propsStart)
  }

  if (setupStart !== -1 && usageStart !== -1) {
    content = content.slice(0, setupStart) + content.slice(usageStart)
  }

  // Remove ::: blocks with any content inside them
  content = content.replace(/\n:::.+?[\r\n]+([\s\S]*?)[\r\n]+:::\n/g, "")

  return content
}

///////////////////////////////////////////////////////////////////////

export function getLlmContent(doc: Docs) {
  // Create the header with page information
  const pageUrl = doc.slug
  const sourceUrl = `https://raw.githubusercontent.com/chakra-ui/chakra-ui/refs/heads/main/apps/www/content/${doc.slug}.mdx`

  const category = doc.slug.split("/").slice(1, -1).join(" > ")
  const header = `# ${category} > ${doc.title}
  
  URL: ${doc.slug}
  Source: ${sourceUrl}
  
  ${doc.description}
          
  ***
  
  title: ${doc.title}
  description: ${doc.description}
  links: \n${Object.entries(doc.links)
    .map(([key, value]) => ` - ${key}: ${value}`)
    .join("\n")}
  ------------------------------------------------------------------------------------------------
  
  `

  return `${header}${doc.llm}`
}
