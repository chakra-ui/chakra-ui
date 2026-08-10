# Chakra UI Charts Reference

Charts live in a separate package. Install it alongside `@chakra-ui/react`:

```bash
# npm
npm install @chakra-ui/charts recharts

# pnpm
pnpm add @chakra-ui/charts recharts

# yarn
yarn add @chakra-ui/charts recharts
```

Imports come from `@chakra-ui/charts`, not `@chakra-ui/react`:

```ts
import { BarList, BarSegment, Chart, useChart } from "@chakra-ui/charts"
import type { BarListData, BarSegmentData } from "@chakra-ui/charts"
```

---

## Three chart types

| Component               | Best for                                       | Recharts? |
| ----------------------- | ---------------------------------------------- | --------- |
| `BarList`               | Rankings, comparisons (horizontal bar per row) | No        |
| `BarSegment`            | Composition / parts of a whole (stacked bar)   | No        |
| `Chart.Root` + Recharts | Line, area, bar, pie, radar, and more          | Yes       |

---

## `useChart` — the core hook

Every chart starts with `useChart`. It processes data, resolves color tokens,
and provides utilities used throughout the chart's compound components.

```ts
const chart = useChart({
  data: [...],           // array of data objects
  series: [...],         // which keys to plot and how to color them
  sort: { by: "value", direction: "desc" },  // optional
})
```

**`series` items:**

```ts
{
  name: keyof T          // data key to read values from
  color: ChartColor      // Chakra token ("teal.solid") or CSS color ("#FF0000")
  label?: ReactNode      // display name in legend/tooltip (defaults to name)
  stackId?: string       // for stacking in Recharts charts
  yAxisId?: string       // for dual-axis charts
}
```

**Color type** — accepts any Chakra color token or CSS color:

```ts
type ChartColor = Tokens["colors"] | CSSProperties["color"]
// "teal.solid" | "blue.subtle" | "red.500" | "#FF0000" | "hsl(...)"
```

**Useful return values:**

```ts
chart.data // sorted data array
chart.series // resolved series config
chart.color("teal.solid") // resolves token → CSS color
chart.key("revenue") // safe key accessor
chart.formatNumber({ notation: "compact" })(1234567) // "1.2M"
chart.formatDate({ month: "short" })("2024-01-15") // locale-aware
chart.getTotal("revenue") // sum all values
chart.getMin("revenue") / chart.getMax("revenue")
chart.getValuePercent("revenue", value) // % of total
```

---

## BarList

Horizontal bar chart — one bar per data row. Good for leaderboards, traffic
sources, top items.

**Data shape:**

```ts
interface BarListData {
  name: string // label shown on the bar
  value: number // determines bar width
  href?: string // optional link
}
```

**Basic example:**

```tsx
import { BarList, type BarListData, useChart } from "@chakra-ui/charts"

const chart = useChart<BarListData>({
  data: [
    { name: "Google", value: 1_200_000 },
    { name: "Direct", value: 840_000 },
    { name: "Twitter", value: 320_000 },
    { name: "LinkedIn", value: 95_000 },
  ],
  sort: { by: "value", direction: "desc" },
  series: [{ name: "name", color: "teal.subtle" }],
})

return (
  <BarList.Root chart={chart}>
    <BarList.Content>
      <BarList.Label title="Source" flex="1">
        <BarList.Bar tooltip />
      </BarList.Label>
      <BarList.Label title="Visits" titleAlignment="end">
        <BarList.Value />
      </BarList.Label>
    </BarList.Content>
  </BarList.Root>
)
```

**With a custom value formatter:**

```tsx
<BarList.Value valueFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
```

**With multiple value columns:**

```tsx
<BarList.Label title="Visits" minW="16" titleAlignment="end">
  <BarList.Value />
</BarList.Label>
<BarList.Label title="%" minW="12" titleAlignment="end">
  <BarList.Value
    valueFormatter={(v) =>
      `${chart.getValuePercent("value", v).toFixed(0)}%`
    }
  />
</BarList.Label>
```

---

## BarSegment

Single horizontal bar broken into colored segments. Good for showing how a total
is split across categories (budget, traffic, inventory).

**Data shape:**

```ts
interface BarSegmentData {
  name: string // segment label
  value: number // determines segment width
  color: string // Chakra color token for this segment
}
```

**Basic example:**

```tsx
import { BarSegment, useChart } from "@chakra-ui/charts"

const chart = useChart({
  data: [
    { name: "Google", value: 500_000, color: "teal.solid" },
    { name: "Direct", value: 300_000, color: "blue.solid" },
    { name: "Twitter", value: 150_000, color: "purple.solid" },
    { name: "LinkedIn", value: 50_000, color: "orange.solid" },
  ],
  sort: { by: "value", direction: "desc" },
})

return (
  <BarSegment.Root chart={chart}>
    <BarSegment.Content>
      <BarSegment.Value />
      <BarSegment.Bar tooltip />
      <BarSegment.Label />
    </BarSegment.Content>
    <BarSegment.Legend showPercent showValue />
  </BarSegment.Root>
)
```

**With a reference line (e.g. target):**

```tsx
<BarSegment.Bar tooltip>
  <BarSegment.Reference label="Target" value={600_000} />
</BarSegment.Bar>
```

---

## Chart.Root + Recharts

Wrapper for any Recharts chart. Handles sizing, token resolution, and styled
tooltips and legends. You still compose the chart using standard Recharts
components — `BarChart`, `AreaChart`, `LineChart`, `PieChart`, etc.

### Bar chart

