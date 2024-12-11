import { List } from "@chakra-ui/react"

const items = [
  "Your failure to comply with any provision of these Terms of Service;",
  "Your use of the Services, including but not limited to economic, physical, emotional, psychological or privacy related considerations; and",
  "Your actions to knowingly affect the Services via any bloatware, malware, computer virus, worm, Trojan horse, spyware, adware, crimeware, scareware, rootkit or any other program installed in a way that executable code of any program is scheduled to utilize or utilizes processor cycles during periods of time when such program is not directly or indirectly being used.",
]

export const ListWithMarkerStyle = () => {
  return (
    <List.Root as="ol" listStyle="decimal">
      {items.map((item, index) => (
        <List.Item key={index} _marker={{ color: "inherit" }}>
          {item}
        </List.Item>
      ))}
    </List.Root>
  )
}
