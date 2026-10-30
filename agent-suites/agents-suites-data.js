window.AGENT_SUITES = {
  "catalog": [
    {
      "id": "playwright-test-agents",
      "name": "Playwright Test Agent",
      "version": "1.0.0",
      "category": "Web testing",
      "summary": "A repository-aware GitHub Copilot agent for exploring web applications, designing test cases, implementing Playwright tests, and maintaining test suites.",
      "suiteFile": "agent-suites/playwright-test-agents/suite.json",
      "agentPath": "agent-suites/playwright-test-agents/agents/playwright-test-agent.agent.md",
      "tags": [
        "Playwright",
        "E2E",
        "exploration",
        "test automation",
        "GitHub Copilot"
      ],
      "capabilities": [
        "Explore applications",
        "Explore repositories",
        "Generate test cases",
        "Implement Playwright tests",
        "Validate and maintain tests"
      ]
    }
  ],
  "suites": {
    "playwright-test-agents": {
      "id": "playwright-test-agents",
      "name": "Playwright Test Agent",
      "version": "1.0.0",
      "description": "A safe, evidence-driven GitHub Copilot agent suite for repository-aware Playwright test automation.",
      "install": {
        "agent": ".github/agents/playwright-test-agent.agent.md",
        "skills": ".github/skills/<skill-name>/SKILL.md",
        "references": ".github/agent-suites/playwright-test-agents/references/",
        "mcp": ".vscode/mcp.json or the host MCP configuration",
        "instructions": ".github/instructions/playwright-test.instructions.md"
      },
      "files": [
        {
          "path": "agents/playwright-test-agent.agent.md",
          "label": "Playwright Test Agent",
          "type": "agent",
          "description": "Primary orchestrator and implementation agent profile."
        },
        {
          "path": "instructions/playwright-test.instructions.md",
          "label": "Playwright Test Instructions",
          "type": "instruction",
          "description": "Repository-aware instructions for stable Playwright test authoring and maintenance."
        },
        {
          "path": "skills/playwright-exploration/SKILL.md",
          "label": "Playwright Exploration Skill",
          "type": "skill",
          "description": "Explore live web applications and capture evidence safely."
        },
        {
          "path": "skills/repository-analysis/SKILL.md",
          "label": "Repository Analysis Skill",
          "type": "skill",
          "description": "Understand project architecture, conventions and existing test assets."
        },
        {
          "path": "skills/test-case-design/SKILL.md",
          "label": "Test Case Design Skill",
          "type": "skill",
          "description": "Turn observations and supplied manual cases into traceable cases."
        },
        {
          "path": "skills/playwright-implementation/SKILL.md",
          "label": "Playwright Implementation Skill",
          "type": "skill",
          "description": "Implement stable Playwright tests inside the existing repository architecture."
        },
        {
          "path": "skills/test-validation-maintenance/SKILL.md",
          "label": "Validation and Maintenance Skill",
          "type": "skill",
          "description": "Run authorized tests, diagnose failures and improve maintainability."
        },
        {
          "path": "tools/README.md",
          "label": "Tools Contract",
          "type": "tools",
          "description": "Tool permissions, safety boundaries and execution policy."
        },
        {
          "path": "mcp/playwright-mcp.md",
          "label": "Playwright MCP Guide",
          "type": "mcp",
          "description": "MCP setup and routing guidance for browser exploration."
        },
        {
          "path": "references/README.md",
          "label": "References",
          "type": "references",
          "description": "Reference model for Playwright, accessibility and test design documentation."
        },
        {
          "path": "prompts/update-agent-files.md",
          "label": "Repository Update Prompt",
          "type": "prompt",
          "description": "Prompt for adapting the suite to a specific repository."
        },
        {
          "path": "README.md",
          "label": "Suite README",
          "type": "readme",
          "description": "Installation, usage, workflow and operating guidance."
        }
      ]
    }
  }
};
