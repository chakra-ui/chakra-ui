import { ChakraProvider, chakra, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./panda.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Styled primitive OUTSIDE any ChakraProvider — proves style props
        compile to static Panda CSS with no mandatory provider. */}
    <chakra.div mt="4" bg="red.500" color="white" p="4" borderRadius="lg">
      no provider, still styled
    </chakra.div>

    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
