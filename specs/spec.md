# Prototype Master Spec

## Project overview
Build a polished single-page prototype with route-like sections inspired by the supplied reference, but with clearer hierarchy, more deliberate navigation affordances, and a slightly cyber / tech-forward motion language. The site represents a creative personal site for Nayan Suryavanshi and should feel refined, keyboard-friendly, and presentation-ready.

## Goals
- Deliver a fully working visual prototype with distinct route-like sections: Home, About, Projects, Writings, Stack, Hacks, Setups.
- Add a cinematic loading sequence using `public/prototype-assets/loading-cube.png`.
- Implement a command / discovery overlay triggered by Ctrl+K or Cmd+K.
- Create a crosshair-driven interaction system based on `public/prototype-assets/crosshair-reference.png`.
- Provide a short animation and accessibility spec, README, and static mockups.

## Design direction
- Base layer: refined off-white / dark-charcoal cyber editorial aesthetic.
- Typography: display sans for hero + headings, readable sans for body, mono for controls and technical accents.
- Motion: fast, mechanical, precise; layered fades, short slides, cipher / decipher text reveals, tactile hover states.
- Layout: single-page with route-like anchored sections and clear active navigation.

## Technical stack decisions
- App framework: Next.js App Router + React + TypeScript.
- Styling: Tailwind v4 utilities plus dedicated global CSS tokens.
- Motion: Framer Motion for screen / overlay choreography, custom cipher text animation utility for text.
- Database provider (documented): default / Neon Postgres.
- Navigation architecture: single-page app with route-like sections.

## Architecture rules
- Keep keyboard support first-class: focus traps, focus-visible states, Escape close, Tab order integrity.
- Respect `prefers-reduced-motion` for loading, text, and section transitions.
- Avoid decorative motion that blocks reading.
- Use uploaded assets directly and document their use in the final spec.
- Keep sections visually distinct but within a shared system of color, spacing, and components.

## Feature list
| Feature | Status | Spec |
|---|---|---|
| Loading sequence | planned | specs/loading-sequence/document.md |
| Navigation shell and section system | planned | specs/navigation-shell/document.md |
| Command overlay | planned | specs/command-overlay/document.md |
| Motion and accessibility system | planned | specs/motion-accessibility/document.md |

