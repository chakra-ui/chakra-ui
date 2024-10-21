import { Box, type BoxProps } from "@chakra-ui/react"

export const Ol = (props: BoxProps) => {
  return (
    <Box
      as="ol"
      css={{
        marginTop: "1em",
        marginBottom: "1em",
        paddingInlineStart: "1.5em",
        "& > li": {
          paddingInlineStart: "0.4em",
          listStyleType: "decimal",
          "&::marker": {
            color: "fg.subtle/50",
          },
        },
        "& ol, & ul": {
          marginTop: "0.5em",
          marginBottom: "0.5em",
        },
      }}
      {...props}
    />
  )
}

export const Ul = (props: BoxProps) => {
  return (
    <Box
      as="ul"
      css={{
        marginTop: "1em",
        marginBottom: "1em",
        paddingInlineStart: "1.5em",
        "& > li": {
          paddingInlineStart: "0.4em",
          listStyleType: "disc",
          "&::marker": {
            color: "fg.subtle/50",
          },
        },
        "& ol, & ul": {
          marginTop: "0.5em",
          marginBottom: "0.5em",
        },
      }}
      {...props}
    />
  )
}

export const Li = (props: BoxProps) => {
  return <Box as="li" css={{ marginY: "0.8em" }} {...props} />
}
