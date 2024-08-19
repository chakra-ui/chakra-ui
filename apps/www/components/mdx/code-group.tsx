import { Tabs } from "@chakra-ui/react"
import { Children } from "react"

interface CodeGroupProps {
  children: React.ReactElement
}

export const CodeGroup: React.FC<CodeGroupProps> = (props) => {
  const { children } = props

  const titles: React.ReactNode[] = []
  const contents: React.ReactNode[] = []

  let firstTitle = ""

  Children.forEach(children, (child: React.ReactElement, index: number) => {
    const title = child.props["data-title"]
    if (index === 0) firstTitle = title
    titles.push(
      <Tabs.Trigger key={title} value={title}>
        {title}
      </Tabs.Trigger>,
    )
    contents.push(
      <Tabs.Content
        key={title}
        value={title}
        mt="-2"
        css={{
          "& pre": { mb: "0" },
        }}
      >
        {child.props.children}
      </Tabs.Content>,
    )
  })

  return (
    <Tabs.Root my="6" size="sm" defaultValue={firstTitle}>
      <Tabs.List>{titles}</Tabs.List>
      {contents}
    </Tabs.Root>
  )
}
