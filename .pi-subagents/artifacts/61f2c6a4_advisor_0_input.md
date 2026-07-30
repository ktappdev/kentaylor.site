# Task for advisor

You are running Assessment A: Design Review for an Impeccable critique. This is a UX heuristic evaluation of a personal portfolio site. You work in isolation — you will NOT see detector output.

## Target
The homepage of kentaylor.dev — a personal portfolio for Ken Taylor, a self-taught software engineer & music producer from Georgetown, Guyana.

## Surface Mode
This is a **Persuade** surface (personal portfolio homepage). The visitor decides whether to explore further, hire, or collaborate. But it also has some **Read** concerns (blog teaser section). Primary mode is Persuade. Heuristics 7 (Flexibility and Efficiency) and 10 (Help and Documentation) may be scored n/a for a Persuade surface.

## Source Code Context

### Project Stack
- Astro 5.x + React + Framer Motion + Three.js (React Three Fiber for hero)
- Tailwind CSS v4

### Design Tokens (from global.css)
```
colors: bg=#0a0a0a, surface=#141414, border=#262626, text=#fafafa, muted=#9a9a9a, accent=#00ff88, accent-dim=#00cc6a
fonts: mono='JetBrains Mono', sans='Inter'
```

### Page Structure (index.astro)
```astro
<Layout jsonLd={buildHomePageSchemas(projects)}>
  <Navigation client:load transition:persist />
  <main id="main-content">
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <div class="absolute inset-0 z-0">
        <HeroScene client:only="react" />  <!-- Three.js 3D scene -->
      </div>
      <div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <HeroTitle client:load />  <!-- Animated letter-by-letter name -->
      </div>
      <ScrollIndicator client:load />
    </section>
    <AboutCard client:visible />
    <ProjectGrid projects={projects} client:visible />
    <BlogList posts={sortedPosts} client:visible />
    <Footer client:visible />
  </main>
</Layout>
```

### Navigation Component
- Fixed top bar with blur backdrop on scroll
- Logo: "/KT" with green accent on slash
- Desktop: horizontal links (About, Projects, Blog, CV, GitHub)
- Mobile: hamburger menu with hamburger-to-X animation, full-width slide-down panel
- Focus trap + Escape key on mobile menu, scroll lock when open, returns focus to hamburger button on close
- Skip-to-main-content link hidden until focused
- Links have hover underline animation (accent color bar sliding in from left)
- Monospace font for all nav text

### Hero Section
- Full viewport height (min-h-screen)
- Background: Three.js 3D scene (HeroScene via React Three Fiber)
- Overlaid grid pattern background
- HeroTitle: "KEN TAYLOR" — each letter animates in with stagger (spring: opacity 0→1, y:100→0, rotateX:-90→0), letter-by-letter with 0.08s stagger + 0.3s delay
- Letters have hover-to-green (accent) transition, cursor:default
- Subtitle: "> Code • Music • Guyana" in monospace, green caret prefix
- Animated horizontal rule below subtitle: gradient from accent to transparent, scaleX from 0 to 1
- ScrollIndicator: bottom center, animated bouncing dot in a pill shape, "SCROLL" label in mono

### AboutCard Component
- Section header: "IDENTITY_VERIFIED" in green mono, then "The Human Behind The Code" with gradient text
- 3D tilt card: perspective tilt follows mouse (rotateX/rotateY based on mouse position within card)
- Card has glassmorphism (bg-surface/80, backdrop-blur-xl)
- Radial gradient glare overlay that follows mouse
- Border glow intensifies on hover with boxShadow
- Card header bar: green pulsing dot, "LUUTECH_INDUSTRIES" label, "ID: KEN-001-GY" right
- Hexagonal image frame with scan line animation, corner accent brackets
- Stats: ROLE, LOCATION, LEVEL, STATUS in label-value rows
- Bio paragraph text
- Footer: "AUTHENTICATED" with animated dots, "CLEARANCE_LEVEL: ADMIN"
- Decorative rings in corners
- Phone: stack vertically, desktop: side-by-side

### ProjectGrid Component
- Section header: "# Projects" (hash in green)
- FREE banner: green-accented info bar "FREE — All projects available to use right now at no cost."
- 3-column grid on desktop
- ProjectCard: 3D tilt card like AboutCard (less aggressive: 10deg max)
- Cards have gradient overlay on hover, image with scale on hover
- "FEATURED" badge for featured projects (green translucent)
- Category label in mono uppercase, title, 2-line description, tech tags (up to 4), "Try it Free" + "Code" buttons
- Featured projects span 2 columns
- Bottom: list of open-source projects (termigram, contexting, gitcomm) as border buttons + "View all on GitHub" solid green button

### BlogList Component
- Section header: "# Blog" with muted description
- BlogCard components in a vertical list (spaced)
- "View All Posts" border button → /blog

### Footer
- Logo "/KT", tagline
- Links: About, Blog, RSS, GitHub, X/Twitter, LinkedIn, YouTube, Email (8 links, mono font, hover to accent)
- Copyright line + "Built with Astro + React + Three.js"

## Your Tasks

### 1. Design Specificity Verdict
Does this site feel authored specifically for Ken Taylor, or could it be any developer portfolio with a different name? Evaluate the overall coherence, structural sameness, category-interchangeable choices, and missed opportunities for product character.

### 2. Heuristic Scoring
Score all applicable Nielsen heuristics 0-4. H7 (Flexibility/Efficiency) and H10 (Help/Documentation) may be scored n/a for this Persuade surface. Be honest — most real interfaces score 20-32.

### 3. Cognitive Load Assessment
Run the 8-item checklist. Count failures.

### 4. Emotional Journey
Evaluate peak-end rule, emotional valleys, reassurance at high-stakes moments. This is a portfolio — the emotional goal is making the visitor feel Ken is credible, skilled, and interesting.

### 5. Deliverables
Return:
- Design specificity verdict (paragraph)
- Heuristic scores table (include n/a rationale)
- Cognitive load assessment (checklist results)
- Emotional journey summary
- 2-3 things working well (specific, with why)
- 3-5 priority issues (P0-P3 severity, what, why, fix)
- Persona red flags for at least 2 personas (choose from: Alex-power user, Jordan-first-timer, Sam-accessibility, Riley-stress-tester, Casey-mobile)
- Minor observations (3-5 quick notes)
- Provocative questions (2-3)

Be direct. Be specific with element names. Don't soften criticism.

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