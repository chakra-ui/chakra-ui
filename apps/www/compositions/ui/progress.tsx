import { Progress as ChakraProgress } from "@chakra-ui/react"
import { forwardRef } from "react"

export const Progress = forwardRef<HTMLDivElement, ChakraProgress.RootProps>(
  function Progress(props, ref) {
    return (
      <ChakraProgress.Root ref={ref} {...props}>
        <ChakraProgress.Track>
          <ChakraProgress.Range />
        </ChakraProgress.Track>
      </ChakraProgress.Root>
    )
  },
)
