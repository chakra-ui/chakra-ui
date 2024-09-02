import { docs } from ".velite"

const getStarted = docs
  .filter((page) => page.category.startsWith("docs/get-started"))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: "Get started",
  }))

const styling = docs
  .filter((page) => page.category.startsWith("docs/styling"))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: "Styling",
  }))

const theming = docs
  .filter((page) => page.category.startsWith("docs/theming"))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: "Styling",
  }))

const components = docs
  .filter((page) => page.category.startsWith("docs/components"))
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: "Component",
  }))

export const data = { getStarted, styling, theming, components }
