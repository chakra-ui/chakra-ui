import * as React from "react"
import { useScrollSpy } from "hooks/use-scrollspy"
import { Heading } from "utils/get-headings"
import {
  Box,
  ListItem,
  OrderedList,
  chakra,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

interface SectionNavigationProps {
  headings: Heading[]
}

function SectionNavigation(props: SectionNavigationProps) {
  const { headings } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -24% 0%",
    },
  )
  return (
    <Box
      width="200px"
      flexShrink={0}
      display={{ base: "none", lg: "block" }}
      position="sticky"
      py="6"
      pr="4"
      top="6rem"
      right="0"
      fontSize="sm"
      alignSelf="start"
      maxHeight="calc(100vh - 8rem)"
      overflowY="auto"
      sx={{ overscrollBehavior: "contain" }}
    >
      <Text
        textTransform="uppercase"
        fontWeight="bold"
        color="gray.500"
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
              transitionDuration="200ms"
              _hover={{ color: "gray.900" }}
              fontWeight="medium"
              href={`#${id}`}
              aria-label="anchor"
              color={
                id === activeId
                  ? useColorModeValue("teal.500", "teal.300")
                  : useColorModeValue("gray.600", "gray.400")
              }
            >
              {text}
            </chakra.a>
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}

export default SectionNavigation
