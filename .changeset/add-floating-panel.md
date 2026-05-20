---
"@chakra-ui/react": minor
---

**[New] FloatingPanel**: Add draggable, resizable floating panel component

```tsx
import { FloatingPanel } from "@chakra-ui/react/floating-panel"
```

```tsx
<FloatingPanel.Root>
  <FloatingPanel.Trigger />
  <FloatingPanel.Positioner>
    <FloatingPanel.Content>
      <FloatingPanel.Header>
        <FloatingPanel.DragTrigger>
          <FloatingPanel.Title />
        </FloatingPanel.DragTrigger>
        <FloatingPanel.Control>
          <FloatingPanel.StageTrigger />
          <FloatingPanel.CloseTrigger />
        </FloatingPanel.Control>
      </FloatingPanel.Header>
      <FloatingPanel.Body />
      <FloatingPanel.ResizeTriggers />
    </FloatingPanel.Content>
  </FloatingPanel.Positioner>
</FloatingPanel.Root>
```
