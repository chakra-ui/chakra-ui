import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const NativeSelectWithItems = () => {
  return (
    <NativeSelectRoot size="sm" width="240px">
      <NativeSelectField placeholder="Select option" items={items} />
    </NativeSelectRoot>
  )
}

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
]
