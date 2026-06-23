# Accessibility Compliance Notes

**Project:** BIO 004 Mid-Term Pulse Check (anonymous student poll)
**Files covered:** `bio004-pulse-poll.html`, `Code.gs`, `apps-script-setup.md`
**Date:** June 22, 2026
**Reviewer:** Dr. Sharilyn Rennie

## 1. WCAG version and target level

WCAG 2.2 AA is the floor. This page meets AA on every criterion below, and reaches AAA contrast (7:1) on all primary text.

| Area | Target met |
|------|------------|
| Color contrast | AAA on body and heading text, AA on small sub-labels |
| Keyboard operation | AA, all controls reachable and operable |
| Names, roles, values | AA, semantic form controls with labels |
| Focus visible | AA, 3px terra-dark outline on every focusable element |
| Reduced motion | Supported, transitions and smooth scroll disabled |

## 2. Color contrast audit

Background tokens: white `#FFFFFF`, off-white `#FAFAF9`, navy-tint `#ECEFF4` (checked-option fill), navy-darkest `#060A18` (footer).

| Text / element | Foreground | Background | Ratio | Result |
|----------------|------------|------------|-------|--------|
| Body, legends, h1 | Navy `#0B1530` | White / off-white | ~18:1 | AAA |
| Eyebrow, subhead, helper italics, "Q#" | Terra-dark `#8B3A2E` | White | 7.66:1 | AAA |
| Terra-dark text | Terra-dark `#8B3A2E` | Off-white `#FAFAF9` | 7.46:1 | AAA |
| Option sub-text (navy 72%) | ~`#4F576A` effective | White | 7.23:1 | AAA |
| Option sub-text on checked fill | ~`#4F576A` effective | Navy-tint `#ECEFF4` | 6.06:1 | AA |
| Submit button label | White | Terra-dark `#8B3A2E` | 7.66:1 | AAA |
| Footer name | White | Navy-darkest `#060A18` | ~19:1 | AAA |
| Footer brand line | Terra `#C2734D` | Navy-darkest `#060A18` | 5.4:1 | AA |
| Focus outline | Terra-dark `#8B3A2E` | adjacent white/off-white | 7.66:1 | AAA (non-text 3:1 floor exceeded) |

No text pair falls below 4.5:1. The two AA (not AAA) values are small secondary labels, which exceed the 4.5:1 normal-text requirement.

## 3. Keyboard navigation flow

Verified tab order: skip link, logo link, then each fieldset top to bottom (radio groups arrow-navigable, checkboxes space-toggle, text inputs and textareas typeable), ending at the Submit button. Radio groups use a single tab stop with arrow keys, per native behavior. The "Something else" text inputs follow their checkbox so a keyboard user reaches them in reading order. No keyboard trap. Submit is reachable and fires on Enter or Space.

## 4. Screen reader testing

Structure verified for semantic exposure:
- One `<h1>`, sequential numbered `<legend>` elements as section labels.
- Each question is a `<fieldset>` with a `<legend>`; radio sets are wrapped in `role="radiogroup"` referencing the helper text via `aria-labelledby`.
- Every input has a programmatic label: visible `<label>` wrappers for options, `aria-label` on the free-text "other" fields and textareas where the visible label is separate.
- The anonymity notice uses `role="note"`; the submit status uses `role="status"` with `aria-live="polite"` so confirmation is announced.
- The decorative logo SVG is `aria-hidden="true"` inside a link that carries its own `aria-label`.

Recommended spot check with VoiceOver (Safari) or NVDA (Firefox) before first publish; markup is standard and expected to read cleanly.

## 5. Brand and platform conformance

- iframe height-sender (postMessage with `id`, ResizeObserver, load and resize listeners) is baked in before `</body>` for Kajabi / GitHub Pages embedding.
- Internal/same-domain logo link uses `target="_top"`.
- Branding tokens, fonts (DM Sans, Plus Jakarta Sans, Lora italic), header logo, and footer match the live Anatomy Loops site (`index.html`) the user supplied. Note: these tokens (navy `#0B1530`, terra-dark `#8B3A2E`) are the live-site values, which run darker than the palettes.md PRIMARY entry; matched deliberately to the uploaded brand file. Flag for reconciliation if palettes.md is the intended source of truth.
- No em dashes in any file. Student-facing byline is "Dr. Sharilyn Rennie" with no credential suffix.

## 6. Student privacy

Load-bearing and satisfied. The page collects no name, email, student ID, or IP address. The Apps Script backend records only a server timestamp plus answer text, and Apps Script does not expose visitor identity to the script. No PII is stored in the HTML, the script, or persistent memory. The responses Sheet must be kept private to the instructor's Google account (link sharing off), as noted in the setup guide.

## 7. Known limitations and remediation plan

1. Fields are not marked `required`. This is intentional: the poll is anonymous and most items are optional, so partial submissions are accepted. No remediation planned.
2. The `no-cors` submit cannot read the server response, so the on-screen confirmation reflects a successful send, not a confirmed write. Mitigation: the instructor verifies a test row appears in the Sheet during setup (step 7 of the setup guide).
3. Live screen-reader pass (VoiceOver/NVDA) is recommended but not yet performed; markup is semantic and standards-based.

## 8. Reviewer

Dr. Sharilyn Rennie
