import { For, Stack, Text } from "@chakra-ui/react"
import { Prose } from "compositions/ui/prose"

export const ProseWithSizes = () => {
  return (
    <Stack gap="10">
      <For each={["md", "lg"]}>
        {(size) => (
          <Stack key={size}>
            <Text>size: {size}</Text>
            <Prose size={size}>
              <h1>Title Heading 1</h1>
              <h2>Title Heading 2</h2>
              <h3>Title Heading 3</h3>
              <h4>Title Heading 4</h4>

              <h4>
                Title Heading 4 <code>testing</code>
              </h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                at dolor nec ex rutrum semper. Praesent ultricies purus eget
                lectus tristique egestas ac in lacus. Nulla eleifend lorem
                risus, sit amet dictum nisi gravida eget. Suspendisse odio sem,
                scelerisque congue luctus nec, scelerisque ultrices orci.
                Praesent tincidunt, risus ut commodo cursus, ligula orci
                tristique justo, vitae sollicitudin lacus risus dictum orci.
                Press <kbd>Ctrl</kbd> +<kbd>C</kbd> to copy
              </p>
            </Prose>
          </Stack>
        )}
      </For>
    </Stack>
  )
}
