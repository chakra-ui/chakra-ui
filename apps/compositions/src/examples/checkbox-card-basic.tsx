import { HStack, Label, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardGroup,
  CheckboxCardItem,
  CheckboxCardLabel,
} from "compositions/ui/checkbox-card"

const items = [
  {
    value: "github",
    title: "GitHub",
    description: "Best for OSS projects",
  },
  {
    value: "github",
    title: "GitLab",
    description: "Best for private projects",
  },
  {
    value: "bitbucket",
    title: "Bitbucket",
    description: "Best for enterprise projects",
  },
]

export const CheckboxCardBasic = () => {
  return (
    <CheckboxCardGroup width="full" defaultValue={["React"]}>
      <Label> Select platform(s)</Label>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <CheckboxCardItem key={item.value} value={item.value} flex="1">
            <Stack gap="0" flex="1">
              <CheckboxCardLabel>{item.title}</CheckboxCardLabel>
              <Text color="fg.muted">{item.description}</Text>
            </Stack>
          </CheckboxCardItem>
        ))}
      </HStack>
    </CheckboxCardGroup>
  )
}
