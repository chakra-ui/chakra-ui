import { Select, SelectProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import packageJSON from 'package.json'

function VersionSwitcher(props: SelectProps) {
  const router = useRouter()

  const currentVerion = `v${packageJSON.dependencies['@chakra-ui/react']}`

  const versions = [
    {
      label: currentVerion,
      url: 'https://chakra-ui.com',
    },
    { label: 'v1.8.8', url: 'https://v1.chakra-ui.com' },
    { label: 'v0.8.x', url: 'https://v0.chakra-ui.com' },
  ]

  const currentVersionUrl = versions[0].url

  return (
    <Select
      marginEnd='0rem'
      variant='outline'
      fontWeight='semibold'
      color='gray.600'
      _dark={{ color: 'whiteAlpha.600' }}
      background='chakra-body-bg'
      sx={{ '--select-bg': 'colors.chakra-body-bg' }}
      value={currentVersionUrl}
      aria-label={`Select the Chakra UI Docs version. You're currently viewing the version ${currentVerion} docs`}
      onChange={(e) => {
        router.push(e.target.value)
      }}
      {...props}
    >
      {versions.map(({ label, url }) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default VersionSwitcher
