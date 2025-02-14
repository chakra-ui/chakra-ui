import { Breadcrumb, For, Stack } from "@chakra-ui/react"

export const BreadcrumbWithVariants = () => {
  return (
    <Stack>
      <For each={["plain", "underline"]}>
        {(variant) => (
          <Breadcrumb.Root key={variant} variant={variant}>
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
