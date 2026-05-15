# Command Overlay

## Overview
A searchable overlay / palette that opens with Ctrl+K or Cmd+K and provides navigation plus quick actions.

## Goals
- Make the entry interaction feel intentional and premium.
- Ensure keyboard focus lands inside the overlay instantly.
- Support dismissal with Escape and pointer close.

## Scope / non-goals
**Scope**
- Overlay modal
- Search input
- Section / action list
- Keyboard shortcuts and aria-live support

**Non-goals**
- Full fuzzy search engine
- Remote data lookup

## User flows / UX / design notes
- Hero presents the shortcut prompt.
- Pressing shortcut opens a centered overlay with mechanical motion.
- Search filters available sections / quick actions.
- Selecting an item scrolls to section or triggers action.

## Functional requirements
- Shortcut support for Ctrl+K and Cmd+K.
- Focus trap while open.
- Esc closes overlay.
- Search input autofocus.
- Keyboard selection support.

## Data model / schema
- Overlay item list: `id`, `title`, `description`, `shortcut`, `type`, `target`.

## API contracts
- None.

## Edge cases / failure modes
- No search results state.
- Reopening overlay restores usable focus.
- Shortcut should not break browser/system shortcuts unnecessarily.

## Acceptance criteria
- Ctrl+K / Cmd+K opens overlay and moves focus into it.
- Esc closes overlay.
- Overlay is keyboard navigable.

## Test plan / test cases
- Open via keyboard.
- Tab / Enter / Escape behavior.
- Search filtering and empty state.

## Implementation notes
- Use accessible dialog semantics.
- Add `aria-live` announcement for overlay open.

## Status / open questions
- Status: planned
- Open question: whether to surface utility actions beyond navigation in first prototype.
