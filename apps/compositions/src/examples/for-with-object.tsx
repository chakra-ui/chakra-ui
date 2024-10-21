import { Box, For, Stack, Text } from "@chakra-ui/react"

export const ForWithObject = () => {
  return (
    <Stack>
      <For
        each={[
          { name: "Naruto", powers: ["Shadow Clone", "Rasengan"] },
          { name: "Sasuke", powers: ["Chidori", "Sharingan"] },
          { name: "Sakura", powers: ["Healing", "Super Strength"] },
        ]}
      >
        {(item, index) => (
          <Box borderWidth="1px" key={index} p="4">
            <Text fontWeight="bold">{item.name}</Text>
            <Text color="fg.muted">Powers: {item.powers.join(", ")}</Text>
          </Box>
        )}
      </For>
    </Stack>
  )
}
