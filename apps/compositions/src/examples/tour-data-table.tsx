"use client"

import {
  Badge,
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  Menu,
  Stack,
  Stat,
  Table,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuDownload, LuEllipsis, LuFilter, LuSearch } from "react-icons/lu"
import { TourOverlay } from "./tour-parts"
import { TourAppShell } from "./tour-shell"

type Status = "Paid" | "Pending" | "Overdue"
const invoices: {
  id: string
  customer: string
  amount: string
  status: Status
  issued: string
}[] = [
  {
    id: "INV-0021",
    customer: "Acme Corp",
    amount: "$4,200.00",
    status: "Paid",
    issued: "Apr 20",
  },
  {
    id: "INV-0020",
    customer: "Globex",
    amount: "$1,840.00",
    status: "Pending",
    issued: "Apr 19",
  },
  {
    id: "INV-0019",
    customer: "Initech",
    amount: "$920.00",
    status: "Paid",
    issued: "Apr 18",
  },
  {
    id: "INV-0018",
    customer: "Umbrella Health",
    amount: "$3,600.00",
    status: "Overdue",
    issued: "Apr 10",
  },
  {
    id: "INV-0017",
    customer: "Hooli",
    amount: "$2,150.00",
    status: "Paid",
    issued: "Apr 09",
  },
  {
    id: "INV-0016",
    customer: "Stark Industries",
    amount: "$5,400.00",
    status: "Pending",
    issued: "Apr 08",
  },
  {
    id: "INV-0015",
    customer: "Wayne Labs",
    amount: "$1,200.00",
    status: "Paid",
    issued: "Apr 05",
  },
  {
    id: "INV-0014",
    customer: "Pied Piper",
    amount: "$780.00",
    status: "Overdue",
    issued: "Mar 28",
  },
  {
    id: "INV-0013",
    customer: "Vandelay",
    amount: "$640.00",
    status: "Paid",
    issued: "Mar 27",
  },
  {
    id: "INV-0012",
    customer: "Soylent Inc.",
    amount: "$2,980.00",
    status: "Overdue",
    issued: "Mar 22",
  },
]

const statusPalette: Record<Status, string> = {
  Paid: "green",
  Pending: "yellow",
  Overdue: "red",
}

export const TourDataTable = () => {
  const [filterOverdue, setFilterOverdue] = useState(false)
  const [menuOpenRowId, setMenuOpenRowId] = useState<string | null>(null)

  const visible = filterOverdue
    ? invoices.filter((i) => i.status === "Overdue")
    : invoices

  const steps: TourStep[] = [
    {
      id: "stats",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#ledger-stats"),
      title: "Your money at a glance",
      description:
        "Three numbers that matter, updated the moment a webhook fires.",
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "search",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#ledger-search"),
      title: "Find any invoice in ≤1s",
      description:
        "Search by customer, amount, or invoice number. Fuzzy matching included.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "filter",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#ledger-filter"),
      title: "Filter without leaving the page 🪄",
      description:
        "Stack filters — status, date range, amount. Your filters save to the URL.",
      effect: ({ show }) => {
        setFilterOverdue(true)
        show()
        return () => setFilterOverdue(false)
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "row-menu",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#ledger-row-menu"),
      title: "Quick actions per row",
      description:
        "Resend, void, duplicate, or download as PDF — no nav required.",
      effect: ({ show }) => {
        setMenuOpenRowId("INV-0021")
        show()
        return () => setMenuOpenRowId(null)
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "bulk",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#ledger-bulk"),
      title: "Select many, act once",
      description:
        "Check multiple rows to resend, export, or mark paid in bulk.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "export",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#ledger-export"),
      title: "Leave with your data",
      description:
        "CSV, Excel, or scheduled email digest — your data is always yours.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Done", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Stack gap="3">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Tour Ledger
      </Button>

      <TourAppShell
        logo={<Text fontWeight="bold">Ledger</Text>}
        actions={
          <IconButton
            id="ledger-export"
            aria-label="Export"
            size="sm"
            variant="outline"
          >
            <LuDownload />
          </IconButton>
        }
      >
        <Stack gap="4">
          <HStack id="ledger-stats" gap="3">
            <StatCard label="Outstanding" value="$12,400" />
            <StatCard label="Paid this month" value="$34,200" />
            <StatCard label="Overdue" value="3" tone="red" />
          </HStack>

          <HStack justify="space-between">
            <HStack
              id="ledger-search"
              gap="2"
              borderWidth="1px"
              borderRadius="md"
              px="2"
            >
              <LuSearch />
              <Input
                variant="flushed"
                border="none"
                size="sm"
                placeholder="Search invoices…"
              />
            </HStack>
            <Button id="ledger-filter" size="sm" variant="outline">
              <LuFilter /> {filterOverdue ? "Status: Overdue" : "Filter"}
            </Button>
          </HStack>

          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader id="ledger-bulk" w="8">
                  <Checkbox.Root size="sm">
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.ColumnHeader>
                <Table.ColumnHeader>Invoice</Table.ColumnHeader>
                <Table.ColumnHeader>Customer</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Amount</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Issued</Table.ColumnHeader>
                <Table.ColumnHeader w="8"></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {visible.map((row, i) => (
                <Table.Row key={row.id}>
                  <Table.Cell>
                    <Checkbox.Root size="sm">
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell>{row.id}</Table.Cell>
                  <Table.Cell>{row.customer}</Table.Cell>
                  <Table.Cell textAlign="end">{row.amount}</Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={statusPalette[row.status]}>
                      {row.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{row.issued}</Table.Cell>
                  <Table.Cell>
                    <Menu.Root open={menuOpenRowId === row.id}>
                      <Menu.Trigger asChild>
                        <IconButton
                          id={i === 0 ? "ledger-row-menu" : undefined}
                          aria-label="Actions"
                          size="xs"
                          variant="ghost"
                          onClick={() =>
                            setMenuOpenRowId((id) =>
                              id === row.id ? null : row.id,
                            )
                          }
                        >
                          <LuEllipsis />
                        </IconButton>
                      </Menu.Trigger>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value="resend">Resend</Menu.Item>
                          <Menu.Item value="void">Void</Menu.Item>
                          <Menu.Item value="duplicate">Duplicate</Menu.Item>
                          <Menu.Item value="pdf">Download PDF</Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Menu.Root>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      </TourAppShell>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const StatCard = (props: { label: string; value: string; tone?: string }) => (
  <Stat.Root
    flex="1"
    borderWidth="1px"
    borderRadius="md"
    p="3"
    borderColor={props.tone === "red" ? "red.emphasized" : undefined}
  >
    <Stat.Label>{props.label}</Stat.Label>
    <Stat.ValueText>{props.value}</Stat.ValueText>
  </Stat.Root>
)
