import { Avatar, Box, useColorModeValue } from "@chakra-ui/core"

type TweetCardProps = {
  name: string
  image: string
  handle: string
  date: string
  url: string
  content: string
}

export function TweetCard(props: TweetCardProps): JSX.Element {
  const { name, handle, date, content, url } = props
  const image = `/avatars/${handle}.jpg`
  return (
    <Box
      as="a"
      href={url}
      target="_blank"
      rel="noopener"
      display="flex"
      rounded="lg"
      p="5"
      mb="4"
      bg={useColorModeValue("white", "gray.700")}
      shadow="base"
    >
      <Avatar mr="16px" size="sm" src={image} name={name} loading="lazy" />
      <Box fontSize="sm">
        <p>
          {name}{" "}
          <Box as="span" opacity={0.7}>
            {handle} · {date}
          </Box>
        </p>
        <Box
          as="p"
          mt="2"
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line unicorn/prefer-replace-all
            __html: content.replace(/--/gu, "<br /><br />"),
          }}
        />
      </Box>
    </Box>
  )
}
