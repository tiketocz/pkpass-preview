## Linked Jira

<!-- e.g. TIK-120 / TIK-121 / ... — required. PR title should start with the key. -->

TIK-

## Scope (this PR)

<!-- Bullet list of what changes; keep it tight. Out-of-scope items go to a follow-up PR or its own ticket. -->

## Verification

- [ ] `bun run lint` clean
- [ ] `bun run typecheck` clean
- [ ] `bun run test` green (and any new tests added for the change)
- [ ] CI pipeline green on this branch

## Frozen API impact

<!-- Required for any PR that touches packages/preview/src/index.ts exports or PKPassPreview props.
     Until v1.0.0 ships, api-snapshot diffs are info-only — see TIK-122. -->

- [ ] No change to public API surface
- [ ] Intentional API change — `tools/api-snapshot.ts` baseline updated in this PR

## Notes for reviewer

<!-- Anything non-obvious: design trade-offs, deferred items, future ticket pointers, screenshots. -->
