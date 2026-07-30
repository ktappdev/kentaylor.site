# Task for scout

Run the Impeccable design detector against the portfolio homepage components. This is a mechanical scan ONLY — no design judgment.

Run this exact command and report the FULL output:
```bash
node /Users/kentaylor/.pi/agent/skills/impeccable/scripts/detect.mjs --json src/pages/index.astro src/components/Hero/HeroTitle.tsx src/components/Hero/HeroScene.tsx src/components/Hero/ScrollIndicator.tsx src/components/About/AboutCard.tsx src/components/Projects/ProjectGrid.tsx src/components/Projects/ProjectCard.tsx src/components/Blog/BlogList.tsx src/components/Blog/BlogCard.tsx src/components/UI/Navigation.tsx src/components/UI/Footer.tsx src/layouts/Layout.astro src/styles/global.css 2>&1
```

Report:
1. Exit code
2. Full JSON output
3. Any errors or warnings
4. Total findings count
5. Breakdown by rule name with counts
6. File locations for each finding

---
**Output:**
Write your findings to exactly this path: /Users/kentaylor/developer/kentaylor.site/.pi-subagents/artifacts/outputs/2914a2cf/context.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: attested
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Return concrete findings with file paths and severity when applicable

Required evidence: review-findings, residual-risks

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
`criteriaSatisfied[].status` must be exactly one of: satisfied, not-satisfied, not-applicable.
`commandsRun[].result` must be exactly one of: passed, failed, not-run.
`manualNotes` and `notes` are optional strings; an empty string means no note and does not satisfy `manual-notes` evidence.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```