import { SystemStyleObject, ChakraStyleProps } from "../src"

test("should be assignable to Chakra style props", () => {
  const base: ChakraStyleProps = {
    margin: 4,
  }

  const styles: SystemStyleObject = {
    ...base,
    isolation: "isolate",
    pe: "4",
    margin: [40, 50],
    padding: { sm: "40", md: "50" },
    mb: "ref",
    color: "pink",
    _hover: {
      content: "",
      background: "red",
    },
    ".dfdfd": {
      margin: "40px",
      color: ["red", "pink"],
      _hover: {
        background: "red",
      },
    },
  }

  expect(styles).toBeTruthy()
})

test("should be assignable to react css properties", () => {
  const base: React.CSSProperties = {
    margin: 4,
  }

  const styles: SystemStyleObject = {
    ...base,
    isolation: "isolate",
    pe: "4",
    margin: [40, 50],
    padding: { sm: "40", md: "50" },
    mb: "ref",
    color: "pink",
    _hover: {
      content: "",
      background: "red",
    },
    ".dfdfd": {
      margin: "40px",
      color: ["red", "pink"],
      _hover: {
        background: "red",
      },
    },
  }

  expect(styles).toBeTruthy()
})
