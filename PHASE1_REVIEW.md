# Phase 1 implementation and review

**Review date:** 15 November 2026, Asia/Kuala_Lumpur  
**Status:** Phase 1 homepage and demonstration interactions complete; factual/asset placeholders remain explicitly identified.  
**Delivery:** New `binastra-cochrane/` project only. No deployment, publication, production advertising tags or Phase 2 work.

## Completed features

| Requested homepage section | Implementation |
| --- | --- |
| 1. Full-width hero | Official-reference artist impression, original editorial heading, WhatsApp CTA, independent-advisor identification and scroll link |
| 2. Overview | Developer attribution, verified high-level project introduction, connection illustration and representative disclaimer |
| 3. Highlights | Four distinct highlights separating existing destinations, developer design intent and future developments |
| 4. Lifestyle facilities | Large illustrative photograph, lifestyle narrative and request-details CTA; unconfirmed facilities are not asserted |
| 5. Floor-plan selector | Three selectable demonstration studies; drawing, summary, selected state and enquiry context update together |
| 6. Location/connectivity | Four categories, six selectable existing destinations, explanatory panel and corresponding schematic highlight |
| 7. Upcoming developments | Separate Monash future campus, Menara Ethos and Binastra Cochrane 2 entries with verification/status labels |
| 8. Interactive timeline | Three selectable status milestones with announcement source when available; no invented completion sequence |
| 9. Gallery | Six images, four filters and keyboard-operable modal viewer with filtered previous/next navigation |
| 10. Advisor | Premm Enbasegaran, REN62971, Affinity Realty details and monogram portrait placeholder |
| 11. WhatsApp enquiry | Four enquiry topics, contextual prefilled messages, approved advisor number and sticky mobile CTA |
| 12. Footer | Business identity/address, section links, back-to-top link, independent-operation disclaimer and expandable draft privacy notice |

The design consistently uses the requested ivory, charcoal and champagne-gold palette, local Cormorant Garamond headings and local Inter text. Architectural imagery, varied editorial compositions, fine rules and restrained transitions carry through the entire page. Reduced-motion preferences disable animation and smooth scrolling.

## Validation results

Testing used an isolated **Chrome 157** session on macOS. The in-app browser execution tool was unavailable, so the installed Chrome browser was used for local QA. Viewport emulation is not physical-device testing.

Saved visual references: `validation/desktop-preview.png` and `validation/mobile-preview.png`.

| Check | Result |
| --- | --- |
| Browser assertions | **67/67 passed** after corrections; recorded in `validation/browser-results.json` |
| Responsive widths | **360, 390, 768, 1024 and 1440 px**; no document/body horizontal overflow or detected protruding content |
| Navigation | All main menu destinations work; mobile menu opens/closes, closes after navigation and supports Escape/focus return |
| Floor plans | All three selections update drawing, summary, pressed state and enquiry context |
| Location explorer | All four category filters and six destinations update correctly |
| Timeline | All three milestones update; source link disappears for unverified entries |
| Gallery | All filters and six image links work; previous/next and arrow keys respect the active filter; Escape, focus containment and focus restoration checked |
| WhatsApp | All CTA URLs use the approved number and encoded enquiry text; topic selection updates the message. No enquiry was sent. |
| HTML checks | One H1; no duplicate IDs, broken internal anchors, missing referenced local files, detected nesting errors or unclosed elements |
| CSS/SVG checks | Styles rendered at all tested breakpoints; balanced CSS blocks; all four SVG files parsed successfully |
| JavaScript | Node syntax check passed; no captured browser runtime or resource errors |
| Accessibility | axe-core 4.10.3 reported **zero automated violations** for the selected WCAG A/AA, WCAG 2.1 and best-practice checks at desktop/mobile widths after corrections |
| Progressive enhancement | Static navigation, all destination entries, gallery image links and core content remain usable with JavaScript disabled |
| Tracking/privacy | No production tags, third-party page resources, iframes, cookies or browser storage; tracking stays in an in-memory queue |

