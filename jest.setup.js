let id = 0

/*
 * Mock out the `useId` function for consistent results in snapshots.
 */
beforeEach(() => {
  jest.unmock("@chakra-ui/hooks")
  const hooks = require("@chakra-ui/hooks")
  hooks.useId = (idProp = ++id, prefix) =>
    prefix ? `${prefix}-${idProp}` : idProp
})

afterEach(() => {
  id = 0
})
