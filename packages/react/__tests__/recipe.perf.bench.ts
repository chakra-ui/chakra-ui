import { bench } from "vitest"
import { createSystem, defaultConfig } from "../src"

const system = createSystem(defaultConfig)

const buttonConfig = system.getRecipe("button")
const badgeConfig = system.getRecipe("badge")
const skeletonConfig = system.getRecipe("skeleton")
const checkboxConfig = system.getSlotRecipe("checkbox")

// Use a global variable to prevent optimization from removing the work
let globalSum = 0

const track = (value: object) => {
  globalSum += Object.keys(value).length
}

/* -----------------------------------------------------------------------------
 * Recipe compilation cost (mirrors the per-instance path in useRecipe today)
 * -----------------------------------------------------------------------------*/

bench(
  "compile keyed recipe per instance (button x150)",
  () => {
    for (let i = 0; i < 150; i++) {
      const recipe = system.cva(structuredClone(buttonConfig))
      track(recipe({ variant: "solid", size: "md" }))
    }
  },
  { baseline: true } as any,
)

bench("compile keyed recipe once, resolve x150 (button)", () => {
  const recipe = system.cva(structuredClone(buttonConfig))
  for (let i = 0; i < 150; i++) {
    track(recipe({ variant: "solid", size: "md" }))
  }
})

bench("compile keyed recipe per instance (badge x100)", () => {
  for (let i = 0; i < 100; i++) {
    const recipe = system.cva(structuredClone(badgeConfig))
    track(recipe({ variant: "solid" }))
  }
})

bench("compile keyed recipe per instance (skeleton x1050)", () => {
  for (let i = 0; i < 1050; i++) {
    const recipe = system.cva(structuredClone(skeletonConfig))
    track(recipe({}))
  }
})

/* -----------------------------------------------------------------------------
 * Compiled recipe execution cost (variant resolution)
 * -----------------------------------------------------------------------------*/

const compiledButton = system.cva(structuredClone(buttonConfig))

bench("resolve compiled recipe, same variants x150 (button)", () => {
  for (let i = 0; i < 150; i++) {
    track(compiledButton({ variant: "solid", size: "md" }))
  }
})

bench("resolve compiled recipe, mixed variants x150 (button)", () => {
  const variants = [
    { variant: "solid", size: "md" },
    { variant: "outline", size: "sm" },
    { variant: "ghost", size: "lg" },
  ]
  for (let i = 0; i < 150; i++) {
    track(compiledButton(variants[i % variants.length]))
  }
})

/* -----------------------------------------------------------------------------
 * Slot recipe compilation + execution cost
 * -----------------------------------------------------------------------------*/

bench("compile slot recipe per instance (checkbox x150)", () => {
  for (let i = 0; i < 150; i++) {
    const recipe = system.sva(structuredClone(checkboxConfig))
    track(recipe({ variant: "solid", size: "md" }))
  }
})

const compiledCheckbox = system.sva(structuredClone(checkboxConfig))

bench("resolve compiled slot recipe, same variants x150 (checkbox)", () => {
  for (let i = 0; i < 150; i++) {
    track(compiledCheckbox({ variant: "solid", size: "md" }))
  }
})

/* -----------------------------------------------------------------------------
 * structuredClone isolated cost
 * -----------------------------------------------------------------------------*/

bench("structuredClone recipe config x150 (button)", () => {
  for (let i = 0; i < 150; i++) {
    track(structuredClone(buttonConfig))
  }
})
