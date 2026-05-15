# Navigation Shell and Section System

## Overview
A single-page, route-like site shell with sections for Home, About, Projects, Writings, Stack, Hacks, and Setups.

## Goals
- Keep the structure clearer than the reference.
- Make each section visually distinct while consistent.
- Support obvious navigation through header, command palette, and anchored sections.

## Scope / non-goals
**Scope**
- Header nav
- Hero / front page
- Section layouts and anchored navigation
- Crosshair hover treatment on header and buttons

**Non-goals**
- True server-side multi-route content model
- CMS editing

## User flows / UX / design notes
- Header remains visible and active state reflects current section.
- Home section introduces the site and the Ctrl+K prompt.
- Subsequent sections provide clearer editorial blocks than the reference.
- Buttons and nav items have crosshair hover/focus motifs.

## Functional requirements
- Sections: Home, About, Projects, Writings, Stack, Hacks, Setups.
- Clear IDs and navigation mapping.
- Distinct layouts for at least Projects, Writings, Stack, and Setups.
- Crosshair treatment derived from image 3 appears on hover/focus.

## Data model / schema
- Derived from seeded profile/project/skill data plus small static prototype text.

## API contracts
- Existing portfolio API remains unchanged.

## Edge cases / failure modes
- Long text wraps cleanly.
- Mobile nav compresses or becomes horizontally scrollable without overlap.
- Active state still visible in dark/light themes.

## Acceptance criteria
- Navigation is clear and consistent.
- Sections feel distinct but coherent.
- Crosshair motif appears in header / controls.

## Test plan / test cases
- Verify anchor navigation.
- Verify keyboard focus on nav.
- Verify mobile layout and spacing.

## Implementation notes
- Use IntersectionObserver for active section highlighting.
- Use CSS tokens for spacing and color consistency.
- Use uploaded `crosshair-reference.png` as direct decorative asset and hover reference.

## Status / open questions
- Status: planned
- Open question: whether the mobile nav should collapse to a drawer or remain inline.
