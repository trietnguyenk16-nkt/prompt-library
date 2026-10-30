---
name: test-case-design
description: Convert application observations and user-supplied manual cases into risk-based, traceable and automation-ready test cases.
user-invocable: true
---

# Test Case Design

## Inputs

Use supplied requirements, acceptance criteria, manual cases, repository evidence and exploration observations. Identify source and confidence for each expected behavior.

## Design

Create stable IDs and cover only relevant risks: happy path, validation, boundaries, roles, navigation, state transitions, persistence, error/recovery, accessibility smoke checks and integration behavior. Each case must have preconditions, numbered steps, synthetic data, observable expected results, priority and environment.

When expected behavior is missing, write `TBD — confirm requirement`; never invent status codes, UI copy, permissions or business rules. Distinguish `Specified`, `Observed`, `Assumption` and `Not verified`.

## Automation suitability

Mark a case suitable when the outcome is deterministic, observable, repeatable and safe. Flag cases needing manual judgment, external systems, visual comparison, special data or destructive authorization. Identify stable locator and fixture needs without pretending they already exist.

## Output

Use: `ID | Requirement | Title | Priority | Type | Preconditions | Steps | Test data | Expected result | Role | Environment`, followed by coverage mapping, data/environment needs, automation candidates and gaps. Do not include execution status unless tests actually ran.
