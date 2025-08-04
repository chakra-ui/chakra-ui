FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
# Copy workspace files (using main pnpm-lock.yaml)
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml /app/
COPY apps/mcp /app/apps/mcp/
WORKDIR /app

# Install and build MCP server
RUN pnpm install --frozen-lockfile --filter=@chakra-ui/react-mcp...
RUN pnpm run --filter=@chakra-ui/react-mcp build

FROM base AS runtime
# Create non-root user for security
RUN groupadd -r mcpuser && useradd -r -g mcpuser mcpuser

# Copy built application
COPY --from=build /app/apps/mcp/dist /app/dist
COPY --from=build /app/apps/mcp/api /app/api
COPY --from=build /app/apps/mcp/package.json /app/package.json
WORKDIR /app

# Install production dependencies
RUN pnpm install --prod --no-frozen-lockfile

# Make stdio.js executable and set ownership
RUN chmod 755 dist/stdio.js && chown -R mcpuser:mcpuser /app

# Switch to non-root user
USER mcpuser

# Default to stdio mode (main MCP use case)
ENV MCP_MODE=stdio

# Expose port only for HTTP mode
EXPOSE 3000

# Health check for HTTP mode only
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD if [ "$MCP_MODE" = "http" ]; then \
        node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"; \
      else \
        exit 0; \
      fi

# Run based on mode
CMD ["sh", "-c", "if [ \"$MCP_MODE\" = \"http\" ]; then node api/index.js; else node dist/stdio.js; fi"]
