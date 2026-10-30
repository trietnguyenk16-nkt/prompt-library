# Playwright MCP Guide

MCP is optional. Use the host's approved Playwright/browser MCP when browser exploration is needed; do not assume a server exists because this guide is present.

## Suggested capabilities

- Navigate to an authorized URL.
- Inspect visible text, roles, labels and links.
- Click, fill, select, press keys and observe UI state.
- Capture sanitized screenshots, traces or structured observations.
- Inspect console/network signals when the host exposes them and the task permits it.

## Host configuration

Configure MCP in the host's supported file, commonly `.vscode/mcp.json`, rather than embedding credentials in this suite. Prefer a locally installed or organization-approved Playwright MCP server. Keep secrets in the host secret store or environment variables.

## Routing rules

Use browser MCP for exploration and evidence collection, then write repository tests through the normal editor tools. Do not use MCP to bypass authentication, access production, submit destructive actions or upload sensitive data. If MCP is unavailable, state `NOT_AVAILABLE` and continue with repository analysis or a manual exploration plan.
