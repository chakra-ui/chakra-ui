import { describe, expect, test } from "vitest"
import transform from "../src/transforms/components/menu"
import { applyTransform } from "./test-utils"

describe("Menu Transform", () => {
  describe("basic component transformations", () => {
    test("transforms Menu → Menu.Root", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuButton → Menu.Trigger + Button", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton as={Button}>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button>Actions</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuButton with as='button' string literal", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton as="button">Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger asChild>
                <button>Actions</button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuList → Portal > Menu.Positioner > Menu.Content", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                    <Menu.Item value="item-1">Create a Copy</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuItem → Menu.Item with value prop", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                    <Menu.Item value="item-1">Create a Copy</Menu.Item>
                    <Menu.Item value="item-2">Mark as Draft</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuGroup → Menu.ItemGroup + Menu.ItemGroupLabel", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Profile</MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Profile</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>Profile</Menu.ItemGroupLabel>
                      <Menu.Item value="item-0">My Account</Menu.Item>
                      <Menu.Item value="item-1">Payments</Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuDivider → Menu.Separator", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuDivider />
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                    <Menu.Separator />
                    <Menu.Item value="item-1">Delete</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("icon handling in MenuButton", () => {
    test("moves rightIcon to Button children", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Menu>
      <MenuButton rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'
        import { ChevronDownIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>
                Actions
                <ChevronDownIcon />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("moves leftIcon to Button children", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Menu>
      <MenuButton leftIcon={<HamburgerIcon />}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'
        import { HamburgerIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>
                <HamburgerIcon />
                Menu
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Profile</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("moves both leftIcon and rightIcon to Button children", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'

export default function App() {
  return (
    <Menu>
      <MenuButton leftIcon={<HamburgerIcon />} rightIcon={<ChevronDownIcon />}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'
        import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>
                <HamburgerIcon />
                Menu
                <ChevronDownIcon />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Profile</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("event handlers", () => {
    test("transforms onClick → onSelect", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem onClick={() => console.log('Download')}>Download</MenuItem>
        <MenuItem onClick={() => console.log('Copy')}>Create a Copy</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item onSelect={() => console.log('Download')} value="item-0">
                      Download
                    </Menu.Item>
                    <Menu.Item onSelect={() => console.log('Copy')} value="item-1">
                      Create a Copy
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("auto-generates value props correctly", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>First</MenuItem>
        <MenuItem>Second</MenuItem>
        <MenuItem>Third</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">First</Menu.Item>
                    <Menu.Item value="item-1">Second</Menu.Item>
                    <Menu.Item value="item-2">Third</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("MenuOptionGroup split", () => {
    test("transforms type='radio' → Menu.RadioItemGroup + Menu.RadioItem", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Sort</MenuButton>
      <MenuList>
        <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Sort</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.RadioItemGroup defaultValue="asc" title="Order">
                      <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
                      <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
                    </Menu.RadioItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms type='checkbox' → Menu.ItemGroup + Menu.CheckboxItem", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Preferences</MenuButton>
      <MenuList>
        <MenuOptionGroup title="Notifications" type="checkbox">
          <MenuItemOption value="email">Email</MenuItemOption>
          <MenuItemOption value="phone">Phone</MenuItemOption>
          <MenuItemOption value="sms">SMS</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Preferences</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup title="Notifications">
                      <Menu.CheckboxItem value="email">Email</Menu.CheckboxItem>
                      <Menu.CheckboxItem value="phone">Phone</Menu.CheckboxItem>
                      <Menu.CheckboxItem value="sms">SMS</Menu.CheckboxItem>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms MenuItemOption children correctly", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Settings</MenuButton>
      <MenuList>
        <MenuOptionGroup type="radio">
          <MenuItemOption value="option1">
            <span>Option 1</span>
          </MenuItemOption>
          <MenuItemOption value="option2">
            <span>Option 2</span>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Settings</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.RadioItemGroup>
                      <Menu.RadioItem value="option1">
                        <span>Option 1</span>
                      </Menu.RadioItem>
                      <Menu.RadioItem value="option2">
                        <span>Option 2</span>
                      </Menu.RadioItem>
                    </Menu.RadioItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("removes type attribute from MenuOptionGroup", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Filter</MenuButton>
      <MenuList>
        <MenuOptionGroup type="radio" defaultValue="all">
          <MenuItemOption value="all">All</MenuItemOption>
          <MenuItemOption value="active">Active</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Filter</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.RadioItemGroup defaultValue="all">
                      <Menu.RadioItem value="all">All</Menu.RadioItem>
                      <Menu.RadioItem value="active">Active</Menu.RadioItem>
                    </Menu.RadioItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("prop transformations", () => {
    test("transforms isLazy → lazyMount + unmountOnExit", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu isLazy>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root lazyMount unmountOnExit>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("groups positioning props into positioning object", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu placement="right-end">
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root
              positioning={{
                placement: 'right-end',
              }}
            >
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("groups multiple positioning props together", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu placement="right-end" gutter={8} offset={[0, 10]} flip={false}>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root
              positioning={{
                placement: 'right-end',
                gutter: 8,
                offset: [0, 10],
                flip: false,
              }}
            >
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("wraps boundary ref in arrow function", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useRef } from 'react'

export default function App() {
  const boundaryRef = useRef()
  return (
    <Menu boundary={boundaryRef.current}>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'
        import { useRef } from 'react'

        export default function App() {
          const boundaryRef = useRef()
          return (
            <Menu.Root
              positioning={{
                boundary: () => boundaryRef.current,
              }}
            >
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("preserves other props like closeOnSelect", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root closeOnSelect={false}>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("Portal handling", () => {
    test("adds Portal import when needed", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("does not duplicate Portal import if already exists", async () => {
      const input = `
import { Menu, MenuButton, MenuList, MenuItem, Portal } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">Download</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("complete examples", () => {
    test("transforms basic menu with all components", async () => {
      const input = `
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton as={Button}>
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Payments</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button>Profile</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>Profile</Menu.ItemGroupLabel>
                      <Menu.Item value="item-0">My Account</Menu.Item>
                      <Menu.Item value="item-1">Payments</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.Separator />
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>Help</Menu.ItemGroupLabel>
                      <Menu.Item value="item-2">Docs</Menu.Item>
                      <Menu.Item value="item-3">FAQ</Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms menu with MenuOptionGroup (radio)", async () => {
      const input = `
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button
} from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton as={Button}>
        Options
      </MenuButton>
      <MenuList>
        <MenuItem>New File</MenuItem>
        <MenuDivider />
        <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
          <MenuItemOption value="asc">Ascending</MenuItemOption>
          <MenuItemOption value="desc">Descending</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button>Options</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="item-0">New File</Menu.Item>
                    <Menu.Separator />
                    <Menu.RadioItemGroup defaultValue="asc" title="Order">
                      <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
                      <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
                    </Menu.RadioItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })

    test("transforms menu with MenuGroup and positioning", async () => {
      const input = `
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button
} from '@chakra-ui/react'

export default function App() {
  return (
    <Menu placement="right-end" gutter={8} isLazy>
      <MenuButton as={Button}>
        Settings
      </MenuButton>
      <MenuList>
        <MenuGroup title="Preferences">
          <MenuItem onClick={() => console.log('Theme')}>Theme</MenuItem>
          <MenuItem onClick={() => console.log('Language')}>Language</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Button, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root
              lazyMount
              unmountOnExit
              positioning={{
                placement: 'right-end',
                gutter: 8,
              }}
            >
              <Menu.Trigger asChild>
                <Button>Settings</Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.ItemGroup>
                      <Menu.ItemGroupLabel>Preferences</Menu.ItemGroupLabel>
                      <Menu.Item onSelect={() => console.log('Theme')} value="item-0">
                        Theme
                      </Menu.Item>
                      <Menu.Item
                        onSelect={() => console.log('Language')}
                        value="item-1"
                      >
                        Language
                      </Menu.Item>
                    </Menu.ItemGroup>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    test("no transformation for non-Chakra Menu", async () => {
      const input = `
import { Menu } from 'some-other-library'

export default function App() {
  return (
    <Menu>
      <Menu.Button>Actions</Menu.Button>
      <Menu.List>
        <Menu.Item>Download</Menu.Item>
      </Menu.List>
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu } from 'some-other-library'

        export default function App() {
          return (
            <Menu>
              <Menu.Button>Actions</Menu.Button>
              <Menu.List>
                <Menu.Item>Download</Menu.Item>
              </Menu.List>
            </Menu>
          )
        }
        "
      `)
    })

    test("handles Menu with alias", async () => {
      const input = `
import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraMenu>
      <MenuButton>Actions</MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
      </MenuList>
    </ChakraMenu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu as ChakraMenu } from '@chakra-ui/react'

        export default function App() {
          return (
            <ChakraMenu>
              <MenuButton>Actions</MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
              </MenuList>
            </ChakraMenu>
          )
        }
        "
      `)
    })

    test("handles empty MenuList", async () => {
      const input = `
import { Menu, MenuButton, MenuList } from '@chakra-ui/react'

export default function App() {
  return (
    <Menu>
      <MenuButton>Actions</MenuButton>
      <MenuList />
    </Menu>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Menu, Portal } from '@chakra-ui/react'

        export default function App() {
          return (
            <Menu.Root>
              <Menu.Trigger>Actions</Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content></Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )
        }
        "
      `)
    })
  })
})
