import * as React from "react"
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxListItem,
} from "../src/combobox"

export default {
  title: "Combobox",
}

export const Basic = () => (
  <Combobox openOnFocus={true}>
    <ComboboxInput />
    <ComboboxList>
      <ComboboxListItem value="item1">Item 1</ComboboxListItem>
      <ComboboxListItem value="item2">Item 2</ComboboxListItem>
      <ComboboxListItem value="item3">Item 3</ComboboxListItem>
      <ComboboxListItem value="item4">Item 4</ComboboxListItem>
      <ComboboxListItem value="item5">Item 5</ComboboxListItem>
      <ComboboxListItem value="item6">Item 6</ComboboxListItem>
    </ComboboxList>
  </Combobox>
)
