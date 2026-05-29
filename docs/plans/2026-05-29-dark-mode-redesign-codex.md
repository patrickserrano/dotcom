<!-- Generated: 2026-05-29 05:34:13 UTC -->

# Dark Mode Redesign Implementation Plan

## Goal

Redesign the static portfolio site around a Monokai Phoenix-inspired dark mode while keeping the implementation simple: one shared stylesheet (`css/main.css`) and small semantic HTML improvements in `index.html` and `pages/resume.html`. The site has no build system, so every recommendation below is written for direct file edits and visual verification in a browser.

Source files reviewed:

- `index.html`
- `pages/resume.html`
- `css/main.css`

Do not start with a full layout rewrite. The current site is compact and content-led; the dark mode should improve contrast, hierarchy, and polish without changing the site structure more than needed.

---

## 1. COLOR TOKENS

Add the token block near the top of `css/main.css`, immediately after the boilerplate comment and before the `html` rule.

Palette direction: Monokai Phoenix-inspired, with a near-black warm base, cooler surfaces, warm text, and restrained cyan/orange/green accents. These values provide enough separation for section dividers, navigation surfaces, footer text, and resume metadata without turning the page into a one-note theme.

```css
:root {
  color-scheme: dark;

  /* Background */
  --color-bg-base: #1e1f28;
  --color-bg-surface: #26273a;
  --color-bg-elevated: #2f3047;

  /* Text */
  --color-text-primary: #f8f8f2;
  --color-text-secondary: #c7c9d1;
  --color-text-muted: #8b8fa8;

  /* Monokai Phoenix accents */
  --color-accent-cyan: #78dce8;
  --color-accent-orange: #fc9867;
  --color-accent-green: #a9dc76;

  /* Borders and separators */
  --color-border: #373850;
  --color-border-strong: #4b4d68;
  --color-separator: rgba(248, 248, 242, 0.14);

  /* Links */
  --color-link: var(--color-accent-cyan);
  --color-link-hover: var(--color-accent-orange);
  --color-link-visited: #ab9df2;

  /* Code, tags, and inline highlights */
  --color-code-bg: #191a21;
  --color-code-text: #ffd866;
  --color-tag-bg: rgba(120, 220, 232, 0.12);
  --color-tag-text: var(--color-accent-cyan);

  /* Interaction */
  --color-selection-bg: rgba(120, 220, 232, 0.28);
  --color-focus-ring: var(--color-accent-cyan);
  --shadow-elevated: 0 14px 40px rgba(0, 0, 0, 0.32);
}
```

Token usage:

| Token | Exact value | Primary use |
| --- | --- | --- |
| `--color-bg-base` | `#1e1f28` | Page background |
| `--color-bg-surface` | `#26273a` | Navigation buttons, subtle panels |
| `--color-bg-elevated` | `#2f3047` | Hover states, elevated callouts |
| `--color-text-primary` | `#f8f8f2` | Main body text and prominent headings |
| `--color-text-secondary` | `#c7c9d1` | Paragraph-adjacent secondary copy |
| `--color-text-muted` | `#8b8fa8` | Footer, dates when not accenting, low-emphasis metadata |
| `--color-accent-cyan` | `#78dce8` | Default links, focus rings |
| `--color-accent-orange` | `#fc9867` | Header name, hover links, warm emphasis |
| `--color-accent-green` | `#a9dc76` | Resume dates or “present/current” metadata |
| `--color-border` | `#373850` | Standard image/card/nav borders |
| `--color-border-strong` | `#4b4d68` | Hover or active borders |
| `--color-separator` | `rgba(248, 248, 242, 0.14)` | Section dividers |
| `--color-link` | `#78dce8` | Default links |
| `--color-link-hover` | `#fc9867` | Hover links |
| `--color-link-visited` | `#ab9df2` | Visited links |
| `--color-code-bg` | `#191a21` | Future `code`, `pre`, or tag backgrounds |
| `--color-code-text` | `#ffd866` | Future inline code or highlighted technical terms |
| `--color-tag-bg` | `rgba(120, 220, 232, 0.12)` | Future tag/chip backgrounds |
| `--color-tag-text` | `#78dce8` | Future tag/chip text |

