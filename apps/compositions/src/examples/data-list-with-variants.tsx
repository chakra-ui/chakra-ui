import { DataList, For, Stack } from "@chakra-ui/react"

export const DataListWithVariants = () => {
  return (
    <Stack gap="8">
      <For each={["subtle", "bold"]}>
        {(variant) => (
          <DataList.Root variant={variant} key={variant}>
            {stats.map((item) => (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                <DataList.ItemValue>{item.value}</DataList.ItemValue>
              </DataList.Item>
            ))}
          </DataList.Root>
        )}
      </For>
    </Stack>
  )
}

const stats = [
  { label: "New Users", value: "234", diff: -12, helpText: "Till date" },
  { label: "Sales", value: "£12,340", diff: 12, helpText: "Last 30 days" },
  { label: "Revenue", value: "3,450", diff: 4.5, helpText: "Last 30 days" },
]
