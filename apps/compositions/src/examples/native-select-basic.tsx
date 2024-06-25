import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const NativeSelectBasic = () => {
  return (
    <NativeSelectRoot size="sm" width="240px">
      <NativeSelectField placeholder="Select option">
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </NativeSelectField>
    </NativeSelectRoot>
  )
}

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
]
