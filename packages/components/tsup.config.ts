import { defineConfig } from "tsup"

export default defineConfig({
  banner: {
    js: "'use client'",
  },
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  dts: true,
})
