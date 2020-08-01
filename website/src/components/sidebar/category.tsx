import { Icon, chakra } from "@chakra-ui/core"
import { useRef, useState, useEffect, ReactNode } from "react"
import { FiChevronDown } from "react-icons/fi"

type SidebarCategoryProps = {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  children?: ReactNode
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

  const onClick = () => {
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
    <div ref={ref}>
      <chakra.a
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        color="gray.700"
        onClick={onClick}
        _hover={{
          color: "gray.800",
        }}
      >
        {title}
        <Icon
          mr="16px"
          transformOrigin="center"
          transition="transform 0.15 ease"
          as={FiChevronDown}
          color="gray.600"
        />
      </chakra.a>
      <chakra.div
        borderLeft="1px solid"
        borderColor="gray.400"
        mt="0"
        pl="20px"
        overflow="hidden"
        ml="4px"
      >
        {children}
      </chakra.div>
    </div>
  )
}

export default SidebarCategory
