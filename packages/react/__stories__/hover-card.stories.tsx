import { Meta } from "@storybook/react"
import { HoverCard, Link, Text, chakra } from "../src"

export default {
  title: "Components / HoverCard",
  decorators: [
    (Story: any) => (
      <chakra.div mx="auto" maxW="400px" mt="200px">
        <Story />
      </chakra.div>
    ),
  ],
} satisfies Meta

export const Basic = () => {
  return (
    <HoverCard.Root>
      <Link variant="underline" asChild href="#test" color="blue.500">
        <HoverCard.Trigger>Hover to see @swyx profile</HoverCard.Trigger>
      </Link>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          <Text fontWeight="bold">swyx</Text>
          <Text mt={3}>
            Infinite Builder working on DX @Netlify. Helping people
            #LearnInPublic
          </Text>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard.Root>
  )
}
