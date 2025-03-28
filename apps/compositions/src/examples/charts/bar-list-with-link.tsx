"use client"

import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

export const BarListWithLink = () => {
  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Created", value: 120, href: "#" },
      { name: "Initial Contact", value: 90, href: "#" },
      { name: "Booked Demo", value: 45, href: "#" },
      { name: "Closed", value: 10, href: "#" },
    ],
    series: [{ name: "name", color: "pink.subtle" }],
  })

  return (
    <BarList.Root chart={chart}>
      <BarList.Content>
        <BarList.Bar
          label={({ payload }) => <a href={payload.href}>{payload.name}</a>}
        />
        <BarList.Value />
      </BarList.Content>
    </BarList.Root>
  )
}
