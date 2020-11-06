import { BoxProps, chakra, useColorModeValue } from "@chakra-ui/core"
import { ReactNode, RefObject, useEffect, useRef, useState } from "react"

interface SidebarCategoryProps extends BoxProps {
  isMobile?: boolean
  title: string
  opened?: boolean
  selected?: boolean
  children: ReactNode
  contentRef?: RefObject<any>
}

interface SidebarState {
  toggle?: boolean
  shouldScroll?: boolean
}

function SidebarCategory(props: SidebarCategoryProps) {
  const {
    isMobile,
    title,
    selected,
    opened,
    children,
    contentRef,
    ...rest
  } = props

  const ref = useRef<HTMLDivElement | null>(null)

  const [{ toggle, shouldScroll = false }, setToggle] = useState<SidebarState>({
    toggle: selected || opened,
  })

  // const onClick = () => {
  //   setToggle({ toggle: !toggle, shouldScroll: true })
  // }

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true, shouldScroll: true })
    }
  }, [selected])

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (!ref.current || !contentRef?.current) return
    if (toggle && shouldScroll) {
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
    <chakra.div mt="8" ref={ref} {...rest}>
      <chakra.p
        width="full"
        textTransform="uppercase"
        letterSpacing="wider"
        fontSize="xs"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        color={useColorModeValue("gray.500", "inherit")}
        // onClick={onClick}
      >
        {title}
      </chakra.p>
      <chakra.div hidden={!toggle} mt="16px" mx="-3">
        {children}
      </chakra.div>
    </chakra.div>
  )
}

export default SidebarCategory
