/**
 * Checks the component illustrations used by the docs component grid.
 *
 *   pnpm check:illustrations            coverage + style check
 *   pnpm check:illustrations a b        style-check only illustrations a and b
 *   pnpm check:illustrations --sheet    also writes a reference-vs-new PNG
 *
 * Coverage: every page in content/docs/components needs an illustration.
 * Style: an illustration that starts with `// illustration-ref: <name>` is
 * compared with that original illustration: footprint, ink and palette slots.
 */
import { readFileSync, readdirSync } from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import { join } from "node:path"
import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { allComponents } from "../components/illustrations"

Object.assign(globalThis, { React })

const root = join(__dirname, "..")
const dir = join(root, "components/illustrations")
const BG = 0xf4 // card background (bg.muted) in light mode
const PALETTE = new Set(["0", "2", "3", "5", "15"])
const AREA = [0.6, 1.5] // allowed footprint ratio vs the reference
const INK = [0.8, 1.5] // allowed ink ratio vs the reference

const has = (name: string) => Object.hasOwn(allComponents, name)
const source = (name: string) => readFileSync(join(dir, `${name}.tsx`), "utf8")
const refOf = (src: string) =>
  src.match(/^\/\/ illustration-ref: ([\w-]+)/m)?.[1]
const toSvg = (name: string) =>
  renderToStaticMarkup(React.createElement(Reflect.get(allComponents, name)))

function loadSharp() {
  try {
    // ponytail: sharp ships with next, reuse it instead of adding a dependency
    return createRequire(require.resolve("next"))("sharp")
  } catch {
    return null
  }
}

async function measure(sharp: any, name: string) {
  const { data, info } = await sharp(Buffer.from(toSvg(name)))
    .flatten({ background: "#f4f4f5" })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let [x0, y0, x1, y1, ink] = [Infinity, Infinity, -1, -1, 0]
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const v = data[y * info.width + x]
      if (Math.abs(v - BG) > 6) {
        x0 = Math.min(x0, x)
        x1 = Math.max(x1, x)
        y0 = Math.min(y0, y)
        y1 = Math.max(y1, y)
      }
      ink += Math.max(0, BG - v) / 255
    }
  }
  const total = info.width * info.height
  const area = x1 < 0 ? 0 : ((x1 - x0 + 1) * (y1 - y0 + 1)) / total
  return { area, ink: ink / total }
}

async function main() {
  const errors: string[] = []
  const pairs: [string, string][] = []
  const only = process.argv.slice(2).filter((a) => !a.startsWith("-"))

  const docs = readdirSync(join(root, "content/docs/components"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""))
  for (const name of docs) {
    if (!has(name)) errors.push(`${name}: no illustration in index.ts`)
  }

  for (const name of only.length ? only : Object.keys(allComponents)) {
    if (!has(name)) {
      errors.push(`${name}: not registered in illustrations/index.ts`)
      continue
    }
    const src = source(name)
    const ref = refOf(src)
    if (!ref) {
      if (only.length) errors.push(`${name}: add // illustration-ref: <name>`)
      continue
    }
    if (ref === name || !has(ref) || refOf(source(ref))) {
      errors.push(
        `${name}: illustration-ref must name an original illustration`,
      )
      continue
    }
    pairs.push([name, ref])

    const slots = [...src.matchAll(/palette\[(\d+)\]/g)].map((m) => m[1])
    const off = [...new Set(slots.filter((s) => !PALETTE.has(s)))]
    if (off.length) {
      errors.push(`${name}: uses palette[${off}], stick to ${[...PALETTE]}`)
    }
    if (/#[0-9a-f]{3,8}\b/i.test(src)) {
      errors.push(`${name}: hardcoded hex color, use palette[...]`)
    }
  }

  const sharp = pairs.length ? loadSharp() : null
  if (pairs.length && !sharp) {
    console.warn("sharp is not installed: skipping footprint and ink checks")
  }

  if (sharp) {
    for (const [name, ref] of pairs) {
      const m = await measure(sharp, name)
      const r = await measure(sharp, ref)
      if (!m.area) {
        errors.push(`${name}: renders nothing`)
        continue
      }
      const area = m.area / r.area
      const ink = m.ink / r.ink
      if (area < AREA[0] || area > AREA[1]) {
        errors.push(
          `${name}: footprint is ${area.toFixed(2)}x ${ref} (allowed ${AREA.join("-")}x)`,
        )
      }
      if (ink < INK[0] || ink > INK[1]) {
        errors.push(
          `${name}: ink is ${ink.toFixed(2)}x ${ref} (allowed ${INK.join("-")}x)`,
        )
      }
    }
  }

  if (sharp && pairs.length && process.argv.includes("--sheet")) {
    const [w, h, gap] = [240, 180, 12]
    const cell = (name: string) =>
      sharp(Buffer.from(toSvg(name)))
        .resize(w, h)
        .flatten({ background: "#f4f4f5" })
        .png()
        .toBuffer()
    const tiles = await Promise.all(
      pairs.flatMap(([name, ref], i) =>
        [ref, name].map(async (n, j) => ({
          input: await cell(n),
          left: gap + (j + (i % 3) * 2) * (w + gap) + (i % 3) * gap * 2,
          top: gap + Math.floor(i / 3) * (h + gap),
        })),
      ),
    )
    const out = join(tmpdir(), `illustrations-sheet-${process.pid}.png`)
    await sharp({
      create: {
        width: 6 * (w + gap) + 5 * gap,
        height: Math.ceil(pairs.length / 3) * (h + gap) + gap,
        channels: 3,
        background: "#ffffff",
      },
    })
      .composite(tiles)
      .png()
      .toFile(out)
    console.log(`sheet (reference | new, 3 pairs per row): ${out}`)
  }

  if (errors.length) {
    console.error(errors.join("\n"))
    process.exit(1)
  }
  console.log(`✓ ${docs.length} components covered, ${pairs.length} checked`)
}

main()
