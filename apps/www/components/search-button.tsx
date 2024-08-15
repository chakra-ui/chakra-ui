import { Box, Button, ButtonProps, Kbd, Span } from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuSearch } from "react-icons/lu"

export const SearchButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function SearchButton(props, ref) {
    return (
      <Button variant="subtle" color="fg.muted!" ref={ref} {...props}>
        <Box asChild>
          <LuSearch />
        </Box>
        <Span ms="1" fontWeight="normal" flex="1" textAlign="start">
          Search...
        </Span>
        <Kbd
          variant="outline"
          bg="bg"
          fontSize="0.8em"
          letterSpacing="widest"
          me="-1"
        >
          ⌘K
        </Kbd>
      </Button>
    )
  },
)
