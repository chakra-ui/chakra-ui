import { Group, Stat } from "@chakra-ui/react"

const stats = [
  { label: "New Users", value: "234", diff: -12, helpText: "Till date" },
  { label: "Sales", value: "£12,340", diff: 12, helpText: "Last 30 days" },
  { label: "Revenue", value: "3,450", diff: 4.5, helpText: "Last 30 days" },
]

export const StatBasic = () => {
  return (
    <Group gap="10" width="full">
      {stats.map((item) => (
        <Stat.Root key={item.label}>
          <Stat.Label>{item.label}</Stat.Label>
          <Stat.ValueText>{item.value}</Stat.ValueText>
          <Stat.HelpText>
            {item.diff > 0 ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
            {item.diff}% {item.helpText}
          </Stat.HelpText>
        </Stat.Root>
      ))}
    </Group>
  )
}
