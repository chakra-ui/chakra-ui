import { HStack, Icon, Stack, Text } from "@chakra-ui/react"
import { LuArrowUpRight } from "react-icons/lu"
import { ResourceIcon } from "../resource-icon"

interface ResourceCardProps {
  type: string
  title: string
  url: string
  description?: string
}

export const ResourceCard = (props: ResourceCardProps) => {
  const { type, title, url, description, ...rest } = props
  return (
    <HStack
      borderWidth="1px"
      padding="4"
      borderRadius="md"
      gap="4"
      asChild
      {...rest}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <ResourceIcon type={type} />
        <Stack gap="1" flex="1">
          <Text fontWeight="medium" flex="1" color="fg" textStyle="sm">
            {title}
          </Text>
          {description && (
            <Text textStyle="sm" color="fg.muted/80">
              {description}
            </Text>
          )}
        </Stack>
        <Icon>
          <LuArrowUpRight />
        </Icon>
      </a>
    </HStack>
  )
}
