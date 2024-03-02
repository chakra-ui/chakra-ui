import { getPropDoc } from '@chakra-ui/props-docs'
import { chakra, Code, Flex, HStack, Stack } from '@chakra-ui/react'
import { InlineCode } from 'components/mdx-components/inline-code'
import * as React from 'react'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'

export type PropsTableProps = {
  /**
   * displayName of the target component
   */
  of: string
  /**
   * prop names to omit
   */
  omit?: string[] | null
  /**
   * Render only given prop names
   * Has precedence over `omit`
   */
  only?: string[] | null
}

const PropsTable = ({
  of,
  omit = ['layerStyle', 'noOfLines', 'textStyle', 'orientation', 'recipe'],
  only,
}: PropsTableProps) => {
  const propList = React.useMemo(
    () => makePropsTable({ of, omit, only }),
    [of, omit, only],
  )

  if (!propList.length) return null

  return (
    <Stack overflowX='auto' spacing='16' my='10'>
      {propList.map((prop) => (
        <chakra.div
          key={prop.name}
          css={{
            width: '100%',
            fontSize: '0.95em',
            borderCollapse: 'collapse',
            '.row': {
              minWidth: 100,
              width: '20%',
              fontSize: '0.9em',
              textAlign: 'start',
              fontWeight: 500,
              padding: '4px 16px 4px 8px',
              whiteSpace: 'nowrap',
              verticalAlign: 'baseline',
            },
            '.cell': {
              padding: '4px 0px 4px 8px',
              width: '100%',
            },
          }}
        >
          <chakra.div css={{ textAlign: 'start', fontSize: '1em' }}>
            <chakra.h3
              css={{
                fontSize: '0.8em',
                paddingBottom: 4,
                marginBottom: 16,
                borderBottomWidth: 1,
              }}
            >
              <HStack>
                <Code colorScheme='purple'>{prop.name}</Code>
                {prop.required && <Code colorScheme='red'>Required</Code>}
              </HStack>
            </chakra.h3>
          </chakra.div>
          <div>
            {prop.description && (
              <Flex>
                <div className='row'>Description</div>
                <div className='cell'>
                  <p>{convertBackticksToInlineCode(prop.description)}</p>
                </div>
              </Flex>
            )}
            <Flex>
              <div className='row'>Type</div>
              <div className='cell'>
                <InlineCode whiteSpace='normal' fontSize='0.8em'>
                  {prop.type}
                </InlineCode>
              </div>
            </Flex>
            {prop.defaultValue && (
              <Flex>
                <div className='row'>Default</div>
                <div className='cell'>
                  <InlineCode whiteSpace='normal' fontSize='0.8em'>
                    {prop.defaultValue}
                  </InlineCode>
                </div>
              </Flex>
            )}
          </div>
        </chakra.div>
      ))}
    </Stack>
  )
}

export default PropsTable

type MakePropsTableOptions = PropsTableProps

// TODO: Remove this when we update props-docs
const customTable: Record<string, any> = {
  Stepper: {
    index: {
      type: 'number',
      required: true,
      description: 'The active step index',
    },
    orientation: {
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'The orientation of the stepper',
    },
    children: {
      type: 'ReactElement[]',
      description: ' The children of the stepper. Must be `Step` components',
    },
  },
  StepStatus: {
    complete: {
      type: 'React.ReactNode | ((props: StepContext) => React.ReactNode)',
      description: 'The element to show when the step is complete',
    },
    incomplete: {
      type: 'React.ReactNode | ((props: StepContext) => React.ReactNode)',
      description: 'The element to show when the step is incomplete',
    },
    active: {
      type: 'React.ReactNode | ((props: StepContext) => React.ReactNode)',
      description: 'The element to show when the step is current',
    },
  },
}

function makePropsTable({ of, omit, only }: MakePropsTableOptions) {
  const props = customTable[of] ?? getPropDoc(of)

  if (!props) return []

  return Object.entries(props)
    .filter(([name]) => {
      if (Array.isArray(only) && !only.includes(name)) {
        return false
      }

      if (Array.isArray(omit) && omit.includes(name)) {
        return false
      }

      return true
    })
    .map(([name, value]: any[]) => ({
      name,
      ...value,
      type: cleanType(value.type),
      defaultValue: cleanDefaultValue(value.defaultValue),
    }))
}

function cleanType(value: any) {
  return typeof value === 'string' ? value.replace(';', '') : value
}

function cleanDefaultValue(value: any) {
  return typeof value === 'boolean' ? value.toString() : value
}
