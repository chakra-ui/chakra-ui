import { DataList, Stack } from "@chakra-ui/react"

const stats = [
  { label: "New Users", value: "234", diff: -12, helpText: "Till date" },
  { label: "Sales", value: "£12,340", diff: 12, helpText: "Last 30 days" },
  { label: "Revenue", value: "3,450", diff: 4.5, helpText: "Last 30 days" },
]

export const DataListWithOrientation = () => {
  return (
    <Stack gap="8">
      <DataList.Root orientation="vertical">
        {stats.map((item) => (
          <DataList.Item key={`vertical-${item.label}`}>
            <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
            <DataList.ItemValue>{item.value}</DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList.Root>
      <DataList.Root orientation="horizontal">
        {stats.map((item) => (
          <DataList.Item key={`horizontal-${item.label}`}>
            <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
            <DataList.ItemValue>{item.value}</DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Stack>
  )
}
