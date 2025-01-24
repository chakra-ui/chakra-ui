"use client"

import {
  Box,
  Button,
  Input,
  Loader,
  LoaderOverlay,
  Stack,
} from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import { useState } from "react"

export const LoaderWithOverlay = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Stack maxW="xl" gap="4">
      <Box position="relative" p="6" bg="bg.panel" shadow="sm" rounded="l3">
        <Stack gap="4">
          <Field label="First name">
            <Input />
          </Field>
          <Field label="Last name">
            <Input />
          </Field>
          <Button>Click me</Button>
        </Stack>
        {loading && (
          <LoaderOverlay bg="bg/80" rounded="l3">
            <Loader textStyle="sm" fontWeight="medium" text="Loading..." />
          </LoaderOverlay>
        )}
      </Box>
      <Button
        alignSelf="flex-start"
        variant="outline"
        onClick={() => setLoading((c) => !c)}
      >
        Toggle loading
      </Button>
    </Stack>
  )
}
