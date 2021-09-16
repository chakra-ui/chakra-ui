import * as React from "react"
import { useScrollSpy } from "hooks/use-scrollspy"
import {
  Box,
  ListItem,
  OrderedList,
  chakra,
  Text,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react"
import { Heading } from "components/page-container"

interface TableOfContentProps extends BoxProps {
  headings: Heading[]
}

function TableOfContent(props: TableOfContentProps) {
  const { headings, ...rest } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -24% 0%",
    },
  )
  return (
    <Box
      as="nav"
      aria-labelledby="toc-title"
      width="16rem"
      flexShrink={0}
      display={{ base: "none", xl: "block" }}
      position="sticky"
      py="10"
      pr="4"
      top="6rem"
      right="0"
      fontSize="sm"
      alignSelf="start"
      maxHeight="calc(100vh - 8rem)"
      overflowY="auto"
      sx={{ overscrollBehavior: "contain" }}
      {...rest}
    >
      <Text
        as="h2"
        id="toc-title"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="xs"
        color={useColorModeValue("gray.700", "gray.400")}
        letterSpacing="wide"
      >
        On this page
      </Text>
      <OrderedList spacing={1} ml="0" mt="4" styleType="none">
        {headings.map(({ id, text, level }) => (
          <ListItem key={id} title={text} ml={level === "h3" ? "4" : undefined}>
            <chakra.a
              py="1"
              display="block"
              fontWeight={id === activeId ? "bold" : "medium"}
              href={`#${id}`}
              aria-current={id === activeId ? "location" : undefined}
              color={useColorModeValue("gray.600", "gray.400")}
              _hover={{
                color: useColorModeValue("gray.900", "gray.600"),
              }}
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}

export default TableOfContent
