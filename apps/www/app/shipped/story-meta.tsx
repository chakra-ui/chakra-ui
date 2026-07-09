import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  Span,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { LuArrowUpRight } from "react-icons/lu"
import type { ShippedStory } from "./utils"

export interface StoryMetaProps {
  data: ShippedStory
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
  const authorUrl = data.x ? `https://x.com/${data.x}` : undefined
  const publishedAt = data.shippedAt ? new Date(data.shippedAt) : new Date()
  const avatar = (
    <Image src={data.avatar} alt={data.person} boxSize="10" rounded="full" />
  )
  return (
    <Flex gap="10" align="center" wrap="wrap">
      <LabeledValue
        value={
          <HStack>
            {authorUrl ? (
              <Link href={authorUrl} target="_blank">
                {avatar}
              </Link>
            ) : (
              avatar
            )}
            <Stack gap="0">
              <Text fontWeight="medium">{data.person}</Text>
              <Text color="fg.muted">{data.role}</Text>
            </Stack>
          </HStack>
        }
      />
      <LabeledValue label="Published At" value={formatDate(publishedAt)} />
      <LabeledValue label="Category" value={data.category} />
      <LabeledValue
        label="Website"
        value={
          <Link href={data.url} target="_blank" _icon={{ fontSize: "1em" }}>
            {data.product}
            <Span color="fg.subtle">
              <LuArrowUpRight />
            </Span>
          </Link>
        }
      />
      <Box bg="black" borderWidth="1px" p="2" rounded="md" ms="auto">
        <Image src={data.logo} alt={data.product} h="8" />
      </Box>
    </Flex>
  )
}
