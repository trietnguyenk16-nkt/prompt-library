---
name: repository-analysis
description: Analyze a repository before Playwright work and document its architecture, conventions, test framework, fixtures, utilities, CI and safe commands.
user-invocable: true
---

# Repository Analysis

## Use when

Use before creating or modifying Playwright tests, fixtures, page objects, configuration, reporters or CI test jobs.

## Inventory

Inspect and cite exact paths for package manifests, lockfiles, Playwright configuration, test scripts, test directories, fixtures, page objects, selectors, API helpers, test data, environment templates, reporters, CI workflows and contribution guidance. Check how tests are named, grouped, tagged, authenticated, parallelized and cleaned up.

## Decision rules

- Reuse an existing runner, version, fixture, helper and directory layout.
- Never infer that Playwright is usable merely because a package is present; inspect configuration and scripts.
- Identify the smallest command that can validate the requested scope.
- Note missing prerequisites, environment variables, browsers, services and test data.
- Do not add dependencies or replace architecture without explicit approval.

## Output

Provide a repository map, current test-stack summary, reusable assets, conventions to follow, candidate files to change, safe commands, assumptions, blockers and coverage gaps. Separate observed configuration from recommendations. Do not run commands unless the task authorizes verification.
