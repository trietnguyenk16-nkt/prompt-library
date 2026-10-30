---
name: playwright-implementation
description: Implement maintainable Playwright tests in the repository's existing architecture using stable locators, fixtures, isolation and evidence-based assertions.
user-invocable: true
---

# Playwright Implementation

## Before editing

Read the test framework configuration, scripts, existing tests, fixtures, page objects, helper conventions and target requirement. Establish file ownership and the smallest implementation scope. Do not edit product code unless explicitly assigned.

## Implementation principles

- Reuse the repository's Playwright version, projects, fixtures, authentication and reporting.
- Prefer accessible roles and names, labels, stable text and configured test IDs. Avoid brittle CSS/XPath and generated class names.
- Use web-first assertions and explicit state assertions. Avoid arbitrary timeouts and sleeps.
- Keep tests independent and deterministic. Reset state through existing fixtures or documented APIs; use synthetic data and cleanup.
- Keep one clear behavior per test. Parameterize only when it improves clarity.
- Isolate environment-dependent values in existing config/env patterns. Never hard-code credentials or tokens.
- Add trace, screenshot or video settings only through existing conventions or a focused configuration change.

## Review before delivery

Check traceability to the manual case, locator stability, fixture ownership, retry implications, test isolation, failure diagnostics, mobile/browser project behavior and no unrelated diff. State what was not executed.

## Output

Return files changed, requirements/cases covered, implementation decisions, exact command if run, observed result, `NOT_RUN` status, assumptions and remaining gaps.
