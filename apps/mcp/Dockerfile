# =============================================================================
# BASE STAGE - Node.js environment setup
# =============================================================================
FROM node:22-slim AS base

# Setup pnpm package manager
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# =============================================================================
# BUILD STAGE - Compile application
# =============================================================================
FROM base AS build

# Copy monorepo configuration and MCP source
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml /app/
COPY apps/mcp /app/apps/mcp/
WORKDIR /app

# Install dependencies and build
RUN pnpm install --frozen-lockfile --filter=@chakra-ui/react-mcp... && \
    pnpm run --filter=@chakra-ui/react-mcp build

# =============================================================================
# RUNTIME STAGE - Production image
# =============================================================================
FROM base AS runtime

# Fork-friendly repository configuration
ARG GITHUB_REPOSITORY="chakra-ui/chakra-ui"

# Setup non-root user for security
RUN groupadd -r mcpuser && useradd -r -g mcpuser mcpuser

# Copy built application from build stage
COPY --from=build /app/apps/mcp/dist /app/dist
COPY --from=build /app/apps/mcp/api /app/api
COPY --from=build /app/apps/mcp/package.json /app/package.json
WORKDIR /app

# Install production dependencies only
RUN pnpm install --prod --no-frozen-lockfile

# Set file permissions and ownership
RUN chmod 755 dist/stdio.js && chown -R mcpuser:mcpuser /app
USER mcpuser

# Runtime configuration
ENV MCP_MODE=stdio

# Container metadata for GHCR
LABEL org.opencontainers.image.source="https://github.com/${GITHUB_REPOSITORY}"
LABEL org.opencontainers.image.description="MCP server providing AI assistants access to Chakra UI components, migration tools, and design system"
LABEL org.opencontainers.image.licenses="MIT"

# Network and health configuration
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD if [ "$MCP_MODE" = "http" ]; then \
        node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"; \
      else \
        exit 0; \
      fi

# Start server in configured mode
CMD ["sh", "-c", "if [ \"$MCP_MODE\" = \"http\" ]; then node api/index.js; else node dist/stdio.js; fi"]
