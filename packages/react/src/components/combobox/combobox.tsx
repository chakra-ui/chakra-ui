"use client"

import { Box, IconButton, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { ChevronDownIcon } from "../icons"

type ComboboxProps = {
  options: string[]
}

const Combobox: React.FC<ComboboxProps> = ({ options }) => {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()),
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setIsOpen(true)
  }

  const handleOptionClick = (option: string) => {
    setQuery(option)
    setIsOpen(false)
  }

  return (
    <Box position="relative" width="200px">
      <Input
        placeholder="Write something..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      <IconButton
        width="40px"
        height="40px"
        aria-label="Expand"
        position="absolute"
        right="-30px"
        top="50%"
        transform="translate(50%,-50%)"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ChevronDownIcon />
      </IconButton>
      {isOpen && (
        <Box
          position="absolute"
          width="100%"
          mt="1"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="sm"
          zIndex="1"
          backgroundColor="white"
        >
          {filteredOptions.map((option, index) => (
            <Text
              key={index}
              padding="8px"
              _hover={{ backgroundColor: "gray.100" }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Combobox
