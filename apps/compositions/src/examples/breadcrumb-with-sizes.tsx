import { Breadcrumb, For, Stack } from "@chakra-ui/react"

export const BreadcrumbWithSizes = () => {
  return (
    <Stack>
      <For each={["sm", "md", "lg"]}>
        {(size) => (
          <Breadcrumb.Root key={size} size={size}>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        )}
      </For>
    </Stack>
  )
}
