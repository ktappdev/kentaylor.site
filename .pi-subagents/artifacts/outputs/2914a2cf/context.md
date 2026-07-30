# Impeccable Design Detector — Portfolio Homepage Scan

## Execution
- **Command**: `node /Users/kentaylor/.pi/agent/skills/impeccable/scripts/detect.mjs --json <13 files>`
- **Exit code**: 2 (findings present)

## Full JSON Output
```json
[
  {
    "antipattern": "overused-font",
    "name": "Overused font",
    "description": "Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, and Space Grotesk are used on so many sites they no longer feel distinctive. Each new wave of AI-generated UIs converges on the same handful of faces. Choose a face that gives your interface personality.",
    "severity": "warning",
    "category": "slop",
    "file": "/Users/kentaylor/developer/kentaylor.site/src/layouts/Layout.astro",
    "line": 74,
    "snippet": "Google Fonts: inter"
  },
  {
    "antipattern": "gradient-text",
    "name": "Gradient text",
    "description": "Gradient text is decorative rather than meaningful — a common AI tell, especially on headings and metrics. Use solid colors for text.",
    "severity": "warning",
    "category": "slop",
    "file": "/Users/kentaylor/developer/kentaylor.site/src/styles/global.css",
    "line": 109,
    "snippet": "background-clip: text + gradient"
  },
  {
    "antipattern": "codex-grid-background",
    "name": "Decorative grid-line background",
    "description": "A decorative grid or line-field background drawn with hairline linear-gradient layers tiled by a fixed pixel cell is a recurring generated-UI signature. Reserve grid overlays for actual canvas, map, blueprint, or measurement surfaces; elsewhere use product structure or a plain surface.",
    "severity": "advisory",
    "category": "slop",
    "file": "/Users/kentaylor/developer/kentaylor.site/src/styles/global.css",
    "line": 129,
    "snippet": "two-axis grid-line gradient background"
  }
]
```

## Errors / Warnings
No stderr errors. Exit code 2 = detector found issues (expected behavior).

## Summary
- **Total findings**: 3
- **Breakdown by rule**:
  - `overused-font` (warning): 1
  - `gradient-text` (warning): 1
  - `codex-grid-background` (advisory): 1

## File Locations
| # | Rule | Severity | File | Line |
|---|------|----------|------|------|
| 1 | overused-font | warning | `src/layouts/Layout.astro` | 74 |
| 2 | gradient-text | warning | `src/styles/global.css` | 109 |
| 3 | codex-grid-background | advisory | `src/styles/global.css` | 129 |

## Severity Breakdown
- warning: 2
- advisory: 1
- error/critical: 0
