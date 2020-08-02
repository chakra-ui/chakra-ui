import * as React from "react"
import { Box, Alert, AlertIcon } from "@chakra-ui/core"

function App() {
  return (
    <div>
      <Box>Welcome</Box>
      <Alert status="success">
        <AlertIcon />
        Alert throws type error
      </Alert>
    </div>
  )
}

export default App
