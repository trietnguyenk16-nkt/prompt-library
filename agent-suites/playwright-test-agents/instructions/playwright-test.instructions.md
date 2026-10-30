---
applyTo: '**/*.{spec,test}.{js,ts,mjs,cjs}'
---

# Playwright Test Instructions

When creating or updating Playwright tests in this repository:

- Inspect the existing Playwright configuration, fixtures, page objects, utilities, scripts and naming conventions before adding files.
- Prefer user-visible locators such as roles, labels, accessible names and stable test IDs. Do not use brittle CSS or XPath selectors when a semantic locator is available.
- Keep tests deterministic. Use isolated synthetic data, explicit setup and cleanup, and avoid depending on test order or shared mutable state.
- Reuse existing fixtures and page objects. Extend them only when the abstraction improves readability across multiple tests.
- Assert observable outcomes and important business rules, not implementation details or arbitrary timing.
- Use Playwright auto-waiting and web-first assertions. Do not add fixed sleeps to hide synchronization problems.
- Preserve the repository's test commands, formatting, linting, TypeScript settings and folder structure.
- When a test fails, inspect the error, trace, screenshot, video and relevant network or console evidence before changing the test.
- Never use real customer data, production destructive actions or committed credentials in tests.
- Report what was explored, what was changed, which commands ran, their results, and any unverified risk.