Optional future rules for code/tag highlights, if inline technical terms are added later:

```css
code,
kbd,
samp {
  background: var(--color-code-bg);
  color: var(--color-code-text);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  padding: 0.1em 0.28em;
}
```

---

## 2. CSS CHANGES

Every value below is taken from `css/main.css` as currently written. The plan keeps existing selectors where possible and adds only small support selectors for dark-mode completeness and accessibility.

### Base Document

Selector: `html`

Current:

```css
html {
  color: #343434;
  font-size: 1em;
  line-height: 1.4;
  height: 100%;
}
```

New:

```css
html {
  color: var(--color-text-primary);
  background: var(--color-bg-base);
  font-size: 1em;
  line-height: 1.5;
  height: 100%;
}
```

Selector: `body`

Current:

```css
body {
  font: 16px/22px "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 100;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
```

New:

```css
body {
  background: var(--color-bg-base);
  color: var(--color-text-primary);
  font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 400;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
```

Selector: `::-moz-selection`

Current:

```css
::-moz-selection {
  background: #b3d4fc;
  text-shadow: none;
}
```

New:

```css
::-moz-selection {
  background: var(--color-selection-bg);
  color: var(--color-text-primary);
  text-shadow: none;
}
```

Selector: `::selection`

Current:

```css
::selection {
  background: #b3d4fc;
  text-shadow: none;
}
```

New:

```css
::selection {
  background: var(--color-selection-bg);
  color: var(--color-text-primary);
  text-shadow: none;
}
```

### Separators and Legacy Utility States

Selector: `hr`

Current:

```css
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
```

New:

```css
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid var(--color-separator);
  margin: 1em 0;
  padding: 0;
}
```

Selector: `.browserupgrade`

Current:

```css
.browserupgrade {
  margin: 0.2em 0;
  background: #ccc;
  color: #000;
  padding: 0.2em 0;
}
```

New:

```css
.browserupgrade {
  margin: 0.2em 0;
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  padding: 0.2em 0;
}
```

### Links

Selector: `a`

Current:

```css
a {
  text-decoration: none;
  color: #6c6c6c;
}
```

New:

```css
a {
  color: var(--color-link);
  text-decoration: underline;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}
```

Selector: `a:hover`

Current:

```css
a:hover {
  color: #C7CDD5;
}
```

New:

```css
a:hover {
  color: var(--color-link-hover);
}
```

Selector: `a:visited`

Current: no global `a:visited` rule exists.

New:

```css
a:visited {
  color: var(--color-link-visited);
}
```

Selector: `a:focus-visible`

Current: no focus-visible rule exists.

New:

```css
a:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
}
```

### Navigation

Selector: `nav a`

Current:

```css
nav a {
  display: block;
  margin-bottom: 10px;
  padding: 15px 0;

  text-align: center;
  text-decoration: none;
  font-weight: bold;

  color: white;
  background: #000;
}
```

New:

```css
nav a {
  display: block;
  margin-bottom: 10px;
  padding: 15px 0;

  text-align: center;
  text-decoration: none;
  font-weight: 700;

  color: var(--color-text-primary);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
}
```

Selector: `nav a:visited`

Current:

```css
nav a:visited {
  color: white;
}
```

New:

```css
nav a:visited {
  color: var(--color-text-primary);
}
```

Selector: `nav a:hover`

Current:

```css
nav a:hover {
  background: #343434;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
```

New:

```css
nav a:hover {
  color: var(--color-accent-cyan);
  background: var(--color-bg-elevated);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-elevated);
}
```

Selector: `nav a:focus-visible`

Current: no focus-visible navigation rule exists.

New:

```css
nav a:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
}
```

Selector: `.studio-nav-link`

Current:

```css
.studio-nav-link {
  display: flex !important;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
```

New:

