import React from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "./Menu";
import { IconButtonProps, IconButton } from "../IconButton";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { Link } from "../Link";
import { theme } from "@chakra-ui/theme";

export function TaskActions() {
  return (
    <Menu placement="right" autoSelect={false}>
      <MenuButton<IconButtonProps<{}, HTMLButtonElement>>
        as={IconButton}
        icon="chevron-down"
        aria-label="welcome"
        size="sm"
      />
      <MenuList zIndex={40}>
        <MenuItem>Edit...</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Delete...</MenuItem>
      </MenuList>
    </Menu>
  );
}

export function TaskCard({
  id,
  projectId,
  task,
  taskListIndex,
  isDragging,
}: any) {
  const taskId = 1;
  const taskPath =
    task.type === "discussion"
      ? `/projects/${projectId}/tasks/${id}/forum`
      : `/projects/${projectId}/tasks/${id}/questions`;

  const taskTypeCopy = task.type === "discussion" ? "Forum" : "Survey";
  const isCurrentTask = task.id === Number(taskId);
  const borderColor = "gray.200";

  const bottomBorderColor = isCurrentTask ? "blue.200" : "gray.200";
  const isPlaceholder = task.id < 0;

  return (
    <Flex
      backgroundColor={isDragging ? "gray.50" : "white"}
      borderWidth="1px"
      borderColor={borderColor}
      borderBottomColor={bottomBorderColor}
      borderBottomWidth="1px"
      width="full"
      boxShadow={isDragging && "lg"}
    >
      <Box
        display="flex"
        width="full"
        padding={4}
        boxShadow={
          isCurrentTask
            ? `inset 0 0 3px 0 ${theme.colors.blue[200]}`
            : undefined
        }
      >
        <Stack isInline={true} spacing={4}>
          <Stack justify="space-between">
            <Heading
              size="xs"
              color="gray.500"
              textTransform="uppercase"
              fontWeight="semibold"
            >
              {taskTypeCopy} &bull; {task.alias}
            </Heading>
            <Link href={taskPath}>
              <Heading size="sm" maxWidth="4xl">
                {task.title}
              </Heading>
            </Link>
            {task.description && (
              <Text fontSize="sm" maxWidth="4xl" color="gray.500">
                {task.description}
              </Text>
            )}
          </Stack>
        </Stack>
        <Stack
          justify="space-between"
          align="flex-end"
          marginLeft="auto"
          paddingLeft={4}
        >
          <TaskActions />
        </Stack>
      </Box>
    </Flex>
  );
}

const task = {
  id: 1,
  alias: "T1",
  title: "Introduce yourself",
  description: "tell us about your life",
};

const tasks = [...Array(30)].map(x => task);

export function BugExample() {
  return (
    <Box padding={4}>
      <Heading>
        Welcome to{" "}
        <span role="img" aria-label="logo">
          ⚡️
        </span>{" "}
        Chakra UI
      </Heading>
      <Stack width="300px" height="500px" overflow="auto">
        {tasks.map(t => (
          <TaskCard
            id={t.id}
            projectId={1}
            task={t}
            taskListIndex={0}
            isDragging={false}
          />
        ))}
      </Stack>
    </Box>
  );
}
