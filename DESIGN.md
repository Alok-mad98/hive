---
version: alpha
name: Hive
description: Design tokens and conventions for the public Hive download site.
colors:
  primary: "#181a17"
  paper: "#f6f4eb"
  accent: "#f1ac16"
  muted: "#52574e"
  rule: "#c5c3b8"
  focus: "#986410"
  button-text: "#fffdf4"
  story-field: "#141510"
  story-text: "#f3ecdd"
  story-copy: "#e6dac4"
  story-label: "#e9b873"
typography:
  display:
    fontFamily: Bricolage Grotesque
  body:
    fontFamily: Geist
    fontWeight: 400
    fontSize: 16px
    lineHeight: 1.5
  label:
    fontFamily: IBM Plex Mono
    fontWeight: 400
    fontSize: 11px
rounded:
  control: 4px
spacing:
  touch-target: 44px
components:
  page:
    backgroundColor: "{colors.story-field}"
    textColor: "{colors.story-text}"
  supporting-copy:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted}"
  primary-link:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.button-text}"
    rounded: "{rounded.control}"
  amber-glyph:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.accent}"
  focus-indicator:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.focus}"
  divider:
    backgroundColor: "{colors.rule}"
---

## Overview

Hive unfolds across five chapters. Amber glyphs flow behind the introduction, parallel execution, shared memory, workflow templates, and Windows availability.

## Colors

Use cream text over the dark background on the landing page. Amber marks the field and chapter labels. The missing page uses the paper and ink tokens. Give running text a continuous dark wash where the glyphs pass beneath it.

## Typography

Use Bricolage Grotesque for editorial headings and Geist for navigation and body text. Reserve IBM Plex Mono for short labels and the release status. Let headlines wrap at narrow widths and keep the Windows and GitHub actions visible.

## Layout

Share a gutter across the header, chapters, and footer. Give each idea room to unfold over roughly a viewport, with an open right side for the glyph field and chapter illustrations. Stack copy and examples on narrow widths. Keep Windows and GitHub accessible from the sticky header.

## Motion & Micro-interaction

Mount one viewport-sized ASCII Fluid canvas for the full journey. The opening introduces the scout and staggers the headline by letter. Scrolling reveals the rest of the headings by letter and paragraphs by word. Reduced motion shows complete text, static portraits, and the static glyph field. Keep fragment links, keyboard navigation, and the footer spring working.

## Voice & Content Strategy

Keep labels direct. Use “Coming soon” while the fresh Windows release is pending. The main site actions are Windows availability and the GitHub repository.

## Components

- **Header** links to Windows availability and GitHub.
- **ASCII Fluid** persists behind every chapter. A procedural glyph field provides a static fallback.
- **Hackathon template** shows a sample set of reusable roles.
- **Scout and crew** use original bee-themed illustrations to introduce Hive and give the example agent roles distinct faces.
- **Windows panel** combines Shader Gradient, Radiant Lines, and a Ring Tower with amber honeycomb bands. The bands spin in place and respond to scroll and drag.
- **Cursor bees** leave short yellow trails as they circle the viewport, then return to the mouse or pen and fade. Touch and reduced-motion browsing skip the effect.
- **Stretchy Footer** stretches past the scroll boundary and returns to its resting position.
- **Snake 404** gives visitors a playable missing-page screen and a link home.
