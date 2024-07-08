import { Box, Button, ButtonProps, Kbd, Span, chakra } from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuSearch } from "react-icons/lu"

export const SearchButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SearchButton(props, ref) {
    return (
      <Button variant="subtle" ref={ref} {...props}>
        <Box asChild color="fg.subtle">
          <LuSearch />
        </Box>
        <Span ms="2" fontWeight="normal" flex="1" textAlign="start">
          Search documentation
        </Span>
        <Kbd>⌘K</Kbd>
      </Button>
    )
  },
)
