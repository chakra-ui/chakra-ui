import { Icon, chakra, useColorModeValue } from "@chakra-ui/core"
import { useRef, useState, useEffect, ReactNode, RefObject } from "react"

type SidebarCategoryProps = {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  children: ReactNode
  contentRef?: RefObject<any>
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

type SidebarState = {
  toggle?: boolean
  shouldScroll?: boolean
}

function SidebarCategory(props: SidebarCategoryProps) {
  const { isMobile, title, selected, opened, children, contentRef } = props

  const ref = useRef<HTMLDivElement | null>(null)

  const [{ toggle, shouldScroll = false }, setToggle] = useState<SidebarState>({
    toggle: selected || opened,
  })

  const onClick = () => {
    setToggle({ toggle: !toggle, shouldScroll: true })
  }

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true, shouldScroll: true })
    }
  }, [selected])

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (toggle && shouldScroll && ref.current != null) {
      const contentEl = contentRef.current

      if (toggle == true && contentEl) {
        // 10 is added for better margin
        const height =
          ref.current.offsetTop - (isMobile ? 10 : contentEl.offsetTop)
        contentEl.scrollTop = height
        setToggle({ toggle })
      }
    }
  }, [toggle, shouldScroll, isMobile, contentRef])

  return (
    <chakra.div mt="18px" ref={ref}>
      <chakra.button
        width="full"
        cursor="pointer"
        style={{ outlineOffset: 4 }}
        fontSize="sm"
        fontWeight="semibold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        color={useColorModeValue("gray.700", "inherit")}
        onClick={onClick}
        _hover={{
          color: "gray.800",
        }}
      >
        {title}
        <Icon
          w="auto"
          h="1em"
          fontSize="12px"
          mr="16px"
          transformOrigin="center"
          transform={toggle ? "rotate(90deg)" : undefined}
          transition="transform 0.15s ease"
          as={Arrow}
          color="gray.400"
        />
      </chakra.button>
      <chakra.div
        hidden={!toggle}
        borderLeft="1px solid"
        borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
        mt="16px"
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
