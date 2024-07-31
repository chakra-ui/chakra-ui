import { HStack, Icon } from "@chakra-ui/react"
import { StatLabel, StatRoot, StatValueText } from "compositions/ui/stat"
import { LuDollarSign } from "react-icons/lu"

export const StatWithIcon = () => {
  return (
    <StatRoot maxW="240px" borderWidth="1px" p="4" rounded="md">
      <HStack justify="space-between">
        <StatLabel>Sales</StatLabel>
        <Icon asChild color="fg.subtle">
          <LuDollarSign />
        </Icon>
      </HStack>
      <StatValueText>$4.24k</StatValueText>
    </StatRoot>
  )
}
