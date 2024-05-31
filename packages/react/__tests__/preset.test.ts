import { createSystem, defaultConfig, defineConfig, mergeConfigs } from "../src"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: "<gray.50>" },
        },
      },
    },
  },
})

const merged = mergeConfigs(defaultConfig, customConfig)
const { token } = createSystem(merged)

describe("mergeConfigs", () => {
  test("should merge correctly", () => {
    const gray50 = token("colors.gray.50")
    expect(gray50).toMatchInlineSnapshot(`"<gray.50>"`)
  })
})
