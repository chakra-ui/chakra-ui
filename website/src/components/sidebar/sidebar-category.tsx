import { Icon, chakra } from "@chakra-ui/core"
import { useRef, useState, useEffect, ReactNode } from "react"
import { FiChevronRight } from "react-icons/fi"

type SidebarCategoryProps = {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  children: ReactNode
}

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
        color="gray.700"
        ml="-4px"
        onClick={onClick}
        _hover={{
          color: "gray.800",
        }}
      >
        <Icon
          fontSize="sm"
          mr="16px"
          transformOrigin="center"
          transform={!toggle ? "rotate(90deg)" : undefined}
          transition="transform 0.15 ease"
          as={FiChevronRight}
          color="gray.400"
        />
        {title}
      </chakra.a>
      <chakra.div
        hidden={toggle}
        borderLeft="1px solid"
        borderColor="gray.200"
        mt="3"
        pl="5"
        overflow="hidden"
        ml="2"
      >
        {children}
      </chakra.div>
    </chakra.div>
  )
}

export default SidebarCategory
