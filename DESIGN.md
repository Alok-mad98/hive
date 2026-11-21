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
    backgroundColor: "{colors.paper}"
    textColor: "{colors.primary}"
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

Hive pairs a paper-and-ink composition with amber-and-glass imagery. The landing page introduces the app, points visitors to the source, and states Windows availability.

## Colors

Use ink on paper for titles and muted olive for supporting copy. Ink and muted olive measure 15.90:1 and 6.73:1 against paper, respectively. Amber works for glyphs against ink at 8.88:1 and for decorative marks on paper. The pale rule separates sections without carrying meaning.

## Typography

Use Bricolage Grotesque for editorial headings and Geist for navigation and body text. Reserve IBM Plex Mono for short labels and the release status. Let headlines wrap at narrow widths and keep the Windows and GitHub actions visible.

## Layout

Share a gutter across the header, introduction, release panel, and footer. Pair the introduction with its image on wide screens and stack them on narrow screens. Keep the Windows copy clear of the Ring Tower and its fallback art at both sizes. Use at least 44 px for interactive targets.

## Motion & Micro-interaction

Parallax moves the artwork and registration pattern at different rates. Keep buttons, headers, and core copy steady. Make ASCII Fluid legible as a distinct glyph field. Support ordinary scrolling, fragment links, keyboard navigation, and reduced motion. Keep the static illustration visible when WebGL is unavailable. Check that the final wheel gesture still triggers Stretchy Footer at the bottom.

## Voice & Content Strategy

Keep labels direct. Use “Coming soon” while the fresh Windows release is pending. The main site actions are Windows availability and the GitHub repository.

## Components

- **Header** links to Windows availability and GitHub.
- **Specimen** pairs the amber bee illustration with a scroll-linked registration pattern.
- **ASCII Fluid** shows moving characters against a contrasting surface.
- **Windows panel** combines Shader Gradient, Radiant Lines, and Ring Tower as layers around the release status.
- **Stretchy Footer** stretches past the scroll boundary and returns to its resting position.
- **Snake 404** gives visitors a playable missing-page screen and a link home.
