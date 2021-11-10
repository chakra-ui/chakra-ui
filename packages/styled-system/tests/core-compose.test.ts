import { system, compose } from "../src"

const color = system({
  color: true,
  bg: {
    property: "backgroundColor",
  },
})

const fontSize = system({
  fontSize: true,
})

test("compose combines style parsers", () => {
  const parser = compose(color, fontSize)
  const styles = parser({
    color: "tomato",
    bg: "black",
    fontSize: 32,
  })
  expect(typeof parser).toBe("function")
  expect(styles).toEqual({
    fontSize: 32,
    color: "tomato",
    backgroundColor: "black",
  })
})
