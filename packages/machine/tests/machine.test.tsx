import { toTransition, pickTarget } from "../src/utils"

test("it works", () => {
  const t = toTransition(
    {
      actions: (ctx) => {
        console.log(ctx)
      },
    },
    "init",
  )
  expect(t).toMatchInlineSnapshot(`
    Object {
      "actions": [Function],
      "target": "init",
    }
  `)

  expect(toTransition("init", "")).toMatchInlineSnapshot(`
    Object {
      "target": "init",
    }
  `)
})

test("should pick target", () => {
  const event = { type: "testing" }
  expect(
    pickTarget({ value: 2 }, event, [
      { target: "searching", cond: (ctx) => ctx.value > 2 },
      { target: ".invalid" },
    ]),
  ).toMatchInlineSnapshot(`
    Object {
      "target": ".invalid",
    }
  `)

  expect(
    pickTarget({ value: 4 }, event, [
      { target: "searching", cond: (ctx) => ctx.value > 2 },
      { target: ".invalid" },
    ]),
  ).toMatchInlineSnapshot(`
    Object {
      "cond": [Function],
      "target": "searching",
    }
  `)

  expect(
    pickTarget({ value: 2 }, event, [
      { target: "searching", cond: (ctx) => ctx.value > 2 },
      { target: ".invalid", cond: () => false },
    ]),
  ).toMatchInlineSnapshot(`undefined`)
})
