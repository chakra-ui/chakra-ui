"use client"

import {
  Image,
  Listbox,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"

export const ListboxHorizontal = () => {
  return (
    <Listbox.Root
      collection={musicAlbums}
      orientation="horizontal"
      maxW="640px"
    >
      <Listbox.Label>Select Album</Listbox.Label>
      <Listbox.Content>
        {musicAlbums.items.map((album) => (
          <Listbox.Item
            item={album}
            key={album.value}
            flexDirection="column"
            alignItems="flex-start"
            gap="2"
            position="relative"
          >
            <Image
              src={album.image}
              alt={album.title}
              bg="bg.subtle"
              objectFit="cover"
              aspectRatio="1"
              borderRadius="l2"
              flexShrink="0"
              height="150px"
              minWidth="150px"
            />
            <Stack gap="0">
              <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
                {album.title}
              </Text>
              <Text fontSize="xs">{album.artist}</Text>
            </Stack>
            <Listbox.ItemIndicator
              position="absolute"
              top="4"
              right="4"
              layerStyle="fill.solid"
              borderWidth="2px"
              borderColor="fg.inverted"
            />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const musicAlbums = createListCollection({
  items: [
    {
      value: "euphoric-echoes",
      title: "Euphoric Echoes",
      artist: "Luna Solstice",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=160&h=160&fit=crop",
    },
    {
      value: "neon-dreamscape",
      title: "Neon Dreamscape",
      artist: "Electra Skyline",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=160&h=160&fit=crop",
    },
    {
      value: "cosmic-serenade",
      title: "Cosmic Serenade",
      artist: "Orion's Symphony",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=160&h=160&fit=crop",
    },
    {
      value: "melancholy-melodies",
      title: "Melancholy Melodies",
      artist: "Violet Mistral",
      image:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=160&h=160&fit=crop",
    },
    {
      value: "rhythmic-illusions",
      title: "Rhythmic Illusions",
      artist: "Mirage Beats",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=160&fit=crop",
    },
  ],
})
