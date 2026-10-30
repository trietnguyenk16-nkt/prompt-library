# Tools Contract

The agent suite is designed for GitHub Copilot hosts that expose equivalent capabilities. Tool names vary by host; map them without expanding permissions.

## Recommended tools

- `read` / `view`: inspect files, test reports, traces and documentation.
- `search` / `grep` / `glob`: find framework configuration, tests, fixtures, selectors and scripts.
- `edit`: create or update assigned test artefacts only.
- `execute` / `bash`: run focused, authorized local or non-production validation commands.
- `browser`: explore an authorized web application and capture runtime evidence.
- `agent` / `task`: delegate bounded work to named sub-agents when the host confirms availability.

## Permission policy

Read/search should be available by default. Edit and execute must remain scoped to the requested repository and assigned files. Browser access requires an authorized environment. Delegation does not prove that a worker ran; require runtime confirmation and returned evidence.

Never use tools to access production, expose secrets, submit external side effects, mutate remote data, deploy, commit or push unless separately authorized. Do not put credentials in prompts, logs, test code or reports.
