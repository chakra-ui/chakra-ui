# Welcome to React Router with Chakra UI!

A modern, production-ready template for building full-stack React applications
using React Router and Chakra UI with proper Emotion cache SSR support.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering with React Router v7
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎨 Chakra UI with Emotion cache configured for SSR
- 🌓 Dark mode support with next-themes
- 📖 [React Router docs](https://reactrouter.com/)

## Emotion Cache SSR Setup

This example demonstrates how to properly configure Emotion cache for
server-side rendering with React Router v7, addressing
[issue #10450](https://github.com/chakra-ui/chakra-ui/issues/10450).

### Architecture

The Emotion cache setup consists of three main parts:

#### 1. Emotion Cache Utilities (`app/emotion/`)

- **`emotion-cache.ts`** - Creates the base Emotion cache instance
- **`emotion-server.tsx`** - Server-side utilities (note: streaming limitations)
- **`emotion-client.tsx`** - Client-side cache provider and style injection
  hooks

#### 2. Entry Files

- **`app/entry.server.tsx`** - Wraps server rendering with `CacheProvider`
- **`app/entry.client.tsx`** - Wraps client hydration with `ClientCacheProvider`

#### 3. Root Layout

- **`app/root.tsx`** - Uses `withEmotionCache` HOC and includes emotion
  insertion point

### Key Implementation Details

1. **Server Rendering**: The server wraps the React Router `<ServerRouter>` with
   Emotion's `<CacheProvider>` to ensure styles are tracked during SSR.

2. **Client Hydration**: The client uses `<ClientCacheProvider>` to maintain a
   consistent cache across hydration and subsequent client-side navigation.

3. **Emotion Insertion Point**: A `<meta name="emotion-insertion-point">` tag is
   placed in the `<head>` to control where Emotion injects styles.

4. **Style Injection**: The `useInjectStyles` hook ensures server-rendered
   styles are properly transferred to the client-side cache during hydration.

5. **Hydration Warning Fix**: The `<html>` tag includes
   `suppressHydrationWarning` to prevent warnings from next-themes modifying the
   className during client-side rendering.

### Known Limitations

**Emotion + React 18 Streaming SSR**: Emotion doesn't fully support React 18's
`renderToPipeableStream` API yet. This implementation provides a working
solution by:

- Using `CacheProvider` on both server and client
- Relying on client-side style injection during hydration
- Maintaining style consistency through the emotion insertion point

While this doesn't provide optimal critical CSS extraction during streaming, it
prevents hydration mismatches and ensures styles render correctly.

For more information, see:

- [Emotion Discussion #2859](https://github.com/emotion-js/emotion/discussions/2859)
- [Emotion Issue #2800](https://github.com/emotion-js/emotion/issues/2800)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports
Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is
production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Chakra UI](https://chakra-ui.com/) already configured
with proper Emotion cache SSR support. The styling system includes:

- Component library with accessible primitives
- Dark mode support via next-themes
- Emotion-based styling with SSR hydration
- Responsive design utilities

---

Built with ❤️ using React Router.
