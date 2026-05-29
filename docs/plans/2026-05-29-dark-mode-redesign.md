# Dark Mode Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Modernize patrickserrano.com with a subtle Monokai Phoenix–inspired dark mode theme using CSS custom properties.

**Architecture:** All color and typography changes live in `css/main.css` via CSS custom properties defined on `:root`. No build system — changes deploy immediately via GitHub Pages on push to main. Both `index.html` and `pages/resume.html` share the same stylesheet.

**Tech Stack:** Vanilla HTML, CSS (custom properties), no JS changes needed.

---

## Color Palette

Inspired by Monokai Phoenix — dark base, warm off-white text, restrained colored accents:

| Token | Value | Use |
|---|---|---|
| `--bg` | `#1e1f28` | Page background |
| `--bg-surface` | `#26273a` | Nav buttons, footer |
| `--bg-surface-hover` | `#2f3047` | Nav button hover |
| `--text-primary` | `#e8e6e3` | Body text |
| `--text-secondary` | `#8b8fa8` | Dates, muted copy |
| `--text-nav` | `#f8f8f2` | Nav button labels |
| `--accent-cyan` | `#78dce8` | Links, active nav |
| `--accent-orange` | `#fc9867` | Name/title, logo pop |
| `--accent-green` | `#a9dc76` | "Present" dates |
| `--border` | `#373850` | `h2` underlines, dividers |

---

## Task 1: Add CSS custom properties + base dark background

**Files:**
- Modify: `css/main.css` — top of file, `:root` block + `html`/`body` rules

**Step 1: Add `:root` token block at top of main.css** (after the boilerplate comment)

```css
:root {
  --bg: #1e1f28;
  --bg-surface: #26273a;
  --bg-surface-hover: #2f3047;
  --text-primary: #e8e6e3;
  --text-secondary: #8b8fa8;
  --text-nav: #f8f8f2;
  --accent-cyan: #78dce8;
  --accent-orange: #fc9867;
  --accent-green: #a9dc76;
  --border: #373850;
}
```

**Step 2: Update `html` rule to use token**

```css
html {
  color: var(--text-primary);
  background-color: var(--bg);
  /* existing font-size, line-height, height unchanged */
}
```

**Step 3: Verify** — open `index.html` in browser. Page should be dark with light text.

**Step 4: Commit**
```bash
git add css/main.css
git commit -m "feat: add Monokai Phoenix color tokens and dark background"
```

---

## Task 2: Update links and body text colors

**Files:**
- Modify: `css/main.css` — `a`, `a:hover` rules

**Step 1: Replace hardcoded grays on links**

```css
a {
  text-decoration: none;
  color: var(--accent-cyan);
}

a:hover {
  color: var(--accent-orange);
}
```

**Step 2: Verify** — links on About and Resume pages should be cyan, hover to orange.

**Step 3: Commit**
```bash
git add css/main.css
git commit -m "feat: update link colors to cyan/orange accents"
```

---

## Task 3: Update navigation buttons

**Files:**
- Modify: `css/main.css` — `nav a`, `nav a:visited`, `nav a:hover` rules

**Step 1: Update nav button styles**

```css
nav a {
  color: var(--text-nav);
  background: var(--bg-surface);
}

nav a:visited {
  color: var(--text-nav);
}

nav a:hover {
  background: var(--bg-surface-hover);
  color: var(--accent-cyan);
  box-shadow: 0 0 0 1px var(--accent-cyan);
}
```

**Step 2: Update `.header-container`** — remove implicit white background:

```css
.header-container {
  background: var(--bg);
}
```

**Step 3: Verify** — nav tabs should be dark surface, hover glows with cyan outline.

**Step 4: Commit**
```bash
git add css/main.css
git commit -m "feat: update nav buttons to dark surface with cyan hover"
```

---

## Task 4: Update h2 borders and dividers

**Files:**
- Modify: `css/main.css` — `h2` rule

**Step 1: Replace hardcoded border color**

```css
h2 {
  border-bottom: 1px solid var(--border);
}
```

**Step 2: Verify** — resume section headers should have a subtle dark-purple divider line.

**Step 3: Commit**
```bash
git add css/main.css
git commit -m "feat: update h2 divider to themed border color"
```

---

## Task 5: Update footer and secondary text

**Files:**
- Modify: `css/main.css` — `.footer-container footer` rule

**Step 1: Update footer colors**

```css
.footer-container footer {
  color: var(--text-secondary);
  background: var(--bg);
  /* padding, font-size, text-align unchanged */
}
```

**Step 2: Update `.date` class** (resume role dates):

```css
.date {
  color: var(--accent-green);
  /* font-style, font-weight, font-size unchanged */
}
```

**Step 3: Verify** — dates on resume should be green, footer text muted.

**Step 4: Commit**
```bash
git add css/main.css
git commit -m "feat: update footer and date colors"
```

---

## Task 6: Name/title accent and profile photo treatment

**Files:**
- Modify: `css/main.css` — `.greeting h1`, `#me`

**Step 1: Add warm accent to the greeting headline**

```css
.greeting h1 {
  color: var(--text-primary);
  /* font-size, font-weight, margin, line-height unchanged */
}
```

(Keep neutral — the page title is large enough that a color accent would be garish. The cyan links provide enough warmth.)

**Step 2: Add a subtle border to the profile photo**

```css
#me {
  border-radius: 4px;
  border: 2px solid var(--border);
  /* max-width, width, height, float, margin unchanged */
}
```

**Step 3: Verify** — photo has a subtle framed look against dark background.

**Step 4: Commit**
```bash
git add css/main.css
git commit -m "feat: add subtle border to profile photo"
```

---

## Task 7: Update `.title` (site name in header)

**Files:**
- Modify: `css/main.css` — `.title`

**Step 1:** The `h1.title` ("Patrick Serrano" in the header) should pop slightly:

```css
.title {
  color: var(--accent-orange);
}
```

**Step 2: Verify** — header name has a warm orange tint, distinct from body text.

**Step 3: Commit**
```bash
git add css/main.css
git commit -m "feat: accent site name in header with orange token"
```

---

## Task 8: Final pass — scan for remaining hardcoded colors

**Step 1:** Search for any remaining hardcoded color values:
```bash
grep -n "#[0-9a-fA-F]\{3,6\}\|color: [a-z]" css/main.css
```

**Step 2:** Replace any remaining `#ccc`, `#343434`, `rgba(0,0,0,...)` etc. with appropriate tokens or neutral dark equivalents.

**Step 3:** Check `::selection` highlight:
```css
::selection {
  background: var(--accent-cyan);
  color: var(--bg);
  text-shadow: none;
}
```

**Step 4: Final commit**
```bash
git add css/main.css
git commit -m "feat: clean up remaining hardcoded colors"
```

---

## Notes

- No changes to HTML structure needed — purely CSS.
- The `studio-nav-link` and `studio-logo` styles will inherit naturally.
- The `resume.html` page shares `main.css` so all changes apply automatically.
- GitHub Pages deploys on push to `main` — live within ~60 seconds of push.
