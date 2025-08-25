"use client"

import {
  Box,
  Flex,
  Image,
  Listbox,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useState } from "react"

export const ListboxImageExplorer = () => {
  const [selectedImage, setSelectedImage] = useState<string>("mountains")

  const handleSelectionChange = (details: any) => {
    if (details.value.length > 0) {
      setSelectedImage(details.value[0])
    }
  }

  const currentImage = images.items.find((img) => img.value === selectedImage)

  return (
    <Flex gap="6" maxW="800px">
      <Listbox.Root
        maxW="2xs"
        collection={images}
        value={[selectedImage]}
        onValueChange={handleSelectionChange}
        variant="solid"
      >
        <Listbox.Content border="0">
          {images.items.map((image) => (
            <Listbox.Item item={image} key={image.value}>
              <Listbox.ItemText>{image.label}</Listbox.ItemText>
              <Listbox.ItemIndicator />
            </Listbox.Item>
          ))}
        </Listbox.Content>
      </Listbox.Root>

      <Box flex="1">
        {currentImage && (
          <Box>
            <Text fontSize="lg" fontWeight="semibold" mb="3">
              {currentImage.label}
            </Text>
            <Image
              src={currentImage.url}
              alt={currentImage.label}
              borderRadius="md"
              maxH="400px"
              width="full"
              objectFit="cover"
            />
            <Text fontSize="sm" color="fg.muted" mt="2">
              {currentImage.description}
            </Text>
          </Box>
        )}
      </Box>
    </Flex>
  )
}

const images = createListCollection({
  items: [
    {
      label: "Mountain Landscape",
      value: "mountains",
      description: "Scenic mountain view",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      label: "Ocean Waves",
      value: "ocean",
      description: "Peaceful ocean scene",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
    },
    {
      label: "Forest Path",
      value: "forest",
      description: "Tranquil forest trail",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
    {
      label: "City Skyline",
      value: "city",
      description: "Urban cityscape at night",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      label: "Desert Dunes",
      value: "desert",
      description: "Golden sand dunes",
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop",
    },
  ],
})
