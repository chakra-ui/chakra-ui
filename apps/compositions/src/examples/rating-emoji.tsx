import { RatingGroup } from "@chakra-ui/react"

const emojiMap: Record<string, string> = {
  1: "😡",
  2: "😠",
  3: "😐",
  4: "😊",
  5: "😍",
}

export const RatingEmoji = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3}>
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item
            key={index}
            index={index + 1}
            minW="9"
            filter={{ base: "grayscale(1)", _checked: "revert" }}
            transition="scale 0.1s"
            _hover={{ scale: "1.1" }}
          >
            {emojiMap[index + 1]}
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}
