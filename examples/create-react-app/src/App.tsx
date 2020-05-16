import React from "react"
import logo from "./logo.svg"
import { Button, chakra, Badge } from "@chakra-ui/core"

function App() {
  return (
    <div>
      <chakra.header display="flex" flexDir="column" alignItems="center">
        <chakra.img src={logo} alt="logo" boxSize="200px" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button colorScheme="blue" size="sm">
          Welcome
        </Button>
        <chakra.a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </chakra.a>
        <Badge colorScheme="red" variant="outline">
          Welcome home
        </Badge>
      </chakra.header>
    </div>
  )
}

export default App