```css
.studio-nav-link {
  display: flex !important;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
```

No color change is required here; it inherits the improved `nav a` states.

### Containers and Footer

Selector: `.main-container`

Current:

```css
.main-container {
  flex: 1;
}
```

New:

```css
.main-container {
  flex: 1;
  background: var(--color-bg-base);
}
```

Selector: `.footer-container footer`

Current:

```css
.footer-container footer {
  color: #ccc;
  padding: 20px 0;
  text-align: center;
  font-size: 0.8em;
}
```

New:

```css
.footer-container footer {
  color: var(--color-text-muted);
  padding: 20px 0;
  text-align: center;
  font-size: 0.85em;
}
```

Selector: `.studio-link`

Current:

```css
.studio-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
```

New:

```css
.studio-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-link);
}
```

### Headings and Content Hierarchy

Selector: `h1`

Current inside `@media only screen and (min-width: 375px)`:

```css
h1 {
  line-height: 1.1;
}
```

New:

```css
h1 {
  line-height: 1.1;
  letter-spacing: 0;
}
```

Selector: `h2`

Current:

```css
h2 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
```

New:

```css
h2 {
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-separator);
}
```

Selector: `.title`

Current:

```css
.title {
  margin: 10px 0;
}
```

New:

```css
.title {
  color: var(--color-accent-orange);
  margin: 10px 0;
  font-weight: 700;
}
```

Selector: `.greeting h1`

Current:

```css
.greeting h1 {
  font-size: 3em;
  font-weight: 300;
  margin-bottom: .3em;
  line-height: 1;
}
```

New:

```css
.greeting h1 {
  color: var(--color-text-primary);
  font-size: 3em;
  font-weight: 700;
  margin-bottom: .3em;
  line-height: 1;
}
```

Selector: `.heading`

Current:

```css
.heading {
  font-weight: 600
}
```

New:

```css
.heading {
  color: var(--color-text-primary);
  font-weight: 700;
}
```

Selector: `.resume h3`

Current:

```css
.resume h3 {
  margin-bottom: 0;
  font-size: 1.3em
}
```

New:

```css
.resume h3 {
  color: var(--color-text-primary);
  margin-bottom: 0;
  font-size: 1.3em;
}
```

Selector: `.workplace`

Current: class exists in `pages/resume.html`, but no CSS rule exists.

New:

```css
.workplace {
  color: var(--color-accent-orange);
}
```

Selector: `.date`

Current:

```css
.date {
  font-style: italic;
  font-weight: 100;
  font-size: 0.9em;
  margin-top: 0.2%;
}
```

New:

```css
.date {
  color: var(--color-accent-green);
  font-style: italic;
  font-weight: 400;
  font-size: 0.9em;
  margin-top: 0.2%;
}
```

Selector: `.duties`

Current:

```css
.duties {
  /*   font-weight: 600; */
  margin-bottom: 0;
}
```

New:

```css
.duties {
  color: var(--color-text-secondary);
  margin-bottom: 0;
}
```

### Images, Thumbnails, and Project Utility Rules

Selector: `#me`

Current:

```css
#me {
  max-width: 100%;
  width: 200px;
  height: 200px;
  float: left;
  margin: 0 1em 1em 0;
}
```

New:

```css
#me {
  max-width: 100%;
  width: 200px;
  height: 200px;
  float: left;
  margin: 0 1em 1em 0;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  box-shadow: var(--shadow-elevated);
}
```

Selector: `.thumb`

Current:

```css
.thumb {
  position: relative;
  max-width: 32%;
  max-height: 250px;
  margin: 0 1% 0 0;
  float: left;
  border: 2px solid rgba(0, 0, 0, 0.2);
}
```

New:

```css
.thumb {
  position: relative;
  max-width: 32%;
  max-height: 250px;
  margin: 0 1% 0 0;
  float: left;
  border: 2px solid var(--color-border);
}
```

Selector: `.learn`

Current:

```css
.learn {
  display: block;
  padding: 4px 10px;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 5px;
  text-align: center;
}
```

