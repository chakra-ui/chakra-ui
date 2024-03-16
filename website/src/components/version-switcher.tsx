import { NativeSelect as Select } from '@chakra-ui/react'
import json from '@chakra-ui/react/package.json'
import { useRouter } from 'next/router'

function VersionSwitcher(props: Select.RootProps) {
  const router = useRouter()

  const currentVerion = `v${json.version}`

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
    <Select.Root marginEnd='0rem' variant='outline' {...props}>
      <Select.Field
        value={currentVersionUrl}
        onChange={(e) => {
          router.push(e.target.value)
        }}
        color='fg.muted'
        fontWeight='semibold'
        aria-label={`Select the Chakra UI Docs version. You're currently viewing the version ${currentVerion} docs`}
      >
        {versions.map(({ label, url }) => (
          <option key={url} value={url}>
            {label}
          </option>
        ))}
      </Select.Field>
      <Select.Indicator />
    </Select.Root>
  )
}

export default VersionSwitcher
