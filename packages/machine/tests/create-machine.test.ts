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
      "matches": [Function],
      "prev": "",
      Symbol(): 0,
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
      "matches": [Function],
      "prev": "idle",
      Symbol(): 0,
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
      "matches": [Function],
      "prev": "idle",
      Symbol(): 0,
    }
  `)
})