New:

```css
.learn {
  display: block;
  padding: 4px 10px;
  color: var(--color-link);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  text-align: center;
}
```

Selector: `.learn:hover, .learn a:hover`

Current:

```css
.learn:hover,
.learn a:hover {
  background-color: rgba(238, 238, 238, 1);
  color: #6c6c6c;
  ;
}
```

New:

```css
.learn:hover,
.learn a:hover {
  background-color: var(--color-bg-elevated);
  color: var(--color-link-hover);
}
```

### Mobile and Wide Breakpoint Rules

Selector: `nav a` inside `@media only screen and (min-width: 375px)`

Current:

```css
nav a {
  float: none;
  width: auto;
  margin: 0;
  padding: 18px 20px;
  margin-bottom: 0;
  border-radius: 3px;
}
```

New:

```css
nav a {
  float: none;
  width: auto;
  margin: 0;
  padding: 18px 20px;
  margin-bottom: 0;
  border-radius: 3px;
}
```

No color change is required in the breakpoint rule; the base `nav a` colors and border apply.

Selector: `.wrapper` inside `@media only screen and (min-width: 1140px)`

Current:

```css
.wrapper {
  width: 1026px;
  /* 1140px - 10% for margins */
  margin: 0 auto;
}
```

New:

```css
.wrapper {
  width: min(1026px, 90%);
  margin: 0 auto;
}
```

This is not strictly a dark-mode color change, but it prevents wide-layout overflow while preserving the current maximum width.

### Hardcoded Colors That Should Remain Unchanged

These rules are structural resets or non-visual utility declarations and do not need tokenization:

```css
fieldset {
  border: 0;
}

.visuallyhidden {
  border: 0;
}
```

---

## 3. HTML IMPROVEMENTS

The requested redesign can be shipped with CSS only, but these HTML improvements are worth making as a separate implementation pass because they improve browser behavior, semantics, accessibility, and link clarity.

### Shared `<head>` Improvements

Current in both pages:

```html
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Recommended for `index.html`:

```html
<meta name="description" content="Patrick Serrano is a software engineer and creative technologist with experience across engineering, management, design, marketing, and systems work.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#1e1f28">
```

Recommended for `pages/resume.html`:

```html
<meta name="description" content="Resume for Patrick Serrano, including software engineering, management, marketing technology, design, systems administration, and consulting experience.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#1e1f28">
```

Remove the legacy compatibility meta unless old IE support is still a real requirement:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```

The stylesheet already uses modern CSS such as flexbox; the IE-specific comments and `.oldie` support can be considered technical debt.

### Landmark Structure

Current body structure uses generic container `div`s:

```html
<div class="header-container">
  <header class="wrapper clearfix">
    ...
  </header>
</div>

<div class="main-container">
  <div class="main wrapper clearfix">
    ...
  </div>
</div>

<div class="footer-container">
  <footer class="wrapper">
    ...
  </footer>
</div>
```

Recommended structure for `index.html`:

```html
<div class="header-container">
  <header class="wrapper clearfix">
    <h1 class="title">Patrick Serrano</h1>
    <nav aria-label="Primary navigation">
      ...
    </nav>
  </header>
</div>

<main class="main-container">
  <section class="main wrapper clearfix greeting" aria-labelledby="intro-heading">
    <h1 id="intro-heading">Hi, I'm Patrick Serrano.</h1>
    ...
  </section>
</main>

<div class="footer-container">
  <footer class="wrapper">
    ...
  </footer>
</div>
```

Recommended structure for `pages/resume.html`:

```html
<div class="header-container">
  <header class="wrapper clearfix">
    <h1 class="title">Patrick Serrano</h1>
    <nav aria-label="Primary navigation">
      ...
    </nav>
  </header>
</div>

<main class="main-container">
  <article class="main wrapper clearfix resume" aria-labelledby="resume-heading">
    <h1 id="resume-heading">Resume</h1>
    ...
  </article>
</main>
```

