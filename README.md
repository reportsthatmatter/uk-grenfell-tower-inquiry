# Grenfell Tower Inquiry: Phase 2 Report

HC 19, presented to Parliament on 4 September 2024 under section 26 of the Inquiries Act 2005. The report of the public inquiry into the fire at Grenfell Tower on 14 June 2017, Phase 2, by the Panel: the Rt Hon Sir Martin Moore-Bick (Chairman), Ali Akbor OBE and Thouria Istephan. Seven volumes (232, 228, 202, 326, 212, 220 and 274 pages).

## Scope

All seven volumes of the Phase 2 report, as the report id `uk-grenfell-tower-inquiry`, each a volume in `ingest.ts`:

| Volume | HC | Parts and chapters | PDF pages |
| --- | --- | --- | --- |
| 1 | HC 19-I | Part 1, Introduction (Chapters 1-2, including the Executive summary of all fourteen Parts); Part 2, The path to disaster (Chapters 3-14) | 232 |
| 2 | HC 19-II | Part 3, The testing and marketing of products (Chapters 15-29) | 228 |
| 3 | HC 19-III | Part 4, The Tenant Management Organisation (Chapters 30-33); Part 5, The management of fire safety at Grenfell Tower (Chapters 34-46) | 202 |
| 4 | HC 19-IV | Part 6, The refurbishment of Grenfell Tower (Chapters 47-67) | 326 |
| 5 | HC 19-V | Part 7, Replacement of the gas riser (Chapter 68); Part 8, The London Fire Brigade (Chapters 69-83) | 212 |
| 6 | HC 19-VI | Part 9, The deceased (Chapters 84-97) | 220 |
| 7 | HC 19-VII | Parts 10-14: Response and recovery; Matters outstanding from Phase 1; The fire testing regime; International responses; Recommendations (Chapters 98-113) | 274 |

Volume 1 was published first (October 2026); Volumes 2-7 were added as further units (November 2026, reportsthatmatter-gqsy.4.2). Left out: Volumes 2-7's cover, title page and imprint (PDF pp.1-4 of each, which repeat Volume 1's), and Volume 7's appendices (PDF pp.249-274: Glossary, Guide to references with its tables of hearing days and witnesses, and the Inquiry team), which are tables and wait for table support (reportsthatmatter-bnqs). The Phase 1 report (October 2019, four volumes) is a separate report and would be a separate id. The Inquiry's 52-page Overview and its translations, and the large-print edition, are separate publications and out of scope.

## Source

`archive/grenfell-tower-inquiry-phase2-vol{1-7}-hc19-{i-vii}.pdf`: the seven volumes as published on GOV.UK (https://www.gov.uk/government/publications/publication-of-the-grenfell-tower-inquiry-phase-2-report). Crown copyright 2024, licensed under the Open Government Licence v3.0 (stated on the PDF's p.4, the imprint). See `datapackage.json`.

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

Versions: no correction or erratum notice found for any volume (GOV.UK change history: "First published", 4 September 2024, unchanged). Volume 7's HTML edition names one image "Corrected_Figure_109.3.png"; it and the HTML were captured on publication day (Wayback 20240904103648), the Inquiry site carried only one Volume 7 PDF (captured 20240904103605), and the GOV.UK PDF's Figure 109.3 (PDF p.190, "Experiment 21 (time 10.50 minutes)") shows the same frames as the corrected image, so the PDF is the corrected edition; the figure is not served in any case (figures are not extracted).

Volumes 2-7 (checked 2026-11-12): the same InDesign 19.4 / Adobe PDF Library 17.0 production as Volume 1, tagged, A4, single column, folios restarting at 1 in each volume. SHA-256: Vol 2 `d85ee6c7…63c5`, Vol 3 `cf7bb663…a580`, Vol 4 `6d665c34…e9c4`, Vol 5 `aafba714…72ea`, Vol 6 `54369b7b…74e2`, Vol 7 `9bb429dc…8ff9` (full values in `ingest.ts` and `datapackage.json`). Notes restart at 1 in each volume; the tag census (Note elements) gives 2,192, 1,829, 3,279, 1,772, 1,798 and 2,451. Each volume's paragraph numbers are set in Calibri bold grey (#7a7b7a): 851, 846, 1,213 (and 8 figure captions), 757, 1,032 and 913. Volumes 3 and 6 set their sub-headings in a darker blue (#004a82) than the others (#314c88). The Inquiry's HTML editions of Volumes 2-7 exist in Wayback (`report/phase-2/volume-N.html`) and have not been cached as references yet.

Layout notes: chapter titles in white on a banner ("Chapter 1" / "Introduction", 20pt bold); sub-headings in blue bold at 18, 15 and 12pt; running heads in white 10pt on a banner ("The Grenfell Tower Inquiry: Phase 2 Report" on versos, "Part 1 | Chapter 1: Introduction" on rectos); numbered paragraphs with the number at the margin; notes at the foot with the number on its own line and the text beneath; tables and figures in Chapters 5 and 6.

## Licence

Text of the report: Crown copyright 2024, Open Government Licence v3.0. Our markup, processing and editorial additions: CC BY 4.0. Code: MIT. Evidence, caveats and the full statement are in [LICENSE](LICENSE); the MIT text is in [LICENSE-MIT](LICENSE-MIT).

## Build

`ingest.ts` declares how the report is turned into Markdown. Rebuild from the site repo with `pnpm ingest run uk-grenfell-tower-inquiry`. `fidelity.md` lists the words the pipeline flagged for review. Volumes 2-7 need `@rtm/ingest` with `hyphenMajority`, `numberedInSequence` and `letteredItems({ fromVolume })` (ingest branch `hyphen-majority`; not yet released when this was written).
