module.exports = {
  App: `import { Badge, Box, chakra, Flex, useRangeSlider } from '@chakra-ui/react'
    import Actions from './Actions'
    import Instructions from './Instructions'
    import Thumb from './Thumb'
    
    type Props = {
      min: number
      max: number
      stepToNumber: number
      stepToIndex: number
      stepByNumber: number
      defaultValue: [number, number]
      'aria-label': [string, string]
    }
    
    export default function App({
      min,
      max,
      stepToNumber,
      stepToIndex,
      stepByNumber,
      defaultValue,
      ...rest
    }: Props) {
      const {
        state,
        actions,
        getInnerTrackProps,
        getInputProps,
        getMarkerProps,
        getRootProps,
        getThumbProps,
        getTrackProps,
      } = useRangeSlider({ min, max, defaultValue, ...rest })
    
      const { onKeyDown: onThumbKeyDownFirstIndex, ...thumbPropsFirstIndex } =
        getThumbProps({
          index: 0,
        })
    
      const { onKeyDown: onThumbKeyDownSecondIndex, ...thumbPropsSecondIndex } =
        getThumbProps({
          index: 1,
        })
    
      const markers = Array.from({ length: 3 }, (_, i) => i + 1).map((i) =>
        getMarkerProps({ value: i * 25 }),
      )
    
      const onKeyDownStepBy = (
        e: React.KeyboardEvent<HTMLDivElement>,
        thumbIndex: number,
      ) => {
        if (e.code === 'ArrowRight') actions.stepUp(thumbIndex, stepByNumber)
        else if (e.code === 'ArrowLeft') actions.stepDown(thumbIndex, stepByNumber)
        else if (thumbIndex === 0 && typeof onThumbKeyDownFirstIndex === 'function')
          onThumbKeyDownFirstIndex(e)
        else if (thumbIndex === 1 && typeof onThumbKeyDownSecondIndex === 'function')
          onThumbKeyDownSecondIndex(e)
      }
    
      return (
        <Box
          px={8}
          pt='15%'
        >
          <Flex
            flexDir='row'
            justifyContent='space-between'
          >
            <Instructions stepByNumber={stepByNumber} />
            <Actions
              actions={actions}
              min={defaultValue[0]}
              max={defaultValue[1]}
              stepToIndex={stepToIndex}
              stepToNumber={stepToNumber}
            />
          </Flex>
          <chakra.div
            mt={2}
            cursor='pointer'
            w={{ base: '96%', lg: '98%' }}
            ml={{ base: '2%', lg: '1%' }}
            {...getRootProps()}
          >
            <input
              {...getInputProps({ index: 0 })}
              hidden
            />
            <input
              {...getInputProps({ index: 1 })}
              hidden
            />
            {markers.map((markerProps, index) => {
              const value = String((index + 1) * 25) + '%'
              return (
                <Badge
                  key={index}
                  ml='-18px'
                  mt='25px'
                  fontSize='sm'
                  color='black'
                  {...markerProps}
                >
                  {value}
                </Badge>
              )
            })}
            <Box
              h='7px'
              bgColor='teal.100'
              borderRadius='full'
              {...getTrackProps()}
            >
              <Box
                h='7px'
                bgColor='teal.500'
                borderRadius='full'
                {...getInnerTrackProps()}
              />
            </Box>
            <Thumb
              value={state.value[0]}
              thumbIndex={0}
              thumbProps={thumbPropsFirstIndex}
              onKeyDownStepBy={onKeyDownStepBy}
              bgColor='teal.500'
            />
            <Thumb
              value={state.value[1]}
              thumbIndex={1}
              thumbProps={thumbPropsSecondIndex}
              onKeyDownStepBy={onKeyDownStepBy}
              bgColor='teal.500'
            />
          </chakra.div>
        </Box>
      )
    }
    `,
  Index: `import { ChakraProvider } from '@chakra-ui/react'
    import * as React from 'react'
    import { createRoot } from 'react-dom/client'
    import App from './App'
    const rootElement = document.getElementById('root')
    const root = createRoot(rootElement!)
    
    root.render(
      <React.StrictMode>
        <ChakraProvider>
          <App
            min={0}
            max={100}
            stepToNumber={85}
            stepToIndex={1}
            stepByNumber={10}
            defaultValue={[25, 75]}
            aria-label={['min', 'max']}
          />
        </ChakraProvider>
      </React.StrictMode>,
    )    
  `,
  Instructions: `import { Box, Text, Kbd } from "@chakra-ui/react";

type Props = {
    stepByNumber: number;
};

const Instructions = ({ stepByNumber }: Props) => {
    return (
        <Box>
            <Text as='div'>
                Use {' '}
                <Kbd>&#8592;</Kbd> or <Kbd>&#8594;</Kbd>
                <Text>to step by {stepByNumber}</Text>
            </Text>
        </Box>
    );
};
export default Instructions;`,
  Actions: `import { Button, Box, Text } from "@chakra-ui/react";
import ThumbIndexIcon from "./ThumbIndexIcon";
import * as React from "react";

type Props = {
    actions: {
        setValueAtIndex(index: number, val: number): void
        setActiveIndex: React.Dispatch<React.SetStateAction<number>>
        stepUp(index: number, step?: number): void
        stepDown(index: number, step?: number): void
        reset(): void
    };
    min: number;
    max: number;
    stepToIndex: number;
    stepToNumber: number;
};

const Actions = ({ actions, min, max, stepToIndex, stepToNumber }: Props) => {
    return (
        <>
            <Box>
                <Button
                    size='sm'
                    colorScheme='teal'
                    onClick={() => actions.setValueAtIndex(stepToIndex, stepToNumber)}
                >
                    Move right thumb to {stepToNumber}%
                </Button>
            </Box>
            <Button size='sm' colorScheme='teal' onClick={() => actions.reset()}>
                Reset
                <Text display={['none', 'inline-block']} ml={[0, '2%']}>
                    to [{min}, {max}]
                </Text>
            </Button>
        </>
    );
};
export default Actions;`,
  ThumbIndexIcon: `import { Flex, Box } from "@chakra-ui/react";

type Props = {
    bgColor: string;
};

const ThumbIndexIcon = ({ bgColor }: Props) => {
    return (
        <Flex justifyContent='center' alignItems='center' mt='5px'>
            in
            <Box
                ml='5%'
                boxSize={8}
                textAlign='center'
                borderRadius='full'
                bgColor={bgColor}
            />
        </Flex>
    );
};
export default ThumbIndexIcon;`,
  Thumb: `import { Flex, Box, Text } from '@chakra-ui/react'
    import * as React from 'react'
    
    type Props = {
      value: number
      thumbIndex: number
      thumbProps: any
      bgColor: string
      onKeyDownStepBy: (
        e: React.KeyboardEvent<HTMLDivElement>,
        thumbIndex: number,
      ) => void
    }
    
    const Thumb = ({
      value,
      bgColor,
      thumbIndex,
      thumbProps,
      onKeyDownStepBy,
    }: Props) => {
      return (
        <Box
          top='1%'
          boxSize={8}
          bgColor={bgColor}
          borderRadius='full'
          _focusVisible={{
            outline: 'none',
          }}
          onKeyDown={(e) => {
            onKeyDownStepBy(e, thumbIndex)
          }}
          {...thumbProps}
        >
          <Flex
            w='100%'
            h='100%'
            alignItems='center'
            justifyContent='center'
          >
            <Text color='white'>{value}</Text>
          </Flex>
        </Box>
      )
    }
    export default Thumb
    `,
}
