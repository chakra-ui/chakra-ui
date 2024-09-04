import { transform } from "@svgr/core"
import { readFileSync, writeFileSync } from "fs"
import { format } from "prettier"

const html = String.raw

/* -----------------------------------------------------------------------------
 *  Edit code here
 * -----------------------------------------------------------------------------*/

const name = "Blockquote"

// prettier-ignore
const svgCode = html`
<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="85" y="112" width="6" height="67" fill="#16402D"/>
<rect x="108" y="116" width="207" height="10" fill="#2C7A51"/>
<rect x="108" y="140" width="207" height="10" fill="#2C7A51"/>
<rect x="142" y="164" width="173" height="10" fill="#2C7A51"/>
<line x1="107" y1="168.5" x2="131" y2="168.5" stroke="#16402D"/>
</svg>
`

/* -----------------------------------------------------------------------------
 * Implmentation
 * -----------------------------------------------------------------------------*/

function toDashCase(str: string) {
  return str
    .replace(/([A-Z])/g, "-$1")
    .replace(/^-/, "")
    .toLowerCase()
}

const dashName = toDashCase(name)

const defaultPalette = {
  0: "white",
  1: "#2CFF80", //accentColor
  2: "#2C7A51",
  3: "#16402D",
  4: "#1C4D37",
  5: "#287753",
  6: "#1F8B56",
  7: "#2AB26B",
  8: "#1E6943",
  9: "#C1FFDF",
  10: "#41B883",
  11: "#299464",
  12: "#2AB36B",
  13: "#9FFFCD",
  14: "#0E432B",
  15: "#D9D9D9",
}

function findColors(code: string) {
  const pattern = /"#.*?"/g
  const matches = code.match(pattern) || []
  return Array.from(new Set(matches.map((match) => match.slice(1, -1))))
}

function replaceColors(code: string) {
  const colors = findColors(code)

  if (colors.length === 0) {
    return code.replaceAll(`"white"`, `{palette[0]}`)
  }

  const regex = new RegExp(
    colors
      .map((c) => `"${c}"`)
      .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "g",
  )

  return code
    .replace(regex, (c) => {
      const num = Object.entries(defaultPalette).find(
        (cc) => `"${cc[1]}"` === c,
      )
      return `{palette[${num?.[0]}]}`
    })
    .replaceAll(`"white"`, `{palette[0]}`)
}

export const main = async () => {
  const jsxCode = transform.sync(svgCode, {
    plugins: ["@svgr/plugin-jsx"],
  })

  let template = `
import { createComponent } from "./create-component"

export const ${name}Anatomy = createComponent((props) => {
    const { palette, ...rest } = props
    return (
        ${jsxCode
          .replace('import * as React from "react";\n', "")
          .replace("const SvgComponent = props =>", "")
          .replace("export default SvgComponent;", "")
          .replace("{...props}", "{...rest}")
          .replace("</svg>;", "</svg>")}
    )
})
`

  template = await format(replaceColors(template), { parser: "typescript" })

  if (process.argv.includes("--dry-run")) {
    console.log(template)
    process.exit(0)
  }

  writeFileSync(`./components/illustrations/${dashName}.tsx`, template, "utf-8")

  const content = readFileSync(
    "./components/illustrations/index.ts",
    "utf-8",
  ).replace(
    "\n\nexport const allComponents = {",
    `
import { ${name}Anatomy } from "./${dashName}"

export const allComponents = {
 "${dashName}": ${name}Anatomy,`,
  )

  writeFileSync("./components/illustrations/index.ts", content, "utf-8")
}

main().catch(console.error)
