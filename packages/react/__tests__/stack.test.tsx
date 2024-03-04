import { fireEvent, render, screen, waitFor } from "@chakra-ui/test-utils"
import { useEffect, useState } from "react"
import { Box, Divider, Flex, Stack } from "../src"

const data = [
  { id: "apple" },
  { id: "orange" },
  { id: "banana" },
  { id: "mango" },
  { id: "kiwi" },
  { id: "pineapple" },
]

interface FruitProps {
  name: string
  onUnmount?: (v: string) => void
}
const Fruit = ({ name, onUnmount }: FruitProps) => {
  useEffect(() => {
    return () => {
      if (onUnmount) onUnmount(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Flex data-testid="fruit">{name}</Flex>
}

describe("Stack", () => {
  test("renders list of items correctly", async () => {
    const Wrapper = ({ data }: { data: Record<string, any>[] }) => {
      return (
        <Stack>
          {data.map((i) => (
            <Fruit key={i.id} name={i.id} />
          ))}
        </Stack>
      )
    }

    render(<Wrapper data={data} />)
    const items = await screen.findAllByTestId("fruit")
    expect(items).toHaveLength(6)
  })

  test("renders list of items with provided keys when cloning children", async () => {
    const unMountMock = vi.fn()

    const Wrapper = ({ data }: { data: Record<string, any>[] }) => {
      const [fruits, setFruits] = useState(data)

      return (
        <>
          <Box
            onClick={() => {
              setFruits((prev) => prev.slice(1))
            }}
            data-testid="delete-button"
          >
            delete first
          </Box>
          <Stack divider={<Divider />}>
            {fruits.map((i) => (
              <Fruit key={i.id} name={i.id} onUnmount={unMountMock} />
            ))}
          </Stack>
        </>
      )
    }

    render(<Wrapper data={data} />)

    const items = await screen.findAllByTestId("fruit")
    expect(items).toHaveLength(6)

    expect(unMountMock).not.toHaveBeenCalled()

    const deleteFirst = await screen.findByTestId("delete-button")

    fireEvent.click(deleteFirst)

    await waitFor(() => {
      expect(unMountMock).toHaveBeenCalledWith("apple")
    })

    expect(unMountMock).toHaveBeenCalledTimes(1)
  })
})
