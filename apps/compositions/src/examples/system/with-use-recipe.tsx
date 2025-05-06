"use client"

import { Box, useRecipe } from "@sh3yk0-ui/react"

export const SystemWithUseRecipe = () => {
  const button = useRecipe({ key: "button" })
  return <Box css={button({ size: "md" })}>Styled like a button</Box>
}
