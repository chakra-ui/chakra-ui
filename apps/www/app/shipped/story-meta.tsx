import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react"
import React from "react"

interface StoryMeta {
  company: string
  logo: string
  url: string
  authorName: string
  authorAvatar: string
  authorTitle: string
  authorUrl?: string
  category: string
  publishedAt: Date
}

export interface StoryMetaProps {
  data: StoryMeta
}

const LabeledValue = (
  props: StackProps & {
    label?: string
    value?: React.ReactNode
    image?: string
  },
) => {
  const { label, value, image, ...stackProps } = props
  return (
    <Stack gap="1" {...stackProps}>
      {label && (
        <Text fontSize="xs" color="gray.500">
          {label}
        </Text>
      )}
      {value && <Box fontSize="sm">{value}</Box>}
      {image && <Image src={image} alt={label || ""} h="20" />}
    </Stack>
  )
}

function formatDate(date: Date) {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const StoryMeta = (props: StoryMetaProps) => {
  const { data } = props
  const avatar = (
    <Image
      src={data.authorAvatar}
      alt={data.authorName}
      boxSize="10"
      rounded="full"
    />
  )
  return (
    <Flex gap="10" align="center" wrap="wrap">
      <LabeledValue
        value={
          <HStack>
            {data.authorUrl ? (
              <Link href={data.authorUrl} target="_blank">
                {avatar}
              </Link>
            ) : (
              avatar
            )}
            <Stack gap="0">
              <Text fontWeight="medium">{data.authorName}</Text>
              <Text fontSize="xs">{data.authorTitle}</Text>
            </Stack>
          </HStack>
        }
      />
      <LabeledValue label="Published At" value={formatDate(data.publishedAt)} />
      <LabeledValue label="Category" value={data.category} />
      <LabeledValue
        label="Website"
        value={
          <Link href={data.url} target="_blank">
            {data.url}
          </Link>
        }
      />
      <Box bg="black" borderWidth="1px" p="2" rounded="md">
        <Image src={data.logo} alt={data.company} h="8" />
      </Box>
    </Flex>
  )
}
