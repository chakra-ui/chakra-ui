import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/accordion"
import { applyTransform } from "./test-utils"

describe("accordion codemod", () => {
  describe("basic transformations", () => {
    it("should rename Accordion to Accordion.Root", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  return <Accordion><div>Content</div></Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <div>Content</div>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform allowMultiple to multiple", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  return <Accordion allowMultiple><div>Content</div></Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root multiple>
              <div>Content</div>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform allowToggle to collapsible", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  return <Accordion allowToggle><div>Content</div></Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root collapsible>
              <div>Content</div>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform defaultIndex to defaultValue with array", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  return <Accordion defaultIndex={0}><div>Content</div></Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root defaultValue={['0']}>
              <div>Content</div>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform index to value with array", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  return <Accordion index={1}><div>Content</div></Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root value={['1']}>
              <div>Content</div>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform onChange to onValueChange", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  const handleChange = (index) => console.log(index)
  return <Accordion onChange={handleChange}><div>Content</div></Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          const handleChange = (index) => console.log(index)
          return (
            <Accordion.Root onValueChange={({ value: value }) => handleChange(value)}>
              <div>Content</div>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })

  describe("AccordionItem transformations", () => {
    it("should rename AccordionItem to Accordion.Item", async () => {
      const input = `
import { Accordion, AccordionItem } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem>Content</AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">Content</Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should add value prop to AccordionItem if missing", async () => {
      const input = `
import { Accordion, AccordionItem } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem>Content</AccordionItem>
      <AccordionItem>Content 2</AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">Content</Accordion.Item>
              <Accordion.Item value="item-1">Content 2</Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should not add value prop if already present", async () => {
      const input = `
import { Accordion, AccordionItem } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem value="custom">Content</AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="custom">Content</Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })

  describe("child component transformations", () => {
    it("should rename AccordionButton to Accordion.ItemTrigger", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>Click me</AccordionButton>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">
                <Accordion.ItemTrigger>Click me</Accordion.ItemTrigger>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should rename AccordionIcon to Accordion.ItemIndicator", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionIcon } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>
          Title
          <AccordionIcon />
        </AccordionButton>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">
                <Accordion.ItemTrigger>
                  Title
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should wrap AccordionPanel content with ItemContent and ItemBody", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>Title</AccordionButton>
        <AccordionPanel>Content here</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">
                <Accordion.ItemTrigger>Title</Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content here</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete migration example", () => {
    it("should transform basic accordion without props", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'

<Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Content
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Content
    </AccordionPanel>
  </AccordionItem>
</Accordion>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion, Box } from '@chakra-ui/react'

        ;<Accordion.Root>
          <Accordion.Item value="item-0">
            <h2>
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent pb={4}>
              <Accordion.ItemBody>Content</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="item-1">
            <h2>
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent pb={4}>
              <Accordion.ItemBody>Content</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
        "
      `)
    })

    it("should transform accordion with defaultIndex array and allowMultiple", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'

<Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Content
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Content
    </AccordionPanel>
  </AccordionItem>
</Accordion>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion, Box } from '@chakra-ui/react'

        ;<Accordion.Root defaultValue={['0']} multiple>
          <Accordion.Item value="item-0">
            <h2>
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent pb={4}>
              <Accordion.ItemBody>Content</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="item-1">
            <h2>
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent pb={4}>
              <Accordion.ItemBody>Content</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
        "
      `)
    })

    it("should transform a complete basic accordion", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'

function App() {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Content
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Content
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion, Box } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root collapsible>
              <Accordion.Item value="item-0">
                <h2>
                  <Accordion.ItemTrigger>
                    <Box as="span" flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                </h2>
                <Accordion.ItemContent pb={4}>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
              <Accordion.Item value="item-1">
                <h2>
                  <Accordion.ItemTrigger>
                    <Box as="span" flex="1" textAlign="left">
                      Section 2 title
                    </Box>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                </h2>
                <Accordion.ItemContent pb={4}>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })

  describe("render prop transformations", () => {
    it("should transform mixed accordion with render prop on second item", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, AddIcon, MinusIcon } from '@chakra-ui/react'

<Accordion allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Content
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            {isExpanded ? (
              <MinusIcon fontSize='12px' />
            ) : (
              <AddIcon fontSize='12px' />
            )}
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Content
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
</Accordion>
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion, Box, AddIcon, MinusIcon } from '@chakra-ui/react'

        ;<Accordion.Root multiple>
          <Accordion.Item value="item-0">
            <h2>
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
            </h2>
            <Accordion.ItemContent pb={4}>
              <Accordion.ItemBody>Content</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="item-1">
            {({ isExpanded }) => (
              <>
                <h2>
                  <Accordion.ItemTrigger>
                    <Box as="span" flex="1" textAlign="left">
                      Section 2 title
                    </Box>
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </Accordion.ItemTrigger>
                </h2>
                <Accordion.ItemContent pb={4}>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </>
            )}
          </Accordion.Item>
        </Accordion.Root>
        "
      `)
    })

    it("should transform render prop with isExpanded", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AddIcon, MinusIcon } from '@chakra-ui/react'

function App() {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                Section 2 title
                {isExpanded ? <MinusIcon fontSize='12px' /> : <AddIcon fontSize='12px' />}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Content here
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion, AddIcon, MinusIcon } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root multiple>
              <Accordion.Item value="item-0">
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <Accordion.ItemTrigger>
                        Section 2 title
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" />
                        ) : (
                          <AddIcon fontSize="12px" />
                        )}
                      </Accordion.ItemTrigger>
                    </h2>
                    <Accordion.ItemContent pb={4}>
                      <Accordion.ItemBody>Content here</Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </>
                )}
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })

  describe("additional prop transformations", () => {
    it("should transform reduceMotion to animation='none' on ItemContent", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion reduceMotion>
      <AccordionItem>
        <AccordionButton>Title</AccordionButton>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">
                <Accordion.ItemTrigger>Title</Accordion.ItemTrigger>
                <Accordion.ItemContent animation="none">
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform isDisabled to disabled on AccordionItem", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem isDisabled>
        <AccordionButton>Title</AccordionButton>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item disabled value="item-0">
                <Accordion.ItemTrigger>Title</Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should remove isFocusable from AccordionItem", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem isFocusable>
        <AccordionButton>Title</AccordionButton>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">
                <Accordion.ItemTrigger>Title</Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should transform id to value on AccordionItem", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem id="custom-item">
        <AccordionButton>Title</AccordionButton>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="custom-item">
                <Accordion.ItemTrigger>Title</Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should preserve pseudo props on AccordionButton", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton _expanded={{ bg: 'blue.500' }} _hover={{ bg: 'gray.100' }}>
          Title
        </AccordionButton>
        <AccordionPanel>Content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root>
              <Accordion.Item value="item-0">
                <Accordion.ItemTrigger
                  _expanded={{ bg: 'blue.500' }}
                  _hover={{ bg: 'gray.100' }}
                >
                  Title
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })

    it("should handle combined props: reduceMotion, isDisabled, and id", async () => {
      const input = `
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'

function App() {
  return (
    <Accordion reduceMotion allowMultiple>
      <AccordionItem id="first" isDisabled isFocusable>
        <AccordionButton>Title 1</AccordionButton>
        <AccordionPanel pb={4}>Content 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem id="second">
        <AccordionButton>Title 2</AccordionButton>
        <AccordionPanel>Content 2</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root multiple>
              <Accordion.Item value="first" disabled>
                <Accordion.ItemTrigger>Title 1</Accordion.ItemTrigger>
                <Accordion.ItemContent pb={4} animation="none">
                  <Accordion.ItemBody>Content 1</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
              <Accordion.Item value="second">
                <Accordion.ItemTrigger>Title 2</Accordion.ItemTrigger>
                <Accordion.ItemContent animation="none">
                  <Accordion.ItemBody>Content 2</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra components", async () => {
      const input = `
function App() {
  return <Accordion>Content</Accordion>
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return <Accordion>Content</Accordion>
        }
        "
      `)
    })

    it("should handle empty accordion", async () => {
      const input = `
import { Accordion } from '@chakra-ui/react'

function App() {
  return <Accordion />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return <Accordion.Root />
        }
        "
      `)
    })

    it("should preserve other props", async () => {
      const input = `
import { Accordion, AccordionItem } from '@chakra-ui/react'

function App() {
  return (
    <Accordion className="my-accordion" id="accordion-1">
      <AccordionItem disabled>Content</AccordionItem>
    </Accordion>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Accordion } from '@chakra-ui/react'

        function App() {
          return (
            <Accordion.Root className="my-accordion" id="accordion-1">
              <Accordion.Item disabled value="item-0">
                Content
              </Accordion.Item>
            </Accordion.Root>
          )
        }
        "
      `)
    })
  })
})
