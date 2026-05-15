# Loading Sequence

## Overview
A full-screen loading experience that uses the supplied loading cube image as the first impression before transitioning into the main interface.

## Goals
- Display image 2 prominently and elegantly on every viewport.
- Provide a refined fade / scale / vignette motion sequence.
- Finish within 700–1200ms when possible, with graceful continuation if assets lag.

## Scope / non-goals
**Scope**
- Initial loading overlay
- Optional looping micro-motion while assets finish
- Smooth transition into the site shell

**Non-goals**
- Real backend progress tracking
- Heavy 3D runtime scenes

## User flows / UX / design notes
- User lands on site and sees a full-screen, centered loading cube on a bright atmospheric field.
- Image fades in with slight zoom / glow.
- Progress line or pulsing ring suggests progress.
- Overlay dissolves into the main shell with a short brightness fade.

## Functional requirements
- Use `public/prototype-assets/loading-cube.png`.
- Duration configurable in code.
- Show looping micro-animation if app not ready after initial duration.
- Respect reduced motion by using static fade only.

## Data model / schema
- Local component state only: `isLoading`, `isReady`, `progressMode`.

## API contracts
- None.

## Edge cases / failure modes
- Image load failure: show branded text fallback.
- Slow device: keep animation lightweight and GPU-friendly.
- Reduced motion: disable zoom / loop.

## Acceptance criteria
- Loading screen appears on first load.
- Image 2 is centered, scaled well, and transitions smoothly away.
- Loading does not trap users indefinitely.

## Test plan / test cases
- Verify on desktop and mobile widths.
- Verify reduced motion path.
- Verify fallback when image hidden / unavailable.

## Implementation notes
- Use `next/image`.
- Use Framer Motion or CSS transitions with opacity / transform.
- Add subtle vignette and thin progress rail.

## Status / open questions
- Status: planned
- Open question: whether to keep loading screen on every refresh or only initial session.
