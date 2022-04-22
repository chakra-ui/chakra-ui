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
  // https://github.com/polkadot-js/extension/issues/621#issuecomment-759341776
  // framer-motion uses the .mjs notation and we need to include it so that webpack will
  // transpile it for us correctly (enables using a CJS module inside an ESM).
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  })

  return config
}
