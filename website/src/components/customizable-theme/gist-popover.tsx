import {
  Link,
  Box,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  Text,
} from "@chakra-ui/react"
import { useState, ReactElement } from "react"
import { getFromGistId, isValidGistId } from "./helpers"

function GistPopover({ icon }) {
  const [state, setState] = useState({ isLoading: false, error: false })
  function onSubmit(event) {
    event.preventDefault()
    const {
      target: {
        url,
        url: { value },
      },
    } = event
    const fromGistId: string = value.split("/").pop()
    if (!isValidGistId(fromGistId)) {
      return
    }
    url.value = ""
    setState((it) => ({ ...it, isLoading: true }))
    getFromGistId(fromGistId).then(
      (it) => {
        console.log("Success", it)
        setState((it) => ({ ...it, isLoading: false }))
      },
      (error) => {
        setState((it) => ({ ...it, isLoading: false, error: error.message }))
      },
    )
  }
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          variant="link"
          size="xs"
          icon={icon as ReactElement}
          aria-label="Gist"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color="gray.900" fontWeight="medium">
          Apply Custom Theme
        </PopoverHeader>
        <PopoverBody color="gray.700">
          <Text>
            You may apply a custom theme to this docs site, directly from a
            public Gist. <br />
            Let's try it!
          </Text>
          <Box as="form" onSubmit={onSubmit}>
            <FormControl
              id="url"
              isDisabled={state.isLoading}
              isInvalid={!!state.error}
            >
              <FormLabel>Gist url</FormLabel>
              <Input type="url" />
              <FormHelperText>
                eg.
                <Link
                  ms={2}
                  isExternal
                  href="https://gist.github.com/tomchentw/989ad340001061726bf2c0734d3739cf"
                >
                  https://gist.github.com/tomchentw/989ad340001061726bf2c0734d3739cf
                </Link>
              </FormHelperText>
              <FormErrorMessage>{state.error}</FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={state.isLoading}
              type="submit"
            >
              Apply it!
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default GistPopover
