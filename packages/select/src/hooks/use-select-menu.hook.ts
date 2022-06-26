import { KeyboardEvent } from "react"
import { SelectKeyboardKey } from "../enums/select-keyboard-key"
import { useSelectContext } from "../select"

const useSelectMenu = () => {
  const {
    selectId,
    readonly,
    clearable,
    activeIndexKey,
    onNextOption,
    onPrevOption,
  } = useSelectContext()

  const onKeyUp = (event: KeyboardEvent) => {
    event.preventDefault()

    if (event.key === SelectKeyboardKey.ArrowUp) onPrevOption()
    if (event.key === SelectKeyboardKey.ArrowDown) onNextOption()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
  }

  return {
    id: `${selectId}-menu`,
    tabIndex: -1,
    role: "listbox",
    "aria-required": !clearable,
    "aria-readonly": readonly,
    "aria-multiselectable": false,
    "aria-activedescendant": activeIndexKey,
    onKeyUp,
    onKeyDown,
  }
}

export default useSelectMenu
