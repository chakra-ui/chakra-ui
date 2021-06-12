import { Placement } from "@chakra-ui/popper"
import { flipDirection } from "../src"

test("should flip placement direction correctly or return it as is", () => {
  expect(flipDirection("top-left" as Placement)).toBe("top-right")
  expect(flipDirection("top-right" as Placement)).toBe("top-left")
  expect(flipDirection("bottom-left" as Placement)).toBe("bottom-right")
  expect(flipDirection("bottom-right" as Placement)).toBe("bottom-left")
  expect(flipDirection("top-start" as Placement)).toBe("top-end")
  expect(flipDirection("top-end" as Placement)).toBe("top-start")
  expect(flipDirection("bottom-start" as Placement)).toBe("bottom-end")
  expect(flipDirection("bottom-end" as Placement)).toBe("bottom-start")
  expect(flipDirection("auto" as Placement)).toBe("auto")
})
