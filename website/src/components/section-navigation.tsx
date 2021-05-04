import * as React from "react"
import { useScrollSpy } from "hooks/use-scrollspy"
import { Heading } from "utils/get-headings"
import { Box, ListItem, OrderedList, chakra } from "@chakra-ui/react"

interface SectionNavigationProps {
  headings: Heading[]
}

function SectionNavigation(props: SectionNavigationProps) {
  const { headings } = props
  const activeId = useScrollSpy(
    headings.map(({ id }) => `#${id}`),
    {
      rootMargin: "0% 0% -50% 0%",
    },
  )
  return (
    <Box
      display={{ base: "none", lg: "block" }}
      position="sticky"
      top={24}
      right={0}
      fontSize="12px"
      alignSelf="start"
    >
      <OrderedList spacing={1} styleType="none">
        {headings.map(({ id, text }) => (
          <ListItem key={id} px={2} title={text}>
            <chakra.a
              href={`#${id}`}
              aria-label="anchor"
              color={id === activeId ? "teal.500" : "black"}
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
