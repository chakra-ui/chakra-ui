import { ChakraProvider, useToast, extendTheme } from "@chakra-ui/react"
import { extension } from "theme"
import { useState } from "react"
import { CustomizableThemeContext, File } from "./helpers"

const initialTheme = extendTheme(extension)
console.log(initialTheme)

export function CustomizableThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  return (
    <ChakraProvider theme={theme}>
      <CustomizableThemeContextProvider setTheme={setTheme}>
        {children}
      </CustomizableThemeContextProvider>
    </ChakraProvider>
  )
}

/**
 * Render as a child of <ChakraProvider /> to get theme
 */
function CustomizableThemeContextProvider({ setTheme, children }) {
  const toast = useToast()

  function updateThemeFromFile(file: File) {
    const finalTheme = extendTheme(extension, file.localModule.exports)
    console.log(finalTheme)
    setTheme(finalTheme)
    toast({
      title: `Custom Theme Applied`,
      description: `From Gist ID (${file.gistId})`,
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <CustomizableThemeContext.Provider value={updateThemeFromFile}>
      {children}
    </CustomizableThemeContext.Provider>
  )
}
