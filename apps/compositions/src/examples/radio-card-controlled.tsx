import { HStack, RadioCard } from "@chakra-ui/react"

export const RadioCardControlled = () => {
  const [value, setValue] = useState<string | null>(null)
  
  return (
    <RadioCard.Root defaultValue="next" value={value} onValueChange={(e) => setValue(e.value)}>
      <RadioCard.Label>Select framework</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  { value: "next", title: "Next.js" },
  { value: "vite", title: "Vite" },
  { value: "astro", title: "Astro" },
]
