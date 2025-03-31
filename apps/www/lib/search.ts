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

const charts = docs
  .filter((page) => page.category.startsWith("docs/charts"))
  .map((page) => ({
    label: page.title === "Charts" ? "Get Started" : page.title,
    value: page.slug,
    description: page.description,
    category: "Charts",
  }))

export const data = { getStarted, styling, theming, components, charts }
