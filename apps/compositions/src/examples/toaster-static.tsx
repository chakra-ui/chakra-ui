"use client"

import { Box, Spinner, Stack, useSlotRecipe } from "@chakra-ui/react"
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiX,
  HiXCircle,
} from "react-icons/hi"

export const ToasterStatic = () => {
  const recipe = useSlotRecipe({ key: "toast" })
  const styles = recipe()

  return (
    <Stack gap="8">
      <Box width="420px" css={styles.root}>
        <Spinner size="sm" color="red" />
        <Stack gap="1" flex="1" maxWidth="100%">
          <Box css={styles.title}>Loading...</Box>
          <Box css={styles.description}>Some description of the loading.</Box>
        </Stack>
        <Box as="button" css={styles.actionTrigger}>
          Retry
        </Box>
        <Box
          as="button"
          css={styles.closeTrigger}
          className="chakra-toast__closeTrigger"
        >
          <HiX />
        </Box>
      </Box>

      <Box data-type="error" width="420px" css={styles.root}>
        <Box css={styles.indicator} asChild>
          <HiXCircle />
        </Box>
        <Stack gap="1" flex="1" maxWidth="100%">
          <Box css={styles.title}>Error</Box>
          <Box css={styles.description}>Some description of the error</Box>
        </Stack>
        <Box as="button" css={styles.actionTrigger}>
          Retry
        </Box>
        <Box
          as="button"
          css={styles.closeTrigger}
          className="chakra-toast__closeTrigger"
        >
          <HiX />
        </Box>
      </Box>

      <Box data-type="success" width="420px" css={styles.root}>
        <Box css={styles.indicator} asChild>
          <HiCheckCircle />
        </Box>
        <Stack gap="1" flex="1" maxWidth="100%">
          <Box css={styles.title}>Success</Box>
          <Box css={styles.description}>Some description of the success</Box>
        </Stack>
        <Box as="button" css={styles.actionTrigger}>
          Retry
        </Box>
        <Box
          as="button"
          css={styles.closeTrigger}
          className="chakra-toast__closeTrigger"
        >
          <HiX />
        </Box>
      </Box>

      <Box data-type="warning" width="420px" css={styles.root}>
        <Box css={styles.indicator} asChild>
          <HiExclamationCircle />
        </Box>
        <Stack gap="1" flex="1" maxWidth="100%">
          <Box css={styles.title}>Warning</Box>
          <Box css={styles.description}>Some description of the warning</Box>
        </Stack>
        <Box as="button" css={styles.actionTrigger}>
          Retry
        </Box>
        <Box
          as="button"
          css={styles.closeTrigger}
          className="chakra-toast__closeTrigger"
        >
          <HiX />
        </Box>
      </Box>
    </Stack>
  )
}
