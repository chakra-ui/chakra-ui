import React, { StrictMode } from "react"
import { render } from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ChakraProvider } from "@chakra-ui/core"

render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
