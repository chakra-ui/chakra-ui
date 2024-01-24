module.exports = {
  App: `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Button,
  Flex,
  Box,
  IconButton,
  useColorMode,
  Text,
  HStack,
  Avatar,
  AvatarBadge,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const CustomButton = ({ label, notifications, colorMode }) => (
  <Box
    h="40px"
    cursor="pointer"
    p={2}
    _hover={{
      borderBottomWidth: "2px",
      borderBottomColor: colorMode === "light" ? "blue.600" : "blue.200",
    }}
  >
    <HStack>
      <Box>
        <Text fontSize={"sm"}>{label}</Text>
      </Box>
      {notifications && (
        <Box
          bg={colorMode === "light" ? "blue.50" : "blue.300"}
          pl={1.5}
          pr={1.5}
          borderRadius="full"
        >
          <Text fontSize={"xs"}>{notifications}</Text>
        </Box>
      )}
    </HStack>
  </Box>
);

const Notification = ({
  name,
  src,
  action,
  time,
  hasBadge,
  colorMode,
  ...rest
}) => (
  <Box
    bg={
      hasBadge
        ? colorMode === "light"
          ? "gray.100"
          : "gray.600"
        : "transparent"
    }
    {...rest}
  >
    <Flex gap={3} p={2}>
      <Box>
        <Avatar size="sm" name={name} src={src}>
          {hasBadge && (
            <AvatarBadge
              placement="top-start"
              bg={colorMode === "light" ? "blue.600" : "blue.300"}
              borderWidth="2px"
              boxSize="12px"
            />
          )}
        </Avatar>
      </Box>

      <VStack>
        <Box>
          <Text fontSize={"sm"}>
            <b>{name}</b> {action}
          </Text>
        </Box>
        <Box alignSelf={"flex-start"} mt="0 !important">
          <Text fontSize={"xs"} fontWeight="lighter">
            {time}
          </Text>
        </Box>
      </VStack>
    </Flex>
  </Box>
);

const PopoverExample = ({ name, colorMode, ...rest }) => (
  <Box>
    <Popover size="md" {...rest}>
      <PopoverTrigger>
        <Button variant="outline">{name}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <Flex justify="space-between" align="center" p={2}>
            <Box>
              <Text as="b">Notifications</Text>
            </Box>
            <Box>
              <Button size="xs" colorScheme={"blue"} variant="ghost">
                Mark all as read
              </Button>
            </Box>
          </Flex>
          <Flex gap={4}>
            <CustomButton
              label={"All"}
              notifications={2}
              colorMode={colorMode}
            />
            <CustomButton label={"Following"} colorMode={colorMode} />
            <CustomButton label={"Archive"} colorMode={colorMode} />
          </Flex>
        </PopoverHeader>
        <PopoverBody>
          <VStack
            justify="flex-start"
            divider={<StackDivider bg="gray.600" m={"0 !important"} />}
            align="stretch"
          >
            <Notification
              name="Segun Adebayo"
              action="created Chakra UI"
              time="10 min ago"
              src="https://bit.ly/sage-adebayo"
              hasBadge={true}
              colorMode={colorMode}
            />
            <Notification
              name="Dan Abramov"
              action="created Redux"
              time="1 hour ago"
              src="https://bit.ly/dan-abramov"
              hasBadge={true}
              colorMode={colorMode}
            />
            <Notification
              name="Gleb Koshcheev"
              action="added theme docs"
              time="12:10pm"
              colorMode={colorMode}
            />
            <Notification
              name="Jacob Jones"
              action="deleted profile image"
              time="11:30am"
              colorMode={colorMode}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </Box>
);

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box pos="relative">
      <Flex
        direction="column"
        gap={3}
        align="center"
        p={8}
        alignItems={"center"}
        justify="center"
      >
        <PopoverExample name={"Themed Popover"} colorMode={colorMode} />

        <PopoverExample
          name={"Themed XL Popover"}
          size="xl"
          colorMode={colorMode}
        />
        <PopoverExample
          name={"Themed XL Rounded Popover"}
          size="xl"
          variant="rounded"
          colorMode={colorMode}
        />
      </Flex>
      <Box>
        <IconButton
          aria-label="toggle theme"
          rounded="full"
          size="xs"
          position="fixed"
          bottom={4}
          left={4}
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        />
      </Box>
    </Box>
  );
}`,
  Index: `import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { popoverTheme } from "./theme/components/Popover";
export const theme = extendTheme({
  components: { Popover: popoverTheme }
});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);`,
  PopoverTheme: `import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  content: {
    boxShadow: "lg",
    w: "330px",
  },
  header: {
    pb: 0,
    borderBottomWidth: "1px",
    borderBottomColor: mode("gray.200", "gray.500")(props),
  },
  body: {
    p: 0,
  },
}));

const sizes = {
  xl: definePartsStyle({
    content: {
      w: "400px",
    },
  }),
};

const rounded = definePartsStyle({
  content: {
    borderRadius: "35px",
  },
});

const variants = {
  rounded,
};

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});`,
}
