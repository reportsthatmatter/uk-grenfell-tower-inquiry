# Grenfell Tower Inquiry: Phase 2 Report

HC 19, presented to Parliament on 4 September 2024 under section 26 of the Inquiries Act 2005. The report of the public inquiry into the fire at Grenfell Tower on 14 June 2017, Phase 2, by the Panel: the Rt Hon Sir Martin Moore-Bick (Chairman), Ali Akbor OBE and Thouria Istephan. Seven volumes (232, 228, 202, 326, 212, 220 and 274 pages).

## Scope

Volume 1 (HC 19-I) only, so far, as the report id `uk-grenfell-tower-inquiry`: Part 1, Introduction (Chapter 1, Introduction; Chapter 2, Executive summary, which summarises all fourteen Parts of the report) and Part 2, The path to disaster (Chapters 3 to 14: the regulatory regime, fire testing, the government and the Building Research Establishment, the response to the Lakanal House fire, warnings to government about combustible cladding, fire risk assessors, the Fire Safety Order and the LGA Guide). 232 pages.

Volumes 2 to 7 are further units of this same report id, to be added as volumes in `ingest.ts`. The report's recommendations (Part 14, Chapter 113) are in Volume 7, not Volume 1. The Phase 1 report (October 2019, four volumes) is a separate report and would be a separate id. The Inquiry's 52-page Overview and its translations, and the large-print edition, are separate publications and out of scope.

## Source

`archive/grenfell-tower-inquiry-phase2-vol1-hc19-i.pdf`: Volume 1 as published on GOV.UK (https://www.gov.uk/government/publications/publication-of-the-grenfell-tower-inquiry-phase-2-report). Crown copyright 2024, licensed under the Open Government Licence v3.0 (stated on the PDF's p.4, the imprint). See `datapackage.json`.

## Materials

Checked 2026-10-04 (stage 1 of the preparation pipeline, reportsthatmatter-gqsy.4).

| Need | Source | Role |
| --- | --- | --- |
| Words | GOV.UK PDF, SHA-256 `51d7e2c9…d3fe` | canonical, citation target |
| Blocks and headings | The same PDF's layout (faces and sizes); it is also tagged (InDesign styles Chapter_Title, AHead, BHead, CHead, LI/Lbl, Note/Footnote_Text) | the PDF pipeline reads the layout; the tags build `reference/blocks.jsonl` |
| Paragraph numbers | The PDF ("1.1", "4.20"): the HTML edition has none | PDF |
| Notes | The PDF's page-foot notes (2,019, numbered once through the volume) | PDF; the HTML edition's linked endnotes are an answer key |
| Page anchors | The printed folios: roman on the front matter (v to viii), arabic from PDF p.9 (printed 1 = PDF p.9) | PDF |
| Provenance | HC 19-I, ISBN 978-1-5286-5080-9, E03165832 09/2024 | datapackage |
| Reference | The Inquiry's HTML edition of the volume, `reference/raw/volume-1.html` (Wayback capture of 2 October 2024 of https://www.grenfelltowerinquiry.org.uk/report/phase-2/volume-1.html) | words, headings (h1-h5) and all 2,019 notes; no paragraph numbers, no page anchors |
| Rejected | The Inquiry site's copy of the PDF (`…Volume 1_BOOKMARKED_0.pdf`, 20 MB, SHA-256 `bf183dd4…4790`): same edition, its text identical to the GOV.UK file | — |
| Rejected | The large-print edition (`…Volume 1_LARGE_3 SEPT_0.pdf`, 570 pages): same text, different pagination | — |

Sourcing checklist:

1. How the PDF was made: Adobe InDesign 19.4 (Macintosh), Adobe PDF Library 17.0, created 22 July 2024, modified 13 August 2024. Calibri family throughout. Born-digital; the text layer is clean (no C0 control characters). A4, single column. Folios printed at the foot of each page. Tagged: Note 2019, Footnote_Text 2019, LI 822, Chapter_Title 15, AHead 32, BHead 151, CHead 13, Figure 17.
2. Other renditions: the Inquiry site's own copy of the PDF and the large-print edition (both rejected above); the HTML edition (reference).
3. Official HTML: yes, the Inquiry's, one page per volume, now at the National Archives (UKGWA, behind a captcha) and in the Wayback Machine (ten captures, 4 September to 2 October 2024, identical apart from an obfuscated e-mail address). It has no paragraph numbers or page anchors, so it is a reference here, not the served structure.
4. EPUB: none.
5. Wikisource: not checked (an official HTML edition and a tagged PDF already cover every need).
6. Court documents: not applicable.
7. US congressional: not applicable.
8. Originals: the Cabinet Office (accessible.formats@cabinetoffice.gov.uk); the Inquiry has closed.

Versions: no correction or erratum notice found for Volume 1. Volume 7's HTML carries a "Corrected_Figure_109.3", to be checked when that volume is added.

Layout notes: chapter titles in white on a banner ("Chapter 1" / "Introduction", 20pt bold); sub-headings in blue bold at 18, 15 and 12pt; running heads in white 10pt on a banner ("The Grenfell Tower Inquiry: Phase 2 Report" on versos, "Part 1 | Chapter 1: Introduction" on rectos); numbered paragraphs with the number at the margin; notes at the foot with the number on its own line and the text beneath; tables and figures in Chapters 5 and 6.

## Build

`ingest.ts` declares how the report is turned into Markdown. Rebuild from the site repo with `pnpm ingest run uk-grenfell-tower-inquiry`. `fidelity.md` lists the words the pipeline flagged for review. It needs `@rtm/ingest` with `furnitureFaces`, `typographicHeadings({ faces, relevel })` (ingest branch `grenfell-passes`, on `pohorizon-passes`; not yet released).