If the `greeting` class moves from an inner `<div>` to the `<section>` wrapper, update selectors only if needed. Current `.greeting h1` continues to work either way.

### Current Page Navigation State

Add `aria-current="page"` to the active navigation link.

`index.html`:

```html
<a href="index.html" aria-current="page">About</a>
```

`pages/resume.html`:

```html
<a href="resume.html" aria-current="page">Resume</a>
```

Recommended CSS addition:

```css
nav a[aria-current="page"] {
  color: var(--color-bg-base);
  background: var(--color-accent-cyan);
  border-color: var(--color-accent-cyan);
}
```

### External Link Labels

The Pixel Fox Studio nav link opens in a new tab. Keep `rel="noopener noreferrer"` and add a clearer accessible label:

```html
<a
  href="https://pixelfoxstudio.com"
  target="_blank"
  rel="noopener noreferrer"
  class="studio-nav-link"
  aria-label="Pixel Fox Studio, opens in a new tab"
>
  <img src="img/pixelfox_logo.png" alt="" class="studio-nav-logo">
  Pixel Fox Studio
</a>
```

Use `../img/pixelfox_logo.png` on `pages/resume.html`.

The empty `alt=""` on the nav logo is correct because the adjacent text names the destination. The footer logo currently has `alt="Pixel Fox Studio"` next to visible identical text; change it to `alt=""` to avoid duplicate screen-reader output:

```html
<img src="img/pixelfox_logo.png" alt="" class="studio-logo">
```

### Image and Content Cleanup

Fix the missing quote in the About page image source:

```html
<img src="img/me.jpg" alt="Patrick Serrano" id="me">
```

Fix the typo in the About copy:

```html
between teams and push to achieve the best possible results.
```

On the resume page, replace the invalid numeric id:

Current:

```html
<div class="two-col clearfix" id="5">
```

Recommended:

```html
<section class="two-col clearfix" id="social-media" aria-labelledby="social-media-heading">
  <h2 id="social-media-heading">Social Media</h2>
  ...
</section>
```

### Analytics Script

Both pages load old Google Analytics from:

```html
e.src = '//www.google-analytics.com/analytics.js';
ga('create', 'UA-25221879-1', 'auto'); ga('send', 'pageview');
```

For a redesign pass, decide whether analytics is still needed. If it stays, make the URL explicit:

```html
e.src = 'https://www.google-analytics.com/analytics.js';
```

If analytics is not needed, remove the script entirely. Do not leave protocol-relative third-party URLs in modern static pages.

---

## 4. TYPOGRAPHY IMPROVEMENTS

The current typography uses a very light Helvetica Neue stack:

```css
font: 16px/22px "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
font-weight: 100;
```

This is too thin for a dark background. Increase body weight and line-height before adding decorative styling.

Recommended base:

```css
body {
  font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 400;
}
```

Recommended heading treatment:

```css
.title,
.greeting h1,
.resume h3 {
  letter-spacing: 0;
}

.title {
  font-weight: 700;
}

.greeting h1 {
  font-weight: 700;
}

.resume h3 {
  line-height: 1.25;
}
```

Recommended body copy width and rhythm:

```css
.main p,
.main li {
  line-height: 1.6;
}

.resume li + li {
  margin-top: 0.25em;
}
```

Avoid negative letter-spacing and viewport-based font scaling. The current `.greeting h1` size of `3em` can stay because it gives the About page a strong first impression, but verify it does not crowd the photo on narrow screens.

Resume dates should not use `font-weight: 100` on a dark background. Use:

```css
.date {
  font-weight: 400;
}
```

---

## 5. LOCAL VERIFICATION STEPS

There is no build system. Verify with either direct file access or a simple local server.

### Start Local Preview

Option A, direct file:

```bash
open index.html
open pages/resume.html
```

