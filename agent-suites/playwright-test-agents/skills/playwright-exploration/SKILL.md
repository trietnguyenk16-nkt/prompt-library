---
name: playwright-exploration
description: Explore an authorized web application with Playwright or browser tools and produce an evidence-backed map of UI, workflows, navigation, states and business behavior.
user-invocable: true
---

# Playwright Exploration

## Use when

Use this skill when the task requires understanding a live web application before writing tests, or when an existing flow needs evidence for a regression or maintenance decision.

## Procedure

1. Confirm URL, environment, user role, test data, allowed actions and stop conditions.
2. Start at the supplied entry point. Record title, route, major regions, navigation and available actions.
3. Follow one workflow at a time. Capture preconditions, action sequence, visible state changes, URL changes, validation messages, loading/empty/error states and persistence behavior.
4. Check important boundaries: invalid input, required fields, cancel/back/reload, duplicate action, session expiry and responsive/accessibility-relevant interaction when in scope.
5. Inspect network or console evidence only when the tool and authorization permit it. Do not expose sensitive payloads.
6. Convert observations into an application map and candidate manual test cases.

## Evidence rules

Mark each statement `Observed`, `Specified`, `Assumption`, or `Not verified`. A screenshot, trace, URL, sanitized log, or exact reproduction step is evidence; a selector or source-code branch alone is not proof of runtime behavior. Do not claim coverage from a single happy path.

## Safety

Use read-only navigation by default. Do not delete, purchase, send messages, alter customer data, submit external forms, upload sensitive files or access production without explicit authorization and safe isolation. Use synthetic accounts and redact tokens, cookies and personal data.

## Output

Return an application map, workflow inventory, observations, candidate test cases, evidence links/artefacts, unverified areas, residual risk and the next safe exploration step. If browser exploration was unavailable, return `NOT_RUN` and a bounded plan.
