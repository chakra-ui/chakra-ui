import { useState } from "react"

interface DropdownState {
  isDropdownOpen: boolean
  closeDropdown: () => void
  toggleDropdown: () => void
}

export const useDropdown = (): DropdownState => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  return { isDropdownOpen, closeDropdown, toggleDropdown }
}
