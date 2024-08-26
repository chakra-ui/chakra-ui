import { docs } from ".velite"

const components = docs
  .filter((page) => page.category === "docs/components")
  .map((page) => ({
    label: page.title,
    value: page.slug,
    description: page.description,
    category: "Component",
  }))

export const data = { components }
