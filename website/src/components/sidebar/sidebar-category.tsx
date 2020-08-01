import { Icon, chakra } from "@chakra-ui/core"
import { useRef, useState, useEffect, ReactNode } from "react"

type SidebarCategoryProps = {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  children: ReactNode
}

const Arrow = (props) => (
  <svg viewBox="0 0 6 10" fill="none" {...props}>
    <path
      d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
      stroke="currentColor"
      strokeLinecap="square"
    />
  </svg>
)

function SidebarCategory(props: SidebarCategoryProps) {
  const { isMobile, title, selected, opened, children } = props

  const ref = useRef<HTMLDivElement | null>(null)

  const [{ toggle, shouldScroll = false }, setToggle] = useState<{
    toggle?: boolean
    shouldScroll?: boolean
  }>({
    toggle: selected || opened,
    shouldScroll: false,
  })

  const onClick = (e) => {
    e.preventDefault()
    setToggle({ toggle: !toggle, shouldScroll: true })
  }

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true })
    }
  }, [selected])

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (toggle && shouldScroll && ref.current != null) {
      const content = document.querySelector(
        isMobile ? ".docs-dropdown" : ".sidebar-content",
      )
      if (content) {
        // 10 is added for better margin
        const height =
          ref.current.offsetTop - (isMobile ? 10 : (content as any).offsetTop)
        content.scrollTop = height
        setToggle({ toggle })
      }
    }
  }, [toggle, shouldScroll, isMobile])

  return (
    <chakra.div mt="18px" ref={ref}>
      <chakra.a
        cursor="pointer"
        display="flex"
        alignItems="center"
        userSelect="none"
        color="gray.700"
        onClick={onClick}
        _hover={{
          color: "gray.800",
        }}
      >
        <Icon
          w="auto"
          h="1em"
          fontSize="12px"
          mr="16px"
          transformOrigin="center"
          transform={!toggle ? "rotate(90deg)" : undefined}
          transition="transform 0.15s ease"
          as={Arrow}
          color="gray.400"
        />
        {title}
      </chakra.a>
      <chakra.div
        hidden={toggle}
        borderLeft="1px solid"
        borderColor="gray.200"
        mt="18px"
        pl="5"
        overflow="hidden"
        ml="1"
      >
        {children}
      </chakra.div>
    </chakra.div>
  )
}

export default SidebarCategory