Option B, local server from the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
http://localhost:8080/pages/resume.html
```

Prefer the local server if checking paths, external links, or browser security behavior.

### Verify Color Tokens

1. Open `index.html`.
2. Confirm the page background is `#1e1f28`, not browser white.
3. Confirm default text appears warm off-white from `--color-text-primary`.
4. Highlight a paragraph with the mouse and confirm the selection background uses the cyan token.
5. Open DevTools and inspect `:root`; confirm every token from the Color Tokens section is present.

### Verify Links

1. On `index.html`, inspect the Discogs link in the final paragraph.
2. Confirm default color is `var(--color-link)` / `#78dce8`.
3. Hover the link and confirm it changes to `var(--color-link-hover)` / `#fc9867`.
4. Visit the link or use DevTools to force `:visited`; confirm visited links use `#ab9df2`.
5. Tab to the link and confirm the focus ring is visible against the dark background.

### Verify Navigation

1. Check mobile width around `320px`.
2. Confirm nav buttons stack cleanly, use `--color-bg-surface`, and keep readable text.
3. Check width above `375px`; confirm the flex nav still fits and the Pixel Fox Studio item does not wrap awkwardly.
4. Check width above `768px`; confirm the floated title/nav layout still works.
5. Hover each nav link and confirm elevated background, cyan text, visible border, and no layout shift.
6. If `aria-current="page"` is implemented, verify the current page nav item has the active cyan background.

### Verify About Page Content

1. Confirm the portrait remains `200px` square and floats left.
2. Confirm the portrait border uses `--color-border` and the shadow does not overpower the page.
3. Confirm the `.greeting h1` remains legible and does not collide with the image on narrow screens.
4. Confirm footer text is muted but readable.
5. Confirm the footer Pixel Fox Studio logo does not create duplicate spoken text if the `alt=""` recommendation is implemented.

### Verify Resume Page Content

1. Open `pages/resume.html`.
2. Confirm every `h2` divider uses the subtle separator, not black-on-dark.
3. Confirm `.resume h3` headings are readable and have enough contrast.
4. Confirm `.workplace` orange accents do not reduce readability in dense resume sections.
5. Confirm `.date` green text is readable and not visually louder than job titles.
6. Confirm lists have enough line-height and spacing for scanning.
7. Check the Social Media section after changing `id="5"` to `id="social-media"`; verify any links and layout still work.

### Verify HTML Improvements

1. Use DevTools Elements panel to confirm each page has a single `<main>`.
2. Confirm nav has `aria-label="Primary navigation"`.
3. Confirm the active nav link has `aria-current="page"`.
4. Confirm external Pixel Fox Studio links still have `target="_blank"` and `rel="noopener noreferrer"`.
5. Confirm `<meta name="color-scheme" content="dark">` and `<meta name="theme-color" content="#1e1f28">` exist on both pages.
6. Run the W3C validator or browser console check for obvious HTML issues after fixing the unquoted image `src` and invalid numeric id.

### Verify Accessibility and Contrast

1. In Chrome or Safari DevTools, inspect the computed contrast for body text, links, nav text, footer text, and resume dates.
2. Confirm body text on `#1e1f28` exceeds WCAG AA contrast.
3. Confirm cyan links on `#1e1f28` exceed WCAG AA contrast.
4. Confirm orange hover links remain readable on the dark base and elevated nav background.
5. Navigate both pages using only the keyboard; every interactive link must show a visible focus ring.

### Final Source Check

Run these from the repository root after implementation:

```bash
rg -n "#[0-9a-fA-F]{3,6}|rgba?\\(|\\bwhite\\b|\\bblack\\b|color:|background|border" css/main.css
```

Expected result: remaining hardcoded color values should be inside `:root`, intentional alpha tokens, reset-only border declarations, or documented exceptions. No old values should remain for visible theme colors:

- `#343434`
- `#b3d4fc`
- `#ccc`
- `#000`
- `#6c6c6c`
- `#C7CDD5`
- `white`
- `rgba(0, 0, 0, 0.1)`
- `rgba(0, 0, 0, 0.2)`
- `rgba(238, 238, 238, 0.5)`
- `rgba(238, 238, 238, 1)`

