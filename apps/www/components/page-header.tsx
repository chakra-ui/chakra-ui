import { Heading, Stack, Text } from "@chakra-ui/react"

interface PageHeaderProps {
  title: string
  description: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description } = props
  return (
    <Stack gap="4">
      <Heading as="h1" size="3xl" letterSpacing="tight">
        {title}
      </Heading>
      <Text>{description}</Text>
    </Stack>
  )
}
