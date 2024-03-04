import { AnimatePresence, motion } from "framer-motion"
import { Button } from "../src/components/button"
import { Portal } from "../src/components/portal"
import { useTooltip } from "../src/components/tooltip"
import { chakra } from "../src/styled-system"

export default {
  title: "Overlay / Tooltip - useTooltip",
  decorators: [
    (story: Function) => (
      <chakra.div maxWidth="400px" mx="auto" mt="200px">
        {story()}
      </chakra.div>
    ),
  ],
}

const HookTooltip = ({ children }: any) => {
  const api = useTooltip({
    openDelay: 100,
    arrowSize: 8,
    placement: "bottom",
  })

  return (
    <>
      <Button {...api.getTriggerProps()}>Hover me</Button>
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps({
            style: {
              background: "tomato",
              color: "white",
              borderRadius: "4px",
              padding: "0.5em 1em",
              visibility: api.isOpen ? "visible" : "hidden",
              ["--popper-arrow-bg" as string]: "tomato",
            },
          })}
        >
          {children}
          <div data-popper-arrow>
            <div data-popper-arrow-inner />
          </div>
        </div>
      </div>
    </>
  )
}

export const Basic = () => <HookTooltip>This is me</HookTooltip>

export const WithMultiple = () => (
  <>
    <HookTooltip>This is tip 1</HookTooltip>
    <HookTooltip>This is tip 2</HookTooltip>
  </>
)

export const WithTransition = () => {
  const api = useTooltip({
    openDelay: 100,
  })

  return (
    <>
      <Button {...api.getTriggerProps()}>Hover me</Button>
      <AnimatePresence>
        {api.isOpen && (
          <Portal>
            <div {...api.getPositionerProps()}>
              <motion.div
                initial="exit"
                animate="enter"
                exit="exit"
                {...(api.getContentProps() as any)}
              >
                <motion.div
                  transition={{
                    duration: 0.12,
                    ease: [0.4, 0, 0.2, 1],
                    bounce: 0.5,
                  }}
                  variants={{
                    exit: { scale: 0.9, opacity: 0 },
                    enter: { scale: 1, opacity: 1 },
                  }}
                  style={{
                    transformOrigin: "var(--popper-transform-origin)",
                    background: "tomato",
                    ["--popper-arrow-bg" as string]: "tomato",
                    color: "white",
                    borderRadius: "4px",
                    padding: "0.5em 1em",
                  }}
                >
                  Fade! This is tooltip
                  <div data-popper-arrow>
                    <div data-popper-arrow-inner />
                  </div>
                </motion.div>
              </motion.div>
              ∏
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}
