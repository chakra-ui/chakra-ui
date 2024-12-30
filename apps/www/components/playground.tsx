"use client"

import { Flex, Link, Stack, StackProps, Text, chakra } from "@chakra-ui/react"
import NextLink from "next/link"
import type { JSX } from "react"

const Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" gap="5" mb={{ base: "5", sm: "8" }}>
      {children}
    </Flex>
  )
}

interface SectionTitleProps {
  children: React.ReactNode
  id: string
}

const SectionTitle = ({ children, id }: SectionTitleProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap="4"
      mt="2"
      bg="bg.muted"
      px="4"
      py="3"
      rounded="md"
      colorPalette="gray"
      textStyle="sm"
    >
      <Text fontWeight="medium" id={id}>
        <Link href={`#${id}`}>{children}</Link>
      </Text>
      <NextLink passHref legacyBehavior href={`/docs/components/${id}`}>
        <Link fontSize="sm">View in docs</Link>
      </NextLink>
    </Flex>
  )
}

const Table = chakra("table", {
  base: {
    marginBottom: "32px",
    borderCollapse: "collapse",
    "& td:not(.chakra-table__cell)": {
      paddingRight: "8",
      paddingBottom: "8",
    },
    "& th:not(.chakra-table__column-header)": {
      fontSize: "sm",
      color: "fg.muted",
    },
    "& thead td:not(.chakra-table__cell)": {
      fontSize: "sm",
      color: "fg.muted",
    },
  },
})

const SectionContent = (props: StackProps) => {
  return <Stack gap="8" {...props} />
}

interface DemoListProps {
  items: Array<{
    label: string
    component: JSX.Element
    align?: StackProps["align"]
  }>
}

const DemoList = (props: DemoListProps) => {
  const { items } = props
  return (
    <>
      {items.map(({ label, component, align }) => (
        <Stack key={label} align={align || "flex-start"} gap="5">
          <Text color="fg.muted" textStyle="sm" fontWeight="medium">
            {label}
          </Text>
          {component}
        </Stack>
      ))}
    </>
  )
}

export { DemoList, Section, SectionContent, SectionTitle, Table }
