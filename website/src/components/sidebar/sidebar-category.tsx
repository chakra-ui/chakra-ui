import { Icon, chakra, useColorModeValue } from "@chakra-ui/core"
import { useRef, useState, useEffect, ReactNode, RefObject } from "react"

interface SidebarCategoryProps {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  children: ReactNode
  contentRef?: RefObject<any>
}

const Arrow = (props) => (
  <svg viewBox="0 0 5 8" fill="none" {...props}>
    <path
      d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z"
      fill="currentColor"
    />
  </svg>
)

interface SidebarState {
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
          color: useColorModeValue("gray.800", "inherit"),
        }}
      >
        {title}
        <Icon
          w="auto"
          h="2"
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
