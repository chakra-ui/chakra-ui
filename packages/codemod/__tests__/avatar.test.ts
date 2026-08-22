import { describe, expect, it } from "vitest"
import transform from "../src/transforms/components/avatar"
import { applyTransform } from "./test-utils"

describe("avatar codemod", () => {
  describe("basic transformations", () => {
    it("should transform Avatar to Avatar.Root", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should move name prop to Avatar.Fallback", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar name='Dan Abrahmov' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan Abrahmov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should move src prop to Avatar.Image", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar src='https://bit.ly/dan-abramov' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image src=\"https://bit.ly/dan-abramov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should move name and src to respective components", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan Abrahmov\" />
              <Avatar.Image src=\"https://bit.ly/dan-abramov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should preserve other props on Avatar.Root", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return (
    <Avatar
      size='xs'
      name='Kola Tioluwani'
      src='https://bit.ly/tioluwani-kolawole'
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root size=\"xs\">
              <Avatar.Fallback name=\"Kola Tioluwani\" />
              <Avatar.Image src=\"https://bit.ly/tioluwani-kolawole\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle alt prop on Avatar.Image", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar src='https://bit.ly/dan-abramov' alt='Dan Abrahmov' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image src=\"https://bit.ly/dan-abramov\" alt=\"Dan Abrahmov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle srcSet and sizes props", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return (
    <Avatar
      src='https://bit.ly/dan-abramov'
      srcSet='https://bit.ly/dan-abramov-2x 2x'
      sizes='(max-width: 600px) 100vw'
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image
                src=\"https://bit.ly/dan-abramov\"
                srcSet=\"https://bit.ly/dan-abramov-2x 2x\"
                sizes=\"(max-width: 600px) 100vw\"
              />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle loading, referrerPolicy, and crossOrigin props on Avatar.Image", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return (
    <Avatar
      src='https://bit.ly/dan-abramov'
      loading='lazy'
      referrerPolicy='no-referrer'
      crossOrigin='anonymous'
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image
                src=\"https://bit.ly/dan-abramov\"
                loading=\"lazy\"
                referrerPolicy=\"no-referrer\"
                crossOrigin=\"anonymous\"
              />
            </Avatar.Root>
          )
        }
        "
      `)
    })
  })

  describe("AvatarGroup transformations", () => {
    it("should remove max prop from AvatarGroup", async () => {
      const input = `
import { AvatarGroup, Avatar } from '@chakra-ui/react'

function App() {
  return (
    <AvatarGroup size='md' max={2}>
      <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
      <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
    </AvatarGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { AvatarGroup, Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <AvatarGroup size=\"md\">
              <Avatar.Root>
                <Avatar.Fallback name=\"Ryan Florence\" />
                <Avatar.Image src=\"https://bit.ly/ryan-florence\" />
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback name=\"Segun Adebayo\" />
                <Avatar.Image src=\"https://bit.ly/sage-adebayo\" />
              </Avatar.Root>
            </AvatarGroup>
          )
        }
        "
      `)
    })

    it("should transform multiple Avatars in AvatarGroup", async () => {
      const input = `
import { AvatarGroup, Avatar } from '@chakra-ui/react'

function App() {
  return (
    <AvatarGroup spacing='1rem'>
      <Avatar bg='red.500' />
      <Avatar bg='teal.500' />
    </AvatarGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { AvatarGroup, Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <AvatarGroup spaceX=\"1rem\">
              <Avatar.Root bg=\"red.500\">
                <Avatar.Fallback />
              </Avatar.Root>
              <Avatar.Root bg=\"teal.500\">
                <Avatar.Fallback />
              </Avatar.Root>
            </AvatarGroup>
          )
        }
        "
      `)
    })

    it("should transform spacing to spaceX on AvatarGroup", async () => {
      const input = `
import { AvatarGroup, Avatar } from '@chakra-ui/react'

function App() {
  return (
    <AvatarGroup spacing={4}>
      <Avatar name='Dan' src='https://bit.ly/dan-abramov' />
      <Avatar name='Ryan' src='https://bit.ly/ryan-florence' />
    </AvatarGroup>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { AvatarGroup, Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <AvatarGroup spaceX={4}>
              <Avatar.Root>
                <Avatar.Fallback name=\"Dan\" />
                <Avatar.Image src=\"https://bit.ly/dan-abramov\" />
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback name=\"Ryan\" />
                <Avatar.Image src=\"https://bit.ly/ryan-florence\" />
              </Avatar.Root>
            </AvatarGroup>
          )
        }
        "
      `)
    })
  })

  describe("multiple Avatars", () => {
    it("should transform multiple Avatar components", async () => {
      const input = `
import { Avatar, Stack } from '@chakra-ui/react'

function App() {
  return (
    <Stack direction='row'>
      <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
      <Avatar name='Sasuke Uchiha' src='https://bit.ly/broken-link' />
      <Avatar src='https://bit.ly/broken-link' />
    </Stack>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar, Stack } from '@chakra-ui/react'

        function App() {
          return (
            <Stack direction=\"row\">
              <Avatar.Root>
                <Avatar.Fallback name=\"Oshigaki Kisame\" />
                <Avatar.Image src=\"https://bit.ly/broken-link\" />
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback name=\"Sasuke Uchiha\" />
                <Avatar.Image src=\"https://bit.ly/broken-link\" />
              </Avatar.Root>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image src=\"https://bit.ly/broken-link\" />
              </Avatar.Root>
            </Stack>
          )
        }
        "
      `)
    })
  })

  describe("Avatar with existing children", () => {
    it("should preserve existing children and add new parts", async () => {
      const input = `
import { Avatar, AvatarBadge } from '@chakra-ui/react'

function App() {
  return (
    <Avatar name='Dan'>
      <AvatarBadge boxSize='1.25em' bg='green.500' />
    </Avatar>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar, AvatarBadge } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan\" />
              // TODO [BREAKING]: AvatarBadge removed. Migrate to Float + Circle
              pattern.// See https://chakra-ui.com/docs/components/avatar#badge//
              Original: <AvatarBadge boxSize=\"1.25em\" bg=\"green.500\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should remove AvatarBadge and add TODO comment", async () => {
      const input = `
import { Avatar, AvatarBadge } from '@chakra-ui/react'

function App() {
  return (
    <Avatar>
      <AvatarBadge boxSize='1.25em' bg='green.500' />
    </Avatar>
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar, AvatarBadge } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
              // TODO [BREAKING]: AvatarBadge removed. Migrate to Float + Circle
              pattern.// See https://chakra-ui.com/docs/components/avatar#badge//
              Original: <AvatarBadge boxSize=\"1.25em\" bg=\"green.500\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })
  })

  describe("icon and getInitials props", () => {
    it("should move icon prop to Avatar.Fallback children", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

function App() {
  return <Avatar icon={<AiOutlineUser fontSize='1.5rem' />} bg='red.500' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'
        import { AiOutlineUser } from 'react-icons/ai'

        function App() {
          return (
            <Avatar.Root bg=\"red.500\">
              <Avatar.Fallback>{<AiOutlineUser fontSize=\"1.5rem\" />}</Avatar.Fallback>
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle both name and icon props", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

function App() {
  return <Avatar name='Dan' icon={<AiOutlineUser />} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'
        import { AiOutlineUser } from 'react-icons/ai'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan\">{<AiOutlineUser />}</Avatar.Fallback>
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should add TODO comment for getInitials prop", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  const customInitials = (name) => name.split(' ').map(n => n[0]).join('')
  return <Avatar name='Dan Abrahmov' getInitials={customInitials} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          const customInitials = (name) =>
            name
              .split(' ')
              .map((n) => n[0])
              .join('')
          return (
            <Avatar.Root>
              // TODO: Handle getInitials function manually
              <Avatar.Fallback name=\"Dan Abrahmov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle icon from variable", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App({ userIcon }) {
  return <Avatar icon={userIcon} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App({ userIcon }) {
          return (
            <Avatar.Root>
              <Avatar.Fallback>{userIcon}</Avatar.Fallback>
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should transform iconLabel to aria-label on Avatar.Fallback", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'

function App() {
  return <Avatar icon={<AiOutlineUser />} iconLabel='User Avatar' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'
        import { AiOutlineUser } from 'react-icons/ai'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback aria-label=\"User Avatar\">
                {<AiOutlineUser />}
              </Avatar.Fallback>
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle name and iconLabel together", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar name='Dan Abrahmov' iconLabel='Dan Avatar' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan Abrahmov\" aria-label=\"Dan Avatar\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })
  })

  describe("edge cases", () => {
    it("should not transform non-Chakra Avatar", async () => {
      const input = `
function App() {
  return <Avatar name='Dan' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "function App() {
          return <Avatar name=\"Dan\" />
        }
        "
      `)
    })

    it("should handle Avatar without any props", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should handle Avatar with dynamic props", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App({ user }) {
  return <Avatar name={user.name} src={user.avatar} size='lg' />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App({ user }) {
          return (
            <Avatar.Root size=\"lg\">
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.avatar} />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should preserve spread attributes on Avatar.Root", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App(props) {
  return <Avatar name='Dan' {...props} />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App(props) {
          return (
            <Avatar.Root {...props}>
              <Avatar.Fallback name=\"Dan\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should remove ignoreFallback prop", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar name='Dan' src='https://bit.ly/dan-abramov' ignoreFallback />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan\" />
              <Avatar.Image src=\"https://bit.ly/dan-abramov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should remove showBorder prop", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return <Avatar name='Dan' src='https://bit.ly/dan-abramov' showBorder />
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root>
              <Avatar.Fallback name=\"Dan\" />
              <Avatar.Image src=\"https://bit.ly/dan-abramov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })

    it("should remove both ignoreFallback and showBorder props", async () => {
      const input = `
import { Avatar } from '@chakra-ui/react'

function App() {
  return (
    <Avatar
      name='Dan'
      src='https://bit.ly/dan-abramov'
      ignoreFallback
      showBorder
      size='lg'
    />
  )
}
      `

      const output = await applyTransform(transform, input)
      expect(output).toMatchInlineSnapshot(`
        "import { Avatar } from '@chakra-ui/react'

        function App() {
          return (
            <Avatar.Root size=\"lg\">
              <Avatar.Fallback name=\"Dan\" />
              <Avatar.Image src=\"https://bit.ly/dan-abramov\" />
            </Avatar.Root>
          )
        }
        "
      `)
    })
  })
})
