import { Alert, Link, Stack } from "@chakra-ui/react"
import { LuPercent } from "react-icons/lu"

export const AlertWithCustomization = () => {
  return (
    <Stack gap="4">
      <Alert.Root title="Success" status="success">
        <Alert.Indicator>
          <LuPercent />
        </Alert.Indicator>
        <Alert.Content color="fg">
          <Alert.Title>Black Friday Sale (20% off)</Alert.Title>
          <Alert.Description>
            Upgrade your plan to get access to the sale.
          </Alert.Description>
        </Alert.Content>
        <Link alignSelf="center" fontWeight="medium">
          Upgrade
        </Link>
      </Alert.Root>

      <Alert.Root
        size="sm"
        borderStartWidth="3px"
        borderStartColor="colorPalette.solid"
        alignItems="center"
        title="Success"
        status="success"
      >
        <LuPercent />
        <Alert.Title textStyle="sm">
          Heads up: Black Friday Sale (20% off)
        </Alert.Title>
      </Alert.Root>
    </Stack>
  )
}
