import pandacss from "@pandacss/vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Scope Panda's source transform to the sandbox app only, so it never
    // rewrites the aliased @chakra-ui/react source in packages/react.
    pandacss({
      include: [/sandbox\/vite-ts\/src\//],
      exclude: [/node_modules/, /packages\//, /styled-system\//],
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@chakra-ui/react": resolve("..", "..", "packages/react/src"),
    },
  },
})
