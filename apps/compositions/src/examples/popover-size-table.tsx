"use client"

import {
  Button,
  For,
  Heading,
  Textarea,
  chakra,
  useSlotRecipe,
} from "@chakra-ui/react"
import { PlaygroundTable } from "compositions/lib/playground-table"
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"
import { HiChat } from "react-icons/hi"

export const PopoverSizeTable = () => {
  const recipe = useSlotRecipe({ key: "popover" })
  return (
    <PlaygroundTable>
      <thead>
        <tr>
          <For each={recipe.variantMap.size}>{(v) => <td>{v}</td>}</For>
        </tr>
      </thead>
      <tbody>
        <tr>
          <For each={recipe.variantMap.size}>
            {(v) => (
              <chakra.td key={v} minW="400px">
                <PopoverRoot size={v} open>
                  <PopoverTrigger asChild>
                    <Button size={v} variant="solid">
                      <HiChat />
                      Add comment
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseTrigger />
                    <PopoverHeader>
                      <Heading size="sm">Confirmation!</Heading>
                    </PopoverHeader>
                    <PopoverBody>
                      <Textarea size={v} placeholder="Type your comment here" />
                    </PopoverBody>
                    <PopoverFooter gap="2">
                      <Button size={v} variant="solid">
                        Submit
                      </Button>
                      <Button size={v}>Cancel</Button>
                    </PopoverFooter>
                  </PopoverContent>
                </PopoverRoot>
              </chakra.td>
            )}
          </For>
        </tr>
      </tbody>
    </PlaygroundTable>
  )
}
