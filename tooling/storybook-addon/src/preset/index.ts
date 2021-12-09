import { withEmotionVersionFallback } from "./emotion-fallback"

export function config(entry = []) {
  return [
    ...entry,
    require.resolve("@chakra-ui/storybook-addon/preset/decorators"),
  ]
}

export function managerEntries(entry = []) {
  return [
    ...entry,
    require.resolve("@chakra-ui/storybook-addon/preset/register"),
  ]
}

export function webpackFinal(config: any) {
  return withEmotionVersionFallback(config)
}
