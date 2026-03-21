"use client"

import {
  Box,
  Button,
  HStack,
  Input,
  Table,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourDataTable = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Table Tour
      </Button>

      <Box borderWidth="1px" borderRadius="md" overflow="hidden">
        <HStack id="table-toolbar" p="3" gap="3" borderBottomWidth="1px">
          <Input size="sm" placeholder="Search..." maxW="200px" />
          <Button size="sm" variant="outline">
            Filter
          </Button>
          <Button size="sm" variant="outline">
            Sort
          </Button>
          <Box flex="1" />
          <Button size="sm" variant="outline">
            Export
          </Button>
        </HStack>

        <Box id="table-body">
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Role</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((row) => (
                <Table.Row key={row.name}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.email}</Table.Cell>
                  <Table.Cell>{row.role}</Table.Cell>
                  <Table.Cell>{row.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

        <HStack
          id="table-pagination"
          p="3"
          borderTopWidth="1px"
          justify="space-between"
        >
          <Text textStyle="xs" color="fg.muted">
            Showing 1-5 of 24
          </Text>
          <HStack gap="1">
            <Button size="xs" variant="outline">
              Prev
            </Button>
            <Button size="xs" variant="outline">
              1
            </Button>
            <Button size="xs" variant="outline">
              2
            </Button>
            <Button size="xs" variant="outline">
              3
            </Button>
            <Button size="xs" variant="outline">
              Next
            </Button>
          </HStack>
        </HStack>
      </Box>

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.ProgressText />
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </VStack>
  )
}

const rows = [
  { name: "Alice", email: "alice@acme.com", role: "Admin", status: "Active" },
  { name: "Bob", email: "bob@acme.com", role: "Editor", status: "Active" },
  { name: "Carol", email: "carol@acme.com", role: "Viewer", status: "Invited" },
  { name: "Dave", email: "dave@acme.com", role: "Editor", status: "Active" },
  { name: "Eve", email: "eve@acme.com", role: "Admin", status: "Inactive" },
]

const steps: TourStep[] = [
  {
    id: "toolbar",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#table-toolbar"),
    placement: "bottom",
    title: "Toolbar",
    description:
      "Search, filter, and sort your data. Use Export to download the current view as CSV.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "body",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#table-body"),
    title: "Data Table",
    description:
      "Click any row to view details. Click column headers to sort. Columns are resizable.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "pagination",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#table-pagination"),
    placement: "top",
    title: "Pagination",
    description:
      "Navigate through pages of data. The total count updates as you apply filters.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
