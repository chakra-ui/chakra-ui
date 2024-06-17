import { For, RatingGroup, Span, chakra, useSlotRecipe } from "../src"
import { colorPalettes } from "./shared/color-palettes"
import { PlaygroundTable } from "./shared/playground-table"

export default {
  title: "Components / Rating",
  decorators: [
    (story: Function) => (
      <chakra.div mt="40px" mx="10">
        {story()}
      </chakra.div>
    ),
  ],
}

const Rating = (
  props: RatingGroup.RootProps & { icon?: React.ReactElement },
) => {
  const { icon, ...rest } = props
  return (
    <RatingGroup.Root {...rest}>
      <RatingGroup.Control>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingGroup.Item key={index} index={index + 1}>
            <RatingGroup.ItemIndicator icon={icon} />
          </RatingGroup.Item>
        ))}
      </RatingGroup.Control>
    </RatingGroup.Root>
  )
}

export const Basic = () => {
  return <Rating allowHalf defaultValue={3.5} />
}

export const Sizes = () => {
  const recipe = useSlotRecipe("ratingGroup")
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <td />
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={colorPalettes}>
          {(c) => (
            <tr>
              <td>
                <Span fontSize="sm" color="fg.muted" minW="8ch">
                  {c}
                </Span>
              </td>
              <For each={recipe.variantMap.size}>
                {(v) => (
                  <td>
                    <Rating
                      allowHalf
                      defaultValue={3.5}
                      colorPalette={c}
                      size={v}
                    />
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </PlaygroundTable>
  )
}

const HeartIcon = (props: any) => {
  return (
    <svg
      fill="currentColor"
      stroke="currentColor"
      viewBox="0 0 512 512"
      {...props}
    >
      <path d="M352 56h-1c-39.7 0-74.8 21-95 52-20.2-31-55.3-52-95-52h-1c-61.9.6-112 50.9-112 113 0 37 16.2 89.5 47.8 132.7C156 384 256 456 256 456s100-72 160.2-154.3C447.8 258.5 464 206 464 169c0-62.1-50.1-112.4-112-113z" />
    </svg>
  )
}

export const WithCustomIcon = () => {
  return (
    <Rating
      colorPalette="red"
      icon={<HeartIcon />}
      allowHalf
      count={5}
      defaultValue={3.5}
    />
  )
}

const emojiMap: Record<string, any> = {
  1: "😡",
  2: "😠",
  3: "😐",
  4: "😊",
  5: "😍",
}

export const EmojiRating = () => {
  return (
    <RatingGroup.Root defaultValue={3}>
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
