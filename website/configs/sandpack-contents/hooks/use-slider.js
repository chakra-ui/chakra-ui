module.exports = {
  App: `import { Badge, Box, Button, chakra, Flex, useSlider, Text } from "@chakra-ui/react";
import Actions from "./Actions";
import Instructions from "./Instructions";
type Props = {
    stepByNumber: number;
    stepToNumber: number;
};

export default function App({stepByNumber, stepToNumber}: Props) {
    const {
        state,
        actions,
        getInnerTrackProps,
        getInputProps,
        getMarkerProps,
        getRootProps,
        getThumbProps,
        getTrackProps
    } = useSlider({ min: 0, max: 100, stepByNumber, stepToNumber });

    const { onKeyDown: onThumbKeyDown, ...thumbProps } = getThumbProps();
    
    const markers = []

    for (let i = 1; i <= 3; i++) {
        markers.push(getMarkerProps({ value: i * 25 }))
    }
    
    return (
        <Box px={8} pt='15%'>
            <Flex flexDir="row" justifyContent="space-between">
                <Instructions stepByNumber={stepByNumber} />
                <Actions actions={actions} stepToNumber={stepToNumber} />
            </Flex>
            <chakra.div
                mt={2}
                cursor="pointer"
                w={{ base: "96%", lg: "98%" }}
                ml={{ base: "2%", lg: "1%" }}
                {...getRootProps()}
            >
                <input {...getInputProps()} hidden />
                {markers.map((markerProps, index) => {
                    const value = String((index + 1) * 25) + '%';
                    return (
                        <Badge
                            ml='-20px'
                            mt='25px'
                            fontSize='sm'
                            color='#542344'
                            {...markerProps}
                        >
                            {value}
                        </Badge>
                )})}
                <Box h="7px" bgColor="#EBF5EE" borderRadius="full" {...getTrackProps()}>
                    <Box
                        h="7px"
                        bgColor="teal.500"
                        borderRadius="full"
                        {...getInnerTrackProps()}
                    />
                </Box>
                <Box
                    top="1%"
                    boxSize={8}
                    bgColor="white"
                    boxShadow="lg"
                    border="1px solid teal"
                    borderRadius="full"
                    _focusVisible={{
                        outline: "none"
                    }}
                    onKeyDown={(e) => {
                        if (e.code === "ArrowRight") actions.stepUp(stepByNumber);
                        else if (e.code === "ArrowLeft") actions.stepDown(stepByNumber);
                        else onThumbKeyDown(e);
                    }}
                    {...thumbProps}
                >
                    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
                        <Text color="teal">{state.value}</Text>
                    </Flex>
                </Box>
            </chakra.div>
        </Box>
    );
};`,
  Index: `import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <ChakraProvider>
            <App stepByNumber={10} stepToNumber={50}/>
        </ChakraProvider>
    </React.StrictMode>
);`,
  Instructions: `import { Text, Kbd } from "@chakra-ui/react";
type Props = {
    stepByNumber: number;
};

const Instructions = ({ stepByNumber }: Props) => {
    return (
            <Text>
                Use {' '}
                <Kbd>&#8592;</Kbd> or <Kbd>&#8594;</Kbd>
                <Text>to step by {stepByNumber}</Text>
            </Text>
        );
};
export default Instructions;`,
  Actions: `import { Button } from "@chakra-ui/react";
type Props = {
    actions: {
        stepUp(step?: number): void;
        stepDown(step?: number): void;
        reset(): void;
        stepTo(value: number): void;
    };
    stepToNumber: number;
};
    
const Actions = ({ actions, stepToNumber }: Props) => {
    return (
        <>
            <Button
                size="sm"
                colorScheme="teal"
                onClick={() => actions.stepTo(stepToNumber)}
            >
                Step to {stepToNumber}
            </Button>
            <Button size="sm" colorScheme="teal" onClick={() => actions.reset()}>
                Reset to 0
            </Button>
        </>
    );
};
export default Actions;`,
}
