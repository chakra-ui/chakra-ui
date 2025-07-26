---
"@chakra-ui/react": minor
---

Add new codeblock component with support for highlight.js and shiki.

```tsx
<CodeBlock.AdapterProvider value={shikiAdapter}>
  <CodeBlock.Root code="console.log('Hello, world!')" language="tsx">
    <CodeBlock.Content>
      <CodeBlock.Code>
        <CodeBlock.CodeText />
      </CodeBlock.Code>
    </CodeBlock.Content>
  </CodeBlock.Root>
</CodeBlock.AdapterProvider>
```
