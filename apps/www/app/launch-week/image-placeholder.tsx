import { Box, Center, Icon, Text, VStack } from "@chakra-ui/react"
import { LuVideo } from "react-icons/lu"

interface ImagePlaceholderProps {
  height: string
  color: string
  [key: string]: any
}

export const ImagePlaceholder = (props: ImagePlaceholderProps) => {
  const { height, color, ...rest } = props
  return (
    <Center
      w="full"
      h={height}
      bg={{ base: `${color}.50`, _dark: `${color}.950` }}
      color="fg.muted"
      fontSize="sm"
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      border="1px solid"
      borderColor="border.muted"
      {...rest}
    >
      <VStack gap={2}>
        <Icon size="2xl" color="fg.muted">
          <LuVideo />
        </Icon>
        <Text fontSize="sm" fontWeight="medium">
          Launch Week Preview
        </Text>
      </VStack>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient={{
          base: "linear(45deg, transparent, whiteAlpha.200, transparent)",
          _dark: "linear(45deg, transparent, blackAlpha.200, transparent)",
        }}
        pointerEvents="none"
      />
    </Center>
  )
}
