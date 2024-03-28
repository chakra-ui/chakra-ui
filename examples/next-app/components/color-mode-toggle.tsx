"use client"

import { IconButton } from "@chakra-ui/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <IconButton aria-label="toggle color mode" onClick={toggleColorMode}>
      {theme === "light" ? <Moon /> : <Sun />}
    </IconButton>
  )
}
