import type { Meta } from "@storybook/react"
import { Box, Center, For, SimpleGrid, Text } from "../src"

export default {
  title: "Foundations / Tokens",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TokensAnimationStyle as AnimationStyle } from "compositions/examples/tokens/animation-style"
export { TokensFocusRing as FocusRing } from "compositions/examples/tokens/focus-ring"
export { TokensLayerStyle as LayerStyle } from "compositions/examples/tokens/layer-style"
export { TokensTextStyles as TextStyles } from "compositions/examples/tokens/text-styles"

export { AspectRatioTokenDoc as AspectRatio } from "compositions/lib/aspect-ratio-token-doc"
export { BorderRadiusTokenDoc as Radius } from "compositions/lib/border-radius-token-doc"
export { BreakpointDoc as Breakpoints } from "compositions/lib/breakpoint-doc"
export { EasingTokenDoc as Easings } from "compositions/lib/easing-token-doc"
export {
  ColorTokenDoc as Colors,
  ColorSemanticTokenDoc as SemanticColors,
} from "compositions/lib/color-token-doc"
export {
  DurationTokenDoc as Durations,
  KeyframeDoc as Keyframes,
} from "compositions/lib/keyframe-doc"
export { ShadowTokenDoc as Shadows } from "compositions/lib/shadow-token-doc"
export { SizesTokenDoc as Sizes } from "compositions/lib/sizes-token-doc"
export { SpacingTokenDoc as Spacing } from "compositions/lib/spacing-token-doc"
export {
  FontTokenDoc as Font,
  FontSizeTokenDoc as FontSizes,
  FontWeightTokenDoc as FontWeights,
  LetterSpacingTokenDoc as LetterSpacings,
  LineHeightTokenDoc as LineHeights,
} from "compositions/lib/typography-token-doc"
export { ZIndexTokenDoc as ZIndex } from "compositions/lib/z-index-token-doc"

export const StatusTokens = () => {
  return (
    <SimpleGrid columns={4} gap="10">
      <For each={["bg.error", "bg.warning", "bg.success", "bg.info"]}>
        {(color) => (
          <Center bg={color} height="40px">
            <Text color={color.replace("bg.", "fg.")}>{color}</Text>
          </Center>
        )}
      </For>

      <For each={["fg.error", "fg.warning", "fg.success", "fg.info"]}>
        {(color) => (
          <Center bg={color} height="40px">
            <Text color="fg.inverted">{color}</Text>
          </Center>
        )}
      </For>

      <For
        each={[
          "border.error",
          "border.warning",
          "border.success",
          "border.info",
        ]}
      >
        {(color) => (
          <Center borderColor={color} height="40px" borderWidth="2px">
            <Text color="fg">{color}</Text>
          </Center>
        )}
      </For>
    </SimpleGrid>
  )
}
