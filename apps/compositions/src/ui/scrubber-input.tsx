import { Group, Icon, InputElement, NumberInput } from "@chakra-ui/react"
import { Tooltip } from "compositions/ui/tooltip"
import { forwardRef } from "react"

export interface StepperInputProps extends NumberInput.InputProps {
  label: React.ReactNode
  icon: React.ReactNode
  rootProps?: NumberInput.RootProps
}

export const ScrubberInput = forwardRef<HTMLInputElement, StepperInputProps>(
  function ScrubberInput(props, ref) {
    const { label, icon, rootProps, ...rest } = props
    return (
      <NumberInput.Root variant="outline" maxW="120px" {...rootProps}>
        <Tooltip content={label}>
          <Group width="full">
            <InputElement>
              <NumberInput.Scrubber>
                <Icon asChild color="fg.muted">
                  {icon}
                </Icon>
              </NumberInput.Scrubber>
            </InputElement>
            <NumberInput.Input cursor="default" ps="10" ref={ref} {...rest} />
          </Group>
        </Tooltip>
      </NumberInput.Root>
    )
  },
)
