import { forwardRef } from "react"
import { Progress as ChakraProgress } from "../src"

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
