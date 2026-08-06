---
name: site-ui-auditor
description: Audits web application UI components for button spacing, typography consistency (semibold headings, 16px regular body), and accessibility (a11y) compliance. Use when checking or fixing design systems, button margins/padding/gaps, font weights, and web accessibility.
---

# Site UI & Accessibility Auditor Skill

This skill provides step-by-step instructions for inspecting, verifying, and standardizing UI component styling, typography hierarchy, button layout metrics, and web accessibility across a web project.

## Core Audit Checks

### 1. Button Metrics & Layout
- **Border Radius**: Must strictly adhere to `rounded-[2px]` (2px radius).
- **Horizontal Padding**: Primary/Secondary buttons must have generous padding (e.g. `px-5.5` to `px-6.5`).
- **Internal Icon Gap**: Buttons with icons must use `gap-3` (12px) between text and icon elements.
- **Button Container Gap**: Adjacent action buttons in hero/CTA sections must use `gap-6` (24px) spacing.
- **Shadows**: Disabled (`shadow-none` / `box-shadow: none !important`).

### 2. Typography Rules
- **Font Family**: Exclusive use of `'Inter', sans-serif`.
- **Headings (`h1`, `h2`, `h3`, `h4`)**: All section headings and title text must use `font-semibold` (font weight 600).
- **Body Text (`p`, `span`, body content)**: Body paragraphs must use `text-[16px]` (`text-base`) with `font-normal` (400 weight) and high contrast text color (`text-[#666666]` on light, `text-[#C0C0C6]` on dark).

### 3. Accessibility (a11y) Requirements
- **Semantic HTML5**: Valid document outline (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`).
- **Single `<h1>` per Page**: Heading hierarchy must flow logically (`h1` -> `h2` -> `h3`).
- **Image Alt Attributes**: All `<img>` tags must have descriptive `alt` attributes.
- **Icon / Interactive ARIA Labels**: Non-text buttons and icons must include explicit `aria-label` attributes.
- **Focus Rings**: All interactive elements must have visible `focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:outline-none`.
- **Tap Targets**: Touch/click targets must be at least 36px to 44px in height.
- **Color Contrast**: Text elements must satisfy WCAG AA contrast ratio (>= 4.5:1).
