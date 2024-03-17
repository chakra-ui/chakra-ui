import { Box, Icon, Tabs } from '@chakra-ui/react'
import { FaYarn } from 'react-icons/fa'
import { ImNpm } from 'react-icons/im'
import { SiPnpm } from 'react-icons/si'
import { BunIcon } from './icons/bun'

import CodeBlock from './mdx-components/codeblock/codeblock'

type PackageManagerName = 'npm' | 'yarn' | 'pnpm' | 'bun'

type PackageManager = {
  icon: JSX.Element
  color: string
  name: PackageManagerName
}

const packageManagers: PackageManager[] = [
  {
    name: 'npm',
    icon: <Icon as={ImNpm} color='red.500' />,
    color: 'red.500',
  },
  {
    name: 'yarn',
    icon: <Icon as={FaYarn} fontSize='lg' color='blue.500' />,
    color: 'blue.500',
  },
  {
    name: 'pnpm',
    icon: <Icon as={SiPnpm} color='orange.500' />,
    color: 'orange.500',
  },
  {
    name: 'bun',
    icon: <Icon as={BunIcon} />,
    color: '#cdbfa7',
  },
]

export function PackageManagers(props: {
  command: Partial<Record<PackageManagerName, string>>
}) {
  const { command } = props
  return (
    <Tabs.Root mt='6' mb='10' defaultValue={packageManagers[0].name}>
      <Tabs.List>
        {packageManagers.map(({ name, icon, color }) => {
          if (!command[name]) return null
          return (
            <Tabs.Trigger
              value={name}
              key={name}
              gap='2'
              _selected={{
                color,
                borderBottomWidth: '2px',
                borderBottomColor: color,
              }}
            >
              {icon}
              {name}
            </Tabs.Trigger>
          )
        })}
      </Tabs.List>
      <Tabs.ContentGroup>
        {packageManagers.map(({ name }) => {
          if (!command[name]) return null
          return (
            <Tabs.Content value={name} key={name} p='0' mt='-4'>
              <CodeBlock>
                <Box className='language-bash'>{command[name]}</Box>
              </CodeBlock>
            </Tabs.Content>
          )
        })}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
