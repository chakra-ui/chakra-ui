import { hooks } from "@chakra-ui/test-utils"
import { useHighlight } from "../src/components/highlight/use-highlight"

describe("useHighlight", () => {
  test.each([[], ""])(
    "useHighlight returns no matches if queries is empty but returns original value",
    (query) => {
      const text = "this is an ordinary text which should not have any matches"
      const { result } = hooks.render(() =>
        useHighlight({
          query,
          text,
        }),
      )
      expect(result.current).toHaveLength(1)
      expect(result.current[0].match).toBe(false)
      expect(result.current[0].text).toBe(text)
    },
  )

  test("useHighlight matches correctly", () => {
    const query = ["", "text"]
    const { result } = hooks.render(() =>
      useHighlight({
        query: query,
        text: "this is an ordinary text which should have one match ",
      }),
    )
    expect(result.current).toMatchInlineSnapshot(`
  [
    {
      "match": false,
      "text": "this is an ordinary ",
    },
    {
      "match": true,
      "text": "text",
    },
    {
      "match": false,
      "text": " which should have one match ",
    },
  ]
  `)
  })
})
