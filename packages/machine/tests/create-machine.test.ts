import { createMachine } from "../src"

test("it works", () => {
  const counter = createMachine({
    id: "counter",
    initial: "idle",
    context: {
      value: 0,
    },
    states: {
      idle: {
        on: {
          INC: {
            actions: (ctx) => {
              ctx.value++
            },
          },
          DEC: {
            actions: (ctx) => {
              ctx.value--
            },
          },
        },
      },
    },
  })

  counter.start()
  expect(counter.state).toMatchInlineSnapshot(`
    Object {
      "context": Object {
        "value": 0,
      },
      "current": "idle",
      "done": false,
      "event": "machine.init",
      "hasTag": [Function],
      "matches": [Function],
      "prev": "",
      "tags": Set {},
    }
  `)

  counter.send("INC")
  counter.send("INC")
  expect(counter.state).toMatchInlineSnapshot(`
    Object {
      "context": Object {
        "value": 2,
      },
      "current": "idle",
      "done": false,
      "event": "INC",
      "hasTag": [Function],
      "matches": [Function],
      "prev": "idle",
      "tags": Set {},
    }
  `)

  counter.send("DEC")
  expect(counter.state).toMatchInlineSnapshot(`
    Object {
      "context": Object {
        "value": 1,
      },
      "current": "idle",
      "done": false,
      "event": "DEC",
      "hasTag": [Function],
      "matches": [Function],
      "prev": "idle",
      "tags": Set {},
    }
  `)
})
