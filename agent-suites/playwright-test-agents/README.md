# Playwright Test Agent Suite

A complete GitHub Copilot package for repository-aware Playwright testing. The installable package contains one custom agent, five focused skills, and one repository instruction file.

## What it does

The agent can explore authorized web applications, inspect repositories, turn discovered or user-supplied manual cases into traceable test cases, implement Playwright tests in existing project conventions, and validate or maintain those tests with evidence-backed results.

It is deliberately conservative: it does not assume browser access, does not invent product behavior, does not expose secrets, and does not claim a test passed unless the authorized command actually ran and its result was observed.

## Install into GitHub Copilot

Copy the agent file to:

```text
.github/agents/playwright-test-agent.agent.md
```

Copy each skill directory to:

```text
.github/skills/<skill-name>/SKILL.md
```

Copy the Playwright instruction file to:

```text
.github/instructions/playwright-test.instructions.md
```

The repository also contains supporting design notes and optional guidance, but the catalog's individual downloads and ZIP include only the Agent, Skills, and Instructions above.

Supporting files can live in:

```text
.github/agent-suites/playwright-test-agents/
```

Configure an approved Playwright MCP server through the host's supported MCP configuration, commonly `.vscode/mcp.json`. Never commit credentials.

## Recommended usage

1. Invoke `@playwright-test-agent` or select the custom agent in Copilot Chat.
2. Provide the repository scope, feature or URL, environment, role, test data, authorization and desired deliverable.
3. For browser work, provide an authorized non-production URL and explicit stop conditions.
4. For test conversion, paste manual cases or point to the repository file containing them.
5. Ask the agent to inspect the repository before implementation. Review proposed files and commands before allowing edits or execution.
6. Require the final report to list evidence, files changed, commands/results, `NOT_RUN` items and residual risk.

## Suggested prompts

- “Analyze this repository and tell me where Playwright tests, fixtures, page objects and scripts live. Do not edit or run anything.”
- “Explore this staging checkout flow with synthetic data and produce manual test cases. Do not submit an order.”
- “Convert these manual cases into tests using the existing Playwright fixtures. Show the plan before editing.”
- “Run only the focused local test for this file, then classify any failure using the trace and report.”

## Suite contents

- `agents/` — primary Copilot custom agent profile.
- `skills/` — exploration, repository analysis, test design, implementation and validation playbooks.
- `instructions/` — always-on Playwright test authoring and maintenance guidance.
- `tools/`, `mcp/`, `references/`, and `prompts/` — supporting material kept outside the public three-resource download scope.

This suite is a static package. It does not contain a backend, credentials, test data or a guarantee that a particular host has any listed tool or MCP server.
