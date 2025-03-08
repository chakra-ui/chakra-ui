import { Accordion, Avatar, Badge, HStack } from "@chakra-ui/react"
import { LuTrophy } from "react-icons/lu"
import { LoremIpsum } from "react-lorem-ipsum"

export const AccordionWithAvatar = () => {
  return (
    <Accordion.Root collapsible defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.name}>
          <Accordion.ItemTrigger>
            <Avatar.Root shape="rounded">
              <Avatar.Image src={item.image} />
              <Avatar.Fallback name={item.name} />
            </Avatar.Root>
            <HStack flex="1">
              {item.name}{" "}
              {item.topRated && (
                <Badge colorPalette="green">
                  <LuTrophy />
                  Top Rated
                </Badge>
              )}
            </HStack>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.bio}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const items = [
  {
    name: "Alex",
    bio: <LoremIpsum />,
    image: "https://i.pravatar.cc/150?u=a",
    topRated: false,
  },
  {
    name: "Benji",
    bio: <LoremIpsum />,
    image: "https://i.pravatar.cc/150?u=b",
    topRated: true,
  },
  {
    name: "Charlie",
    bio: <LoremIpsum />,
    image: "https://i.pravatar.cc/150?u=c",
    topRated: false,
  },
]
