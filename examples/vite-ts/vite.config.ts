import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@chakra-ui/utils": resolve("..", "..", "packages/utils/src"),
      "@chakra-ui/react": resolve("..", "..", "packages/react/src"),
      "@chakra-ui/hooks": resolve("..", "..", "packages/hooks/src"),
    },
  },
})
