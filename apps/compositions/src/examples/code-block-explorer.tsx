"use client"

import {
  Badge,
  CodeBlock,
  HStack,
  Icon,
  IconButton,
  Select,
  createListCollection,
  createShikiAdapter,
  useSelect,
} from "@chakra-ui/react"
import { IoLogoHtml5, IoLogoJavascript, IoLogoPython } from "react-icons/io5"
import type { HighlighterGeneric } from "shiki"

export const CodeBlockExplorer = () => {
  const select = useSelect({
    positioning: { strategy: "fixed" },
    defaultValue: [files[0].value],
    collection,
  })

  const selectedFile = select.selectedItems[0]

  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root
        code={selectedFile.code}
        language={selectedFile.language}
        maxH="400px"
        overflowY="auto"
      >
        <CodeBlock.Header>
          <HStack flex="1">
            <Badge colorPalette="teal" fontWeight="bold">
              DEMO
            </Badge>
            <CodeBlock.Title textStyle="xs">
              {selectedFile.title}
            </CodeBlock.Title>
          </HStack>
          <CodeBlock.Control>
            <LanguageSwitcher value={select} />
            <CodeBlock.CopyTrigger asChild>
              <IconButton variant="ghost" size="2xs">
                <CodeBlock.CopyIndicator />
              </IconButton>
            </CodeBlock.CopyTrigger>
          </CodeBlock.Control>
        </CodeBlock.Header>

        <CodeBlock.Content>
          <CodeBlock.Code display="inline-block">
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>

        <CodeBlock.Footer>
          <CodeBlock.CollapseTrigger display="flex" alignItems="center" gap="2">
            <CodeBlock.CollapseIndicator />
            <CodeBlock.CollapseText />
          </CodeBlock.CollapseTrigger>
        </CodeBlock.Footer>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}

function LanguageSwitcher(props: Select.RootProviderProps) {
  const { value: select } = props
  return (
    <Select.RootProvider size="xs" variant="subtle" {...props}>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText />
          <Select.Indicator />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {select.collection.items.map((item) => (
            <Select.Item item={item} key={item.value}>
              {item.icon}
              <Select.ItemText>{item.value}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.RootProvider>
  )
}

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["python", "typescript", "html"],
      themes: ["github-dark"],
    })
  },
  theme: "github-dark",
})

interface CodeFile {
  value: string
  code: string
  language: string
  title: string
  icon: React.ReactElement
}

const files: CodeFile[] = [
  {
    value: "python",
    code: `
def greet(name):
    """Greet a person by name."""
    message = f"Hello, {name}!"
    print(message)
    return message.upper()

# Main execution
result = greet("World")
print(f"Result: {result}")

# Demonstrate list comprehension
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
doubled = [n * 2 for n in numbers]
print(f"Doubled: {doubled}")

# Fibonacci sequence
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"Fibonacci(10): {fibonacci(10)}")

# Dictionary example
user = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}
print(f"User: {user['name']} from {user['city']}")
`,
    language: "python",
    title: "example.py",
    icon: <Icon as={IoLogoPython} size="xs" color="orange.500" />,
  },
  {
    value: "typescript",
    code: `
interface User {
  name: string;
  age: number;
  city: string;
}

function greet(name: string): string {
  const message = \`Hello, \${name}!\`;
  console.log(message);
  return message.toUpperCase();
}

// Main execution
const result = greet("World");
console.log(\`Result: \${result}\`);

// Array manipulation
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const doubled = numbers.map(n => n * 2);
console.log(\`Doubled: \${doubled}\`);

// Fibonacci sequence
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(\`Fibonacci(10): \${fibonacci(10)}\`);

// Object example
const user: User = {
  name: "Alice",
  age: 30,
  city: "New York"
};
console.log(\`User: \${user.name} from \${user.city}\`);
`,
    language: "typescript",
    title: "example.ts",
    icon: <Icon as={IoLogoJavascript} size="xs" color="blue.500" />,
  },
  {
    value: "html",
    code: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Page</title>
  <style>
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
      font-size: 2rem;
    }
    .button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, World!</h1>
    <p>This is a sample HTML file demonstrating various elements.</p>
    <button class="button" onclick="alert('Clicked!')">Click me</button>

    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>

  <script>
    console.log('Page loaded successfully!');
  </script>
</body>
</html>
`,
    language: "html",
    title: "example.html",
    icon: <Icon as={IoLogoHtml5} size="xs" color="red.500" />,
  },
]

const collection = createListCollection({
  items: files,
  itemToString: (item) => item.value,
  itemToValue: (item) => item.value,
})
