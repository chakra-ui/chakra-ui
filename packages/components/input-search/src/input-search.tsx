import React, { forwardRef, useRef, useState } from "react"
import { chakra, useMultiStyleConfig } from "@chakra-ui/system"
import { useOutsideClick } from "@chakra-ui/hooks"
import { useDropdown } from "./use-dropdown"
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/input"
import { SearchIcon } from "@chakra-ui/icons"

export interface InputSearchOptionProps {
  label: string
  value: string
}

export interface InputSearchProps extends Omit<InputProps, "results"> {
  /**
   * The options to display in the dropdown.
   */
  options?: InputSearchOptionProps[]
  /**
   * Callback when a result is selected.
   */
  onResultSelect?: (result: InputSearchOptionProps) => void
  /**
   * Callback when the query changes.
   */
  onQueryChange: (query: string) => void
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  (props, ref) => {
    const styles = useMultiStyleConfig("InputSearch", props)
    const dropdownRef = useRef<HTMLUListElement | null>(null)

    const { options = [], onResultSelect, onQueryChange, ...rest } = props

    const [query, setQuery] = useState<string>("")
    const { isDropdownOpen, closeDropdown, toggleDropdown } = useDropdown()

    const handleResultSelect = (result: InputSearchOptionProps) => {
      if (onResultSelect) {
        onResultSelect(result)
      }
      setQuery(result.label)
      closeDropdown()
    }

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value
      setQuery(newQuery)

      if (onQueryChange) {
        onQueryChange(newQuery)
      }
    }

    useOutsideClick({
      ref: dropdownRef,
      handler: () => closeDropdown(),
    })

    return (
      <chakra.div
        className="chakra-input-search__wrapper"
        __css={{ ...styles.root }}
      >
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            {...rest}
            ref={ref}
            role="searchbox"
            type="search"
            value={query}
            onChange={handleQueryChange}
            onClick={toggleDropdown}
            aria-autocomplete="list"
          />
        </InputGroup>
        {options.length > 0 && (
          <chakra.ul
            role="list"
            aria-live="assertive"
            listStyleType="none"
            ref={dropdownRef}
            __css={{
              ...styles.dropdown,
              visibility: isDropdownOpen ? "visible" : "hidden",
            }}
          >
            {options.map((option: InputSearchOptionProps, index) => (
              <chakra.li
                key={option.value}
                role="listitem"
                tabIndex={0}
                onClick={() => handleResultSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleResultSelect(option)
                  } else if (e.key === "Tab" && index === options.length - 1) {
                    // If the last item is focused and Tab is pressed, close the dropdown
                    closeDropdown()
                  }
                }}
                __css={{
                  ...styles.dropdownItem,
                }}
              >
                {option.label}
              </chakra.li>
            ))}
          </chakra.ul>
        )}
      </chakra.div>
    )
  },
)

InputSearch.displayName = "InputSearch"