```tsx
import { Chart, useChart } from "@chakra-ui/charts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const chart = useChart({
  data: [
    { month: "Jan", revenue: 186, expenses: 80 },
    { month: "Feb", revenue: 165, expenses: 95 },
    { month: "Mar", revenue: 210, expenses: 110 },
  ],
  series: [
    { name: "revenue", color: "teal.solid" },
    { name: "expenses", color: "orange.solid" },
  ],
})

return (
  <Chart.Root maxH="sm" chart={chart}>
    <BarChart data={chart.data}>
      <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
      <XAxis dataKey={chart.key("month")} />
      <YAxis />
      <Tooltip cursor={false} content={<Chart.Tooltip />} />
      <Legend content={<Chart.Legend />} />
      {chart.series.map((item) => (
        <Bar
          key={item.name}
          dataKey={chart.key(item.name)}
          fill={chart.color(item.color)}
          radius={4}
        />
      ))}
    </BarChart>
  </Chart.Root>
)
```

### Area chart

```tsx
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts"

return (
  <Chart.Root maxH="sm" chart={chart}>
    <AreaChart data={chart.data}>
      <defs>
        {chart.series.map((item) => (
          <Chart.Gradient
            key={item.name}
            id={item.name}
            stops={[
              { offset: "0%", color: item.color, opacity: 0.2 },
              { offset: "100%", color: item.color, opacity: 0 },
            ]}
          />
        ))}
      </defs>
      <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
      <XAxis dataKey={chart.key("month")} />
      <Tooltip cursor={false} content={<Chart.Tooltip />} />
      {chart.series.map((item) => (
        <Area
          key={item.name}
          dataKey={chart.key(item.name)}
          stroke={chart.color(item.color)}
          fill={`url(#${item.name})`}
          stackId="a"
        />
      ))}
    </AreaChart>
  </Chart.Root>
)
```

### Pie / donut chart

```tsx
import { Pie, PieChart, Tooltip } from "recharts"

const chart = useChart({
  data: [
    { browser: "Chrome", visitors: 275, color: "teal.solid" },
    { browser: "Safari", visitors: 200, color: "blue.solid" },
    { browser: "Firefox", visitors: 120, color: "orange.solid" },
    { browser: "Edge", visitors: 80, color: "purple.solid" },
  ],
  series: [{ name: "visitors" }],
})

return (
  <Chart.Root maxH="sm" chart={chart}>
    <PieChart>
      <Tooltip content={<Chart.Tooltip hideLabel />} />
      <Pie
        data={chart.data}
        dataKey={chart.key("visitors")}
        nameKey={chart.key("browser")}
        innerRadius="60%" // remove for a filled pie
        paddingAngle={2}
      >
        {chart.data.map((item, index) => (
          <Cell key={index} fill={chart.color(item.color)} />
        ))}
        {/* Center text for donut */}
        <Label
          content={
            <Chart.RadialText
              viewBox={undefined}
              title={chart.getTotal("visitors").toLocaleString()}
              description="Total visitors"
            />
          }
          position="center"
        />
      </Pie>
    </PieChart>
  </Chart.Root>
)
```

---

## Chart sub-components

### `Chart.Tooltip`

```tsx
<Tooltip
  cursor={false}
  content={
    <Chart.Tooltip
      showTotal // show sum of all series at bottom
      hideLabel // hide the x-axis label row
      hideSeriesLabel // hide series names
      indicator="line" // "dot" | "line" | "dashed"
      formatter={(value, name) => [`$${value}`, name]}
    />
  }
/>
```

### `Chart.Legend`

```tsx
<Legend
  content={
    <Chart.Legend
      title="Channels"
      interaction="click" // "hover" (default) | "click"
      verticalAlign="top" // "top" | "bottom" (default)
      align="right" // "left" | "center" (default) | "right"
    />
  }
/>
```

Legend interaction highlights/dims series on hover or click.

### `Chart.Gradient`

Defines an SVG gradient for area fills. Must be inside a `<defs>` block:

```tsx
<defs>
  <Chart.Gradient
    id="revenue-gradient"
    stops={[
      { offset: "0%",   color: "teal.solid", opacity: 0.3 },
      { offset: "100%", color: "teal.solid", opacity: 0   },
    ]}
  />
</defs>

<Area fill="url(#revenue-gradient)" ... />
```

### `Chart.RadialText`

Centers a title + description inside a pie or donut chart:

```tsx
<Label
  content={
    <Chart.RadialText
      viewBox={undefined}
      title="$1.2M"
      description="Total revenue"
    />
  }
  position="center"
/>
```

---

## Colors and theming

All chart colors accept Chakra token strings or plain CSS colors:

```ts
// Chakra semantic tokens — respond to light/dark mode
color: "teal.solid"
color: "blue.subtle"
color: "border.muted" // useful for grid lines

// Palette steps
color: "blue.500"

// Raw CSS
color: "#3b82f6"
color: "hsl(210, 100%, 56%)"
```

Use `chart.color(token)` to resolve a token to a CSS value wherever Recharts
needs a string (e.g. `fill`, `stroke`, `CartesianGrid stroke`).

Recommended color tokens for multi-series charts:

```ts
series: [
  { name: "a", color: "teal.solid" },
  { name: "b", color: "blue.solid" },
  { name: "c", color: "purple.solid" },
  { name: "d", color: "orange.solid" },
  { name: "e", color: "red.solid" },
]
```

---

## Output format

When building chart components:

1. Show the `useChart` setup and data shape first
2. Produce complete, runnable JSX with correct imports from both
   `@chakra-ui/charts` and `recharts`
3. Use `chart.color("border.muted")` for grid lines so they respect dark mode
4. Default `Chart.Root` to `maxH="sm"` unless the user specifies a size
5. Include a `Tooltip` with `<Chart.Tooltip />` on every chart — it's almost
   always wanted
6. Note the install command if the project doesn't already have
   `@chakra-ui/charts`
