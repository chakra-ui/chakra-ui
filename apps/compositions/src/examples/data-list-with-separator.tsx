import { DataListItem } from "compositions/ui/data-list"
import { DataListRoot } from "compositions/ui/data-list"

export const DataListWithSeparator = () => {
  return (
    <DataListRoot orientation="horizontal" divideY="1px" maxW="md">
      {items.map((item) => (
        <DataListItem
          pt="4"
          grow
          key={item.value}
          label={item.label}
          value={item.value}
        />
      ))}
    </DataListRoot>
  )
}

const items = [
  { label: "First Name", value: "Jassie" },
  { label: "Last Name", value: "Bhatia" },
  { label: "Email", value: "jassie@jassie.dev" },
  { label: "Phone", value: "1234567890" },
  { label: "Address", value: "1234 Main St, Anytown, USA" },
]