Automated accessibility checks do not establish complete WCAG conformance. Contrast over image/SVG backgrounds still requires human judgement; image captions and visible labels were visually reviewed. VoiceOver/NVDA and physical touch-device testing remain recommended before release.

### Performance

- No build dependencies, external runtime libraries, webfont requests, map SDKs, autoplay video or production analytics.
- Local Latin WOFF2 fonts, a prioritised responsive hero, reserved image dimensions and lazy-loaded secondary imagery.
- Initial mobile synthetic run: **LCP 1.564 s, FCP 0.500 s, CLS 0.0001**. Resource transfer at capture: approximately **662 KB**, excluding the main HTML document.
- Conditions: 390 × 844 viewport, cold cache, 4× CPU slowdown, 4 Mbps download and 100 ms simulated latency against localhost. See `validation/performance.json`.
- These are a single local estimate, not field Core Web Vitals or a production Lighthouse certification. Hosting and real devices will change the result. The complete local asset collection is approximately 1.6 MB; below-the-fold assets load progressively.

## Issues corrected during Phase 1

- Darkened secondary labels, decorative numbers and text treatments to address automated contrast findings.
- Moved the mobile hero’s scroll link and image attribution clear of the fixed enquiry control, and reserved footer/focus-scroll space for the sticky button.
- Added appropriate landmarks/group semantics for the mobile enquiry and destination controls.
- Ensured hidden filtered entries and absent milestone-source links remain hidden despite component display styles.
- Reduced the main architectural and connection image weights, and supplied a sharper portrait crop for the mobile hero.
- Confirmed modal focus checks after the browser’s native close event settles, and verified actual no-JavaScript navigation separately.

No unresolved failure was found in the tested Phase 1 interaction paths. The content and verification gaps below must be resolved before production release.

## Incomplete features

- Floor plans are demonstration schematics, not approved project plans or an inventory of saleable units.
- Facility and interior imagery is illustrative; the final facility schedule and project-specific visual content are not populated.
- The location explorer is schematic; it does not provide geographic coordinates, route guidance or verified travel times.
- Menara Ethos and Binastra Cochrane 2 have placeholder particulars. Their current status and formal identities need verification.
- The advisor profile uses a monogram in place of a portrait; the property wordmark is original preview typography.
- The privacy notice is a Phase 1 draft describing current behaviour, not a production-approved business policy.
- Production tracking, conversion measurement, publication SEO settings and deployment are deliberately outside this phase.

## Missing assets and information

1. Approved floor-plan images, formal unit types, dimensions, bedroom/bathroom counts and other permitted specifications.
2. Approved development particulars, including any tenure, unit/tower counts, furnishing, access and delivery information the representative wishes to publish. Current prices and availability only if specifically approved for display.
3. Project renders, facility illustrations/schedule, show-unit photography and a suitable brochure, with permission for website use.
4. Advisor headshot, approved Affinity Realty logo/brand files and final confirmation of all business contact particulars.
5. Verified location coordinates/access routes; confirmation of the proposed MyTOWN connection’s delivery and operating arrangements.
6. Primary-source particulars and up-to-date statuses for Menara Ethos and Binastra Cochrane 2; confirmation of the latter’s formal project name and relationship to other Cochrane phases.
7. Business-approved privacy policy and any further required website disclosures.
8. Publication permission for the bundled reference/illustrative images, or approved replacements.

## Recommendations before Phase 2

1. Review and approve the visual direction and Phase 1 interactions locally.
2. Supply the approved plans, facilities, portrait and brand assets so demonstrations can be replaced with verified project content.
3. Confirm future-development facts and access claims using current primary sources. Keep existing amenities separate from proposals and announced developments.
4. Test on physical iPhone/Android devices and Safari/Firefox, with screen-reader checks and a hosted performance baseline when a release environment is approved.
5. Agree the final privacy wording and measurement requirements before installing any GTM container or advertising conversions. A WhatsApp click is not evidence that an enquiry was sent.
6. Keep deployment and Phase 2 implementation pending your separate approval.

No Bangsar Projects file or live website was changed. The initial workspace was empty; every deliverable was created inside the new project subdirectory.
