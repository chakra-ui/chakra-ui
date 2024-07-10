import { ExampleTabs } from "@/components/example"
import { Box } from "@chakra-ui/react"
import { Content } from "./docs/content"
import { Header } from "./docs/header"

export default function Page() {
  return (
    <Box
      css={{
        "--header-height": "104px",
        "--content-height": "calc(100dvh - var(--header-height))",
      }}
    >
      <Header />
      <Content>
        <ExampleTabs name="alert-basic" />
      </Content>
    </Box>
  )
}
