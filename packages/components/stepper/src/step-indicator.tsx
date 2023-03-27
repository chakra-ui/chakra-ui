import { chakra } from "@chakra-ui/system"
import { useStepContext } from "./step-context"

export type StepIndicatorProps = {
  children: React.ReactNode
}

export function StepIndicator(props: StepIndicatorProps) {
  const { children, ...rest } = props
  const { status } = useStepContext()
  const isCompleted = status === "completed"

  return (
    <chakra.div
      rounded="full"
      boxSize="24px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      data-status={status}
      sx={{
        "&[data-status=active]": { border: "2px solid tomato" },
        "&[data-status=completed]": { bg: "tomato", color: "white" },
        "&[data-status=incomplete]": { border: "2px solid gray" },
      }}
      {...rest}
    >
      {isCompleted ? children : null}
    </chakra.div>
  )
}
