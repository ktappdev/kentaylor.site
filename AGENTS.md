# Agent Guidelines for kentaylor.dev

## Tailwind CSS v4 - Important Differences

This project uses **Tailwind CSS v4**, which has significant changes from v3 that commonly trip up LLMs:

### 1. No tailwind.config.js
- Configuration is done entirely in CSS via `@theme` blocks
- Found in: `src/styles/global.css`

### 2. Plugin Import Syntax
```css
/* WRONG (v3 style) */
@import "@tailwindcss/typography";

/* CORRECT (v4 style) */
@plugin "@tailwindcss/typography";
```

### 3. Main Import
```css
/* v4 uses this */
@import "tailwindcss";

/* NOT these (v3 style) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. CSS-First Configuration
All custom colors, fonts, etc. are defined in the `@theme` block in global.css:
```css
@theme {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### 5. No Content Configuration
Tailwind v4 automatically detects content - no `content: []` array needed.

## Project Stack
- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS v4 + custom CSS
- **UI Components**: React + Framer Motion
- **Content**: MDX for blog posts
- **3D**: React Three Fiber (@react-three/fiber)

## Key Files
- `src/styles/global.css` - Tailwind config + global styles
- `src/content/blog/*.mdx` - Blog posts
- `src/layouts/Layout.astro` - Root layout

## Common Mistakes to Avoid
1. Don't create a `tailwind.config.js` file
2. Don't use `@import` for Tailwind plugins - use `@plugin`
3. Custom colors use CSS variables (`--color-*`) not JS config
4. The typography plugin classes work differently in v4
