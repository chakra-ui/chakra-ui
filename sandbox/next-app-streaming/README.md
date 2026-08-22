# next-app-streaming

Repro for streamed Emotion styles under Next.js 16 Cache Components.

```bash
pnpm --filter next-app-streaming dev            # documented setup, no registry
pnpm --filter next-app-streaming dev:registry   # same app with Emotion registry
```

Then open http://localhost:3010/ (one-pass) and http://localhost:3010/stream
(Suspense).

Use a cold server for `/stream`. Emotion’s module cache hides the mismatch after
the first request.
