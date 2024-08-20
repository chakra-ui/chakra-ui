"use client"

import { chakra, useRecipe } from "@chakra-ui/react"
import AutoResize from "react-textarea-autosize"

const StyledAutoResize = chakra(AutoResize)

export const TextareaWithAutoresize = () => {
  const recipe = useRecipe({ key: "textarea" })
  const styles = recipe({ size: "sm" })
  return (
    <StyledAutoResize
      placeholder="This textarea will autoresize as you type"
      minH="initial"
      resize="none"
      overflow="hidden"
      lineHeight="inherit"
      css={styles}
    />
  )
}
