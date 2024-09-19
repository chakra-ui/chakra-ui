import type { CascadeLayer, Layers, SystemConfig } from "./types"

const defaultLayers: Record<CascadeLayer, string> = {
  reset: "reset",
  base: "base",
  tokens: "tokens",
  recipes: "recipes",
}

const layerOrder = {
  reset: 0,
  base: 1,
  tokens: 2,
  recipes: 3,
}

export function createLayers(
  config: Pick<SystemConfig, "layers" | "disableLayers">,
): Layers {
  const layers = config.layers ?? defaultLayers
  const values = Object.values(layers) as CascadeLayer[]
  const names = values.sort((a, b) => layerOrder[a] - layerOrder[b])
  return {
    names: names,
    atRule: `@layer ${names.join(", ")};`,
    wrap(layer, styles) {
      if (config.disableLayers) return styles
      const params = layers[layer]
      return { [`@layer ${params}`]: styles }
    },
  }
}
