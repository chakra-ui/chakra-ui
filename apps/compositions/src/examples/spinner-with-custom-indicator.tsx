import { For, HStack, Spinner, Stack } from "@chakra-ui/react"
import { ImSpinner6, ImSpinner9 } from "react-icons/im"
import { PiSpinnerGapLight } from "react-icons/pi"

export const SpinnerWithCustomIndicator = () => (
  <Stack>
    <For each={[ImSpinner6, PiSpinnerGapLight, ImSpinner9]}>
      {(Icon, i) => (
        <HStack key={i}>
          <For each={["xs", "sm", "md", "lg", "xl"]}>
            {(size, j) => (
              <Spinner
                asChild
                key={`${i}-${j}`}
                borderWidth="0"
                color="cyan.800"
                size={size}
                animationDuration="1s"
              >
                <Icon />
              </Spinner>
            )}
          </For>
        </HStack>
      )}
    </For>
  </Stack>
)
