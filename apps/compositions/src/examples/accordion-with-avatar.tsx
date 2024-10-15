import { Badge, HStack } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "compositions/ui/accordion"
import { Avatar } from "compositions/ui/avatar"
import { LuTrophy } from "react-icons/lu"
import { LoremIpsum } from "react-lorem-ipsum"

export const AccordionWithAvatar = () => {
  return (
    <AccordionRoot collapsible defaultValue={["b"]}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={item.name}>
          <AccordionItemTrigger>
            <Avatar shape="rounded" src={item.image} name={item.name} />
            <HStack>
              {item.name}{" "}
              {item.topRated && (
                <Badge colorPalette="green">
                  <LuTrophy />
                  Top Rated
                </Badge>
              )}
            </HStack>
          </AccordionItemTrigger>
          <AccordionItemContent>{item.bio}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
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
