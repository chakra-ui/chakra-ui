# @chakra-ui/cli

The official CLI for Chakra UI projects: generate theme and recipe typings, add
snippets and Pro blocks, eject theme artifacts into your repo, and browse
component and documentation data from the terminal.

After installation, the binary is **`chakra`** (also available via
`npx @chakra-ui/cli`).

## Commands

| Command     | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `typegen`   | Generate theme and recipe TypeScript types from your theme file       |
| `snippet`   | Add curated composition snippets to your project                      |
| `blocks`    | Add Chakra UI Pro blocks (requires API key)                           |
| `eject`     | Write default theme tokens and recipes into your project              |
| `component` | List components, show props, or show examples (reads public docs API) |
| `theme`     | Print theme categories or full theme JSON (reads public docs API)     |
| `docs`      | Search the documentation (reads public docs API)                      |

Run `chakra --help` or `chakra <command> --help` for options.

---

### Type generation (`typegen`)

Generate TypeScript types for your custom theme (conditions, recipes, prop
types, tokens, system types):

```sh
npx @chakra-ui/cli typegen <path/to/your/theme.ts>
```

You can also pass a resolvable package that exports your theme.

```sh
npx @chakra-ui/cli typegen @your-org/chakra-theme
```

**Options**

| Option              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `--strict`          | Stricter types for recipe variants and sizes              |
| `--outdir <dir>`    | Where to write generated files (see `--help` for default) |
| `--tsconfig <path>` | Tsconfig used to resolve path aliases                     |
| `--watch [path]`    | Rebuild when dependencies change                          |
| `--clean`           | Remove the output directory before generating             |

> If you delete `node_modules`, regenerate typings by running `typegen` again.

**package.json** (optional):

```json
{
  "scripts": {
    "gen:theme-types": "chakra typegen ./src/theme.ts"
  }
}
```

---

### Snippets (`snippet`)

Add community-driven composition snippets to your project:

```sh
npx @chakra-ui/cli snippet add
npx @chakra-ui/cli snippet add provider toaster
npx @chakra-ui/cli snippet list
```

Snippet JSON is loaded from the registry URL below (override for local docs or
mirrors).

---

### Pro blocks (`blocks`)

Add premium blocks from Chakra UI Pro:

```sh
npx @chakra-ui/cli blocks add
npx @chakra-ui/cli blocks add hero
npx @chakra-ui/cli blocks add hero --variant simple
npx @chakra-ui/cli blocks list
npx @chakra-ui/cli blocks list --category marketing
```

**Setup:** set `CHAKRA_UI_PRO_API_KEY` (shell or `.env` in the project root).

**Common options:** `--outdir`, `--force`, `--dry-run`, `--tsx`, `--variant`.

---

### Eject (`eject`)

Export default theme-related files (e.g. global CSS, tokens, recipes) into your
project so you can own them:

```sh
npx @chakra-ui/cli eject
npx @chakra-ui/cli eject --outdir theme
```

---

### Component (`component`)

Uses the public Chakra documentation API (see **Environment**).

```sh
npx @chakra-ui/cli component list
npx @chakra-ui/cli component list --charts
npx @chakra-ui/cli component props button
npx @chakra-ui/cli component example dialog
```

---

### Theme (`theme`)

```sh
npx @chakra-ui/cli theme
npx @chakra-ui/cli theme --json
npx @chakra-ui/cli theme --filter tokens
```

Default output is a summary table; `--json` prints the full payload; `--filter`
prints one category.

---

### Docs search (`docs`)

```sh
npx @chakra-ui/cli docs button
npx @chakra-ui/cli docs theming
```

---

## Environment

The CLI loads `.env` from the current working directory when present.

| Variable                | Purpose                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `REGISTRY_URL`          | Base URL for snippet/composition JSON (default points at the hosted docs registry).                     |
| `CHAKRA_DOCS_URL`       | Base URL for `/api/types`, `/api/theme`, `/api/search`, and examples (default `https://chakra-ui.com`). |
| `HTTPS_PROXY`           | Proxy for outbound HTTP(S) requests.                                                                    |
| `CHAKRA_UI_PRO_API_KEY` | Required for `blocks add` (Pro API).                                                                    |
