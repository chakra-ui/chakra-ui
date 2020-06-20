import { mapResponsive } from "../src"

const arr = [2, 3]
const obj = { sm: 2, md: 3 }
const mapper = (val: number) => `grid-template-columns(${val}, 1fr )`

test("should run mapper on array or object and return mapped data", () => {
  expect(mapResponsive(arr, mapper)).toStrictEqual([
    "grid-template-columns(2, 1fr )",
    "grid-template-columns(3, 1fr )",
  ])
  expect(mapResponsive(obj, mapper)).toStrictEqual({
    sm: "grid-template-columns(2, 1fr )",
    md: "grid-template-columns(3, 1fr )",
  })
})
