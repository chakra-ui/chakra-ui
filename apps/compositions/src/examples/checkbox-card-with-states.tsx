import { type CheckboxCardRootProps, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardWithStates = () => {
  return (
    <Stack>
      <DemoCheckboxCard />
      <DemoCheckboxCard defaultChecked />
      <DemoCheckboxCard disabled />
      <DemoCheckboxCard defaultChecked disabled />
      <DemoCheckboxCard invalid />
    </Stack>
  )
}

const DemoCheckboxCard = (props: CheckboxCardRootProps) => {
  return (
    <CheckboxCardRoot maxW="240px" {...props}>
      <CheckboxCardControl>
        <Stack gap="0" flex="1">
          <CheckboxCardLabel>Next.js</CheckboxCardLabel>
          <Text color="fg.muted">Best for apps</Text>
        </Stack>
      </CheckboxCardControl>
    </CheckboxCardRoot>
  )
}
