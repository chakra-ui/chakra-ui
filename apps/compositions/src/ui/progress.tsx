import { Progress as ChakraProgress, IconButton } from "@chakra-ui/react"
import { HiOutlineInformationCircle } from "react-icons/hi"
import { ToggleTip } from "./toggle-tip"

export const ProgressBar = (props: ChakraProgress.TrackProps) => {
  return (
    <ChakraProgress.Track {...props}>
      <ChakraProgress.Range />
    </ChakraProgress.Track>
  )
}

export const ProgressRoot = ChakraProgress.Root
export const ProgressValueText = ChakraProgress.ValueText

export interface ProgressLabelProps extends ChakraProgress.LabelProps {
  info?: React.ReactNode
}

export const ProgressLabel = (props: ProgressLabelProps) => {
  const { children, info, ...rest } = props
  return (
    <ChakraProgress.Label {...rest}>
      {children}
      {info && (
        <ToggleTip content={info}>
          <IconButton variant="ghost" aria-label="info" size="xs">
            <HiOutlineInformationCircle />
          </IconButton>
        </ToggleTip>
      )}
    </ChakraProgress.Label>
  )
}
