---
name: a11y-wcag-aaa
description: Comprehensive accessibility (a11y) audit and design rules to enforce WCAG 2.1 & 2.2 Level AAA compliance across all web components, pages, typography, interactive elements, color contrast, and layout spacing.
---

# A11Y WCAG AAA Accessibility & Design System Auditor

Use this skill when developing, auditing, or refactoring web application components, layouts, forms, and pages to ensure strict **WCAG 2.1 / 2.2 Level AAA** compliance and cohesive design system spacing and typography.

---

## Core WCAG AAA Audit Checklist

### 1. Color Contrast Ratios (WCAG 1.4.6 & 1.4.11)
- **Normal Text (< 18pt or < 14pt bold)**: Minimum **7:1** contrast ratio against its background.
  - Example on `#FFFFFF` background: `#0F0F11` (19:1), `#4A4A52` (7.2:1), `#5B3FD9` (7.1:1).
  - Avoid using muted grays lighter than `#4A4A52` for text readability.
- **Large Text (≥ 18pt or ≥ 14pt bold)**: Minimum **4.5:1** contrast ratio.
- **Non-Text Elements & Interactive Controls**: Minimum **3:1** contrast for borders, icons, focus rings, and input states.

### 2. Touch & Tap Target Size (WCAG 2.5.5 & 2.5.8)
- **Interactive Controls**: All buttons, links, inputs, checkboxes, and clickable elements MUST have a minimum target area of **44x44 CSS pixels** (`min-h-[44px]` or `min-w-[44px]`).
- **Spacing**: Maintain at least **8px gap** between adjacent touch targets to prevent accidental triggers.

### 3. Keyboard & Focus Visible (WCAG 2.4.7, 2.4.11 & 2.4.13)
- **Focus Rings**: All interactive controls MUST feature a high-contrast, clearly visible focus ring upon keyboard navigation:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2`
- **Tab Order**: Logical DOM ordering matching the visual flow. Do not use `tabIndex` values > 0.
- **Modals & Drawers**: Focus MUST be trapped within open dialogs/sheets and restored to the trigger element on close (`Escape` key dismiss).

### 4. Semantic HTML5 & ARIA Coverage (WCAG 1.3.1 & 4.1.2)
- **Landmarks**: Wrap page regions using `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, and `<footer>`.
- **Heading Hierarchy**: Exactly one `<h1>` per page. Subheadings must follow a logical sequence (`h1` -> `h2` -> `h3`) without skipping levels.
- **Labels**: Every input field MUST have a explicitly associated `<label>` or `aria-label`.
- **Icon-Only Controls**: Buttons with only icons MUST include an `aria-label` or `<span className="sr-only">Label</span>`.
- **State Announcements**: Use `aria-expanded` for collapsibles/dropdowns, `aria-current="page"` for active navigation links, and `role="alert"` for form error messages.

### 5. Unified Spacing & Typography Rhythm
- **Section Spacing**: Maintain consistent vertical rhythm across sections:
  `py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`
- **CTA Button Gaps**: Enforce constant spacing between actions:
  `flex flex-wrap items-center gap-3.5 sm:gap-4`
- **Typography Scale**:
  - `h1`: `text-4xl sm:text-5xl font-extrabold tracking-tight` (36px / 48px)
  - `h2`: `text-2xl sm:text-3xl font-bold tracking-tight` (28px / 32px)
  - `h3`: `text-lg sm:text-xl font-semibold` (18px / 20px)
  - Body: `text-base font-normal leading-relaxed` (16px, 100% readable)

---

## Quick Inspection Commands

To audit contrast and interactive elements across the workspace:
1. Verify button min-heights: Check `h-11` or `min-h-[44px]` in `src/components/ui/button.tsx`.
2. Verify headings: Search for `h1`, `h2`, `h3` hierarchy in `src/pages/`.
3. Check text colors: Ensure `#4A4A52` or darker is used for muted text to pass 7:1 contrast.
