import { Tag } from "@chakra-ui/react"

export const TagWithOverflow = () => {
  return (
    <Tag.Root size="sm" colorPalette="blue" maxW="200px">
      <Tag.Label>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        molestias, laboriosam, quod, quia quidem quae voluptatem natus
        exercitationem autem quibusdam
      </Tag.Label>
      <Tag.EndElement>
        <Tag.CloseTrigger />
      </Tag.EndElement>
    </Tag.Root>
  )
}
