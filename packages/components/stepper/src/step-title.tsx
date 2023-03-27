import { chakra } from "@chakra-ui/system"
import { useStepContext } from "./step-context"

export type StepTitleProps = {
  children: React.ReactNode
}

export function StepTitle(props: StepTitleProps) {
  const { children, ...rest } = props
  const { status } = useStepContext()
  return (
    <chakra.h5
      fontWeight="bold"
      data-status={status}
      sx={{
        "&[data-status=incomplete]": { color: "gray.500" },
      }}
      {...rest}
    >
      {children}
    </chakra.h5>
  )
}
