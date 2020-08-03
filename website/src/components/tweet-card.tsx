import { Avatar, Box } from "@chakra-ui/core"
import * as React from "react"

interface TweetCardProps {
  name: string
  image: string
  handle: string
  date: string
  url: string
  content: string
}

function TweetCard(props: TweetCardProps) {
  const { name, image, handle, date, content, url } = props
  return (
    <Box
      as="a"
      href={url}
      target="_blank"
      display="flex"
      rounded="lg"
      p="5"
      mb="4"
      shadow="base"
    >
      <Avatar mr="16px" size="sm" src={image} name={name} />
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
            __html: content.replace(/--/g, "<br /><br />"),
          }}
        />
      </Box>
    </Box>
  )
}

export default TweetCard
