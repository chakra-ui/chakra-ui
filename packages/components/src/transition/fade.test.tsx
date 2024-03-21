import { render } from "@chakra-ui/test-utils"
import { Fade } from "./index"
import { MotionGlobalConfig } from "framer-motion"

describe("<Fade />", () => {
  test("shouldn't fade in its children when skipAnimations enabled", async () => {
    MotionGlobalConfig.skipAnimations = true
    const component = render(
      <Fade in transition={{ enter: { duration: 1 } }}>
        <button>Test</button>
      </Fade>,
    )
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="chakra-fade"
          style="opacity: 1;"
        >
          <button>
            Test
          </button>
        </div>
        <span
          hidden=""
          id="__chakra_env"
        />
      </DocumentFragment>
    `)
  })
})
