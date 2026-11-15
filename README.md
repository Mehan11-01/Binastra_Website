# Binastra Cochrane — Phase 1

A standalone luxury property homepage in HTML5, CSS and vanilla JavaScript. The current design follows the conversion-focused flow of Bangsar Projects: image-led hero, benefits, location, transit, layouts, project briefing, future developments, gallery, advisor and enquiry. Cochrane’s content and branding remain distinct.

## Preview locally

From this project directory:

```sh
cd /Users/mehannair/Desktop/Binastra_Website
python3 -m http.server 8080 --bind 127.0.0.1
```

Visit **http://127.0.0.1:8080/**. Stop the server with `Ctrl+C`. If that port is occupied, use `8081` instead. You can also open `index.html` directly for a basic preview; the local HTTP server is preferred for browser testing.

This serves only this new project on your computer’s loopback interface. It does not publish it. All images and fonts are local, so viewing the page does not require third-party asset requests. External links, including WhatsApp, open only when selected.

## Files

| File or directory | Purpose |
| --- | --- |
| `index.html` | Complete homepage, metadata, accessible content, independent-representative disclaimer, draft privacy notice and gallery dialog |
| `styles.css` | Reference-inspired dark teal, ivory, gold and WhatsApp-green design system, responsive navigation and component layouts |
| `script.js` | Editable data/configuration, selectors, filters, location explorer, timeline, gallery viewer, WhatsApp message generation and local tracking queue |
| `assets/images/` | Optimised project-reference imagery, labelled illustrative photos and three demonstration SVG layout studies |
| `assets/fonts/` | Local Latin WOFF2 fonts and their Open Font License notices |
| `assets/favicon.svg` | Original typographic favicon |
| `assets/SOURCES.md` | Asset provenance, factual references and replacement requirements |
| `PHASE1_REVIEW.md` | Section checklist, test results, unfinished content and recommendations before Phase 2 |
| `validation/` | Recorded browser assertions and local performance measurement |

## Included interactions

- Responsive menu with expanded state, Escape dismissal and section navigation.
- Sticky mobile WhatsApp enquiry button with safe-area spacing.
- Three selectable **demonstration** layout drawings; these are not official unit plans.
- Location category filters, destination details and corresponding schematic highlights.
- Status-based future-development timeline. Unverified dates are omitted.
- Gallery filters and a native modal viewer with previous/next controls, arrow keys, Escape dismissal and focus restoration.
- Topic selector and section-specific WhatsApp enquiries to **Premm, +60 19-899 5496**.
- Working privacy-notice link and readable static content without JavaScript.

## Editing content

The `config` object at the top of `script.js` groups advisor contact details, layout studies, destinations, milestones, enquiry messages and enquiry topics. Static HTML supplies the initial and no-JavaScript content. **Update both the HTML and corresponding configuration when replacing that content**, including the fallback WhatsApp links.

Replace imagery with the same asset paths or update the relevant HTML and configuration. Preserve descriptive `alt` text and correct intrinsic dimensions. Keep artist-impression and placeholder labels until approved replacements exist.

The footer’s business identity and contact details were reused from the supplied Bangsar reference with your approval. The advisor portrait is a typographic placeholder. No experience, awards, testimonials, prices, unit dimensions, room counts or completion promises were invented.

The page deliberately contains `noindex, nofollow` for the local design stage. SEO publication settings are a later release decision.

## Tracking architecture

No GTM container, Google Ads tag, pixel, iframe or analytics library is installed. There is no conversion reporting or data transmission. A local `window.dataLayer` array receives controlled event identifiers for inspection in browser developer tools:

| Event | Trigger |
| --- | --- |
| `section_navigation` | Main navigation section link |
| `floor_plan_select` | Demonstration layout selection |
| `location_filter` / `location_select` | Location exploration |
| `timeline_select` | Development milestone selection |
| `gallery_filter` / `gallery_open` | Gallery interaction |
| `enquiry_topic_select` | Enquiry-topic selection |
| `whatsapp_click` | WhatsApp CTA click; this does not confirm a message was sent |

Events have only `event`, `section` and `item` fields. Do not add phone numbers, names, email addresses, free-text messages or other personal data to that queue. Events are temporary in-memory data and disappear on reload. The site uses no cookies or browser storage.

Installing a GTM container, production advertising conversions, consent controls or other collection mechanisms requires a separate approved phase and an updated privacy policy.

## What is still needed

Approved floor plans and specifications; approved facility descriptions and renders; final advisor portrait and Affinity Realty brand assets; verified future-development particulars; confirmed project access arrangements; image-use permissions for publication; and a business-approved privacy policy. See the detailed review for the complete list.

Phase 2 has not started. Nothing has been deployed or published. The existing Bangsar Projects website has not been modified.
