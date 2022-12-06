# @chakra-ui/card

## 2.1.2

### Patch Changes

- [`43aba8ac8`](https://github.com/chakra-ui/chakra-ui/commit/43aba8ac88dc729b17ae7474b42f82642fe5a15f)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Refactor style
  context to use `createStylesContext` from `@chakra-ui/system`

## 2.1.1

### Patch Changes

- [`33e039e2e`](https://github.com/chakra-ui/chakra-ui/commit/33e039e2e0f52bfef20eddd13005534812ccb654)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Fix
  `React is not defined` issue when importing `Card` component.

## 2.1.0

### Minor Changes

- [#6947](https://github.com/chakra-ui/chakra-ui/pull/6947)
  [`2a86d6c35`](https://github.com/chakra-ui/chakra-ui/commit/2a86d6c353e88d86b46030a53130a062433f30b2)
  Thanks [@segunadebayo](https://github.com/segunadebayo)! - Added `Card`
  component

  ```jsx live="false"
  export const Basic = () => (
    <Card>
      <CardHeader>
        <Heading size="md"> Customer dashboard</Heading>
      </CardHeader>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
  )
  ```

### Patch Changes

- Updated dependencies
  [[`75eaba929`](https://github.com/chakra-ui/chakra-ui/commit/75eaba9293e2c7d5bd6aed2037df05128f335930)]:
  - @chakra-ui/react-context@2.0.5
