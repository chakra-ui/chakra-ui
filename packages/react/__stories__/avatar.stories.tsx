import { Avatar, AvatarGroup, Box, For, Stack, useSlotRecipe } from "../src"

export default {
  title: "Media and Icons / Avatar",
  decorators: [
    (Story: any) => (
      <Box mx="auto" maxW="500px" mt="40px">
        <Story />
      </Box>
    ),
  ],
}

export const Basic = () => (
  <Stack direction="row">
    <Avatar.Root>
      <Avatar.Image src="https://bit.ly/dan-abramov" />
      <Avatar.Fallback name="Dan Abrahmov" />
    </Avatar.Root>

    <Avatar.Root>
      <Avatar.Image src="https://bit.ly/code-beast" />
      <Avatar.Fallback name="Christian Nwamba" />
    </Avatar.Root>

    <Avatar.Root>
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
      <Avatar.Fallback name="Segun Adebayo" />
    </Avatar.Root>
  </Stack>
)

const AvatarSvg = (props: React.ComponentProps<"svg">) => (
  <svg
    color="#fff"
    viewBox="0 0 30 31"
    style={{ width: "56%", height: "56%" }}
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.71 0c5.04 0 9.29 3.076 9.862 7.319.179 1.338.2 2.36.048 3.859l-.195 1.72-.112.94-.071.564c-.162 1.246-.321 2.224-.495 2.959-.568 2.386-1.747 4.857-3.212 5.969l-.096.068-.041.223-.03.169c-.067.407-.116.805-.138 1.171-.04.66.024 1.132.077 1.194.331.385 1.775.904 3.789 1.34.774.169 1.596.32 2.428.453l.894.136 1.116.148a1 1 0 01-.229 1.987l-.404-.05-.768-.105-.278-.041a49.902 49.902 0 01-3.183-.573l-.688-.156c-2.107-.5-3.527-1.06-4.194-1.836-.51-.592-.628-1.458-.556-2.62a13.6 13.6 0 01.162-1.375l.065-.373c.043-.228.083-.415.114-.546a1 1 0 01.417-.6l.11-.064c1.007-.504 2.193-2.853 2.699-4.98.123-.521.243-1.215.366-2.078l.126-.95.294-2.503c.182-1.573.176-2.49.003-3.784C22.164 4.422 18.817 2 14.71 2c-4.108 0-7.454 2.422-7.88 5.584-.159 1.187-.178 2.057-.04 3.405l.19 1.679c.053.447.1.836.146 1.204l.035.271c.154 1.185.304 2.106.457 2.755.487 2.047 1.602 4.297 2.583 4.916l.117.066a1 1 0 01.526.664l.053.237c.038.183.082.415.127.682.078.47.135.934.162 1.375.071 1.162-.047 2.028-.557 2.62-.736.857-2.394 1.453-4.881 1.992-.813.176-1.67.334-2.534.472l-.65.1c-.378.057-.73.106-1.046.147l-.404.05a1 1 0 01-.228-1.987l.375-.046c.228-.03.476-.064.74-.102l.269-.04a47.96 47.96 0 003.054-.548l.534-.121c1.733-.41 2.953-.87 3.255-1.22.053-.062.117-.535.077-1.194a11.655 11.655 0 00-.14-1.171l-.07-.392-.096-.068c-1.407-1.068-2.549-3.387-3.14-5.684l-.072-.287a25.921 25.921 0 01-.397-2.241l-.098-.716a97.8 97.8 0 01-.144-1.174L4.845 11.6c-.2-1.736-.193-2.82.003-4.28C5.418 3.075 9.67 0 14.71 0z"
      fillRule="nonzero"
    />
  </svg>
)

export const WithCustomIcon = () => (
  <Avatar.Root>
    <AvatarSvg />
  </Avatar.Root>
)

export const WithSizes = () => {
  const recipe = useSlotRecipe("Avatar")
  return (
    <Stack direction="row" spacing="24px">
      <For each={recipe.variantMap.size} fallback="No size found!">
        {(size) => (
          <Avatar.Root key={size} size={size}>
            <Avatar.Image src="https://uinames.com/api/photos/female/18.jpg" />
            <Avatar.Fallback name="Uchiha Itachi" />
            <Avatar.Badge boxSize="1.25em" bg="green.500" />
          </Avatar.Root>
        )}
      </For>
    </Stack>
  )
}

export const WithAvatarGroup = () => {
  const recipe = useSlotRecipe("Avatar")
  return (
    <Stack spacing="24px">
      <For each={recipe.variantMap.size}>
        {(size) => (
          <AvatarGroup size={size} key={size}>
            <Avatar.Root>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/131317.webp?s=d4b03c7291407bde303bc0758047f6bd" />
              <Avatar.Fallback name="Uchica Sasuke" />
            </Avatar.Root>

            <Avatar.Root>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/7/284129.webp?s=a8998bf668767de58b33740886ca571c" />
              <Avatar.Fallback name="User B" />
            </Avatar.Root>

            <Avatar.Root>
              <Avatar.Image src="https://cdn.myanimelist.net/r/84x124/images/characters/9/105421.webp?s=269ff1b2bb9abe3ac1bc443d3a76e863" />
              <Avatar.Fallback name="User C" />
            </Avatar.Root>

            <Avatar.Root>
              <Avatar.Fallback>+3</Avatar.Fallback>
            </Avatar.Root>
          </AvatarGroup>
        )}
      </For>
    </Stack>
  )
}
