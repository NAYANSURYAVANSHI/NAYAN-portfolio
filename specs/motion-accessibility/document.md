# Motion and Accessibility System

## Overview
Shared rules for cipher text, page transitions, button microinteractions, and accessibility behavior.

## Goals
- Create a crisp cyber/tech motion system without hurting usability.
- Implement cipher → decipher text for hero and key headings.
- Respect reduced motion automatically.

## Scope / non-goals
**Scope**
- Cipher text engine
- Section reveals and button microinteractions
- Focus styles and keyboard behavior
- Documentation of timings / easings

**Non-goals**
- Heavy particle systems
- Long cinematic sequences

## User flows / UX / design notes
- Hero headline, shortcut prompt, and section headings decode in.
- Buttons get tactile lift + crosshair accent.
- Keyboard users see distinct visible focus rings and corner markers.

## Functional requirements
- Cipher / decipher animation both directions.
- Reduced motion path swaps scramble for direct text fade.
- Visible `:focus-visible` styling on all actionable elements.
- All overlays dismissible and announced accessibly.

## Data model / schema
- Animation config constants only.

## API contracts
- None.

## Edge cases / failure modes
- Very long headings should not produce unreadable scramble duration.
- Reduced motion should fully disable rapid scramble.
- Focus styles must remain visible in light and dark themes.

## Acceptance criteria
- Cipher effect appears on key content reveals.
- Hover/focus states are distinct.
- Keyboard navigation is complete and usable.

## Test plan / test cases
- Reduced motion media query.
- Keyboard-only traversal.
- Overlay focus trap and restore.

## Implementation notes
- Use a custom hook for cipher text to avoid heavy dependencies.
- Favor transform / opacity for performance.
- Document timings and CSS variables in final deliverables.

## Status / open questions
- Status: planned
- Open question: which headings should decode on scroll vs only once on first reveal.
