import { BlitzFillIcon } from "@/components/site/icons"
import {
  HStack,
  Heading,
  HeadingProps,
  Highlight,
  StackProps,
  Text,
  TextProps,
  defineStyle,
} from "@chakra-ui/react"

const styles = defineStyle({
  color: { _light: "teal.600", _dark: "teal.500" },
  position: "relative",
  px: "2",
  display: "inline-block",
  _before: {
    position: "absolute",
    content: "''",
    w: "full",
    h: "full",
    bg: "teal.500/10",
    roundedStart: "md",
    pointerEvents: "none",
    bottom: "-0.5",
    insetInlineStart: "0",
    borderEndWidth: "2px",
    borderColor: "currentColor",
  },
})

interface HighlightHeadingProps extends HeadingProps {
  query: string
  children: string
}

export const HighlightHeading = (props: HighlightHeadingProps) => {
  const { query, children, ...rest } = props
  return (
    <Heading textStyle={{ base: "4xl", md: "5xl" }} {...rest}>
      <Highlight query={query} styles={styles}>
        {children}
      </Highlight>
    </Heading>
  )
}

export const Subheading = (props: TextProps) => (
  <Text textStyle="xl" color="fg.muted" maxW="2xl" {...props} />
)

interface BlitzHeadingProps extends StackProps {}

export const BlitzHeading = (props: BlitzHeadingProps) => {
  const { children, ...rest } = props
  return (
    <HStack gap="4" color={{ _light: "teal.600", _dark: "teal.500" }} {...rest}>
      <BlitzFillIcon />
      <Text fontWeight="semibold">{children}</Text>
    </HStack>
  )
}
