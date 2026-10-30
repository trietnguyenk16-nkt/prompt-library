---
name: test-validation-maintenance
description: Safely validate Playwright tests, classify failures, debug with evidence and propose targeted stability or maintenance improvements.
user-invocable: true
---

# Test Validation and Maintenance

## Authorization gate

Inspect the exact command, target environment, mutation risk, credentials and cleanup before running. Run only focused local, mock or explicitly authorized non-production checks. A test file being present is not permission to execute it.

## Validation loop

1. Run the smallest relevant command when authorized.
2. Collect exit code, stdout/stderr, test report, trace, screenshot, video and console/network evidence as appropriate.
3. Classify the result as product defect, test defect, locator/timing issue, fixture/data issue, environment/dependency failure, or flaky/unverified.
4. Reproduce narrowly before changing code. Do not hide failures with retries, sleeps or broad timeouts.
5. Make the smallest authorized fix, then rerun the focused check. Preserve evidence of before/after behavior.
6. Report unrun suites, browser/project gaps and residual risk.

## Stability guidance

Prefer deterministic fixtures, explicit readiness signals, web-first assertions, isolated data, stable accessible locators, controlled clocks only when justified, and trace-on-first-retry or equivalent existing diagnostics. Do not weaken assertions or mark tests flaky without evidence.

## Output

Use `Classification`, `Environment`, `Command`, `Observed result`, `Evidence`, `Expected vs actual`, `Files changed`, `Not run`, `Residual risk` and `Next action`. Never claim pass or reproduction without observed evidence.
