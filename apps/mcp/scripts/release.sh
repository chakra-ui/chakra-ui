#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

log() {
    echo "[release] $1"
}

# Check for NPM_TOKEN
if [ -z "$NPM_TOKEN" ]; then
    echo "[release] Error: NPM_TOKEN is not defined in your .env file"
    exit 1
fi

# Set NPM authentication using npm config (temporary, only for this session)
log "🔄 Setting NPM authentication"
npm config set //registry.npmjs.org/:_authToken "$NPM_TOKEN"

# Cleanup function to remove the token
cleanup() {
    log "🔄 Cleaning up NPM authentication"
    npm config delete //registry.npmjs.org/:_authToken 2>/dev/null || true
}

# Set up trap to ensure cleanup happens on exit
trap cleanup EXIT

# Forward all command-line arguments to release-it
COMMAND="pnpm release-it $* --config ../release-it.json"
log "🔄 Running: $COMMAND"

if eval "$COMMAND"; then
    log "✅ Release complete"
else
    echo "[release] Error: Release command failed"
    exit 1
fi 
