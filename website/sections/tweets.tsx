import { Box, chakra, Container, SimpleGrid, Stack } from "@chakra-ui/core"
import { chunk } from "@chakra-ui/utils"
import TweetCard from "components/tweet-card"
import { tweets } from "configs/tweets.json"

export default function Tweets() {
  return (
    <Box>
      <Container py="120px" maxW="1200px" px="32px">
        <chakra.h2 textStyle="heading-2" mb="48px">
          Loved by product people like you
        </chakra.h2>
        <SimpleGrid spacing="32px" columns={{ base: 1, md: 3 }}>
          {chunk(tweets, 3).map((tweetList, idx) => (
            <Stack spacing="6" key={idx}>
              {tweetList.map((tweet: any, idx) => (
                <TweetCard key={idx} {...tweet} />
              ))}
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
