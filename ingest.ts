import {
  pipeline,
  layoutPageJoins,
  quoteListRunOns,
  furnitureFaces,
  figureFaces,
  geometry,
  romanFolios,
  layoutMarkers,
  numberedParagraphs,
  numberedOpenings,
  hangingIndents,
  typographicHeadings,
} from "@rtm/ingest";

/**
 * How this report is built. Owned by the report: every decision that shaped
 * its text is named here, and the passes it composes are library code, so a
 * fix to a shared pass reaches every report that calls it.
 *
 * The source is the Inquiry's born-digital, tagged InDesign PDF of Phase 2
 * Volume 1 (232 A4 pages, single column), as published on GOV.UK. Its
 * structure tree is not read: the PDF pipeline below reads the layout. Page
 * citations below are printed page numbers (printed 1 is PDF p.9).
 *
 * Needs @rtm/ingest with furnitureFaces() and typographicHeadings({ relevel })
 * (ingest branch grenfell-passes, stacked on pohorizon-passes, PR #63; not yet
 * released when this was written).
 */
export default pipeline({
  id: "uk-grenfell-tower-inquiry",
  title: "Grenfell Tower Inquiry: Phase 2 Report, Volume 1",
  authors: "Sir Martin Moore-Bick (Chairman), Ali Akbor and Thouria Istephan",
  published_at: "4 September 2024",
  source_url: "https://assets.publishing.service.gov.uk/media/66d817aa701781e1b341dbd3/CCS0923434692-004_GTI_Phase_2_Volume_1_BOOKMARKED.pdf",
  repo: ".",
  volumes: [
    // HC 19-I, Volume 1 of 7: Part 1 (Introduction, Executive summary) and Part 2 (The path to disaster).
    { path: "archive/grenfell-tower-inquiry-phase2-vol1-hc19-i.pdf", sha256: "51d7e2c9592f79b9522bce99c9294badb9479a3b214ad5ce7506d8dd0e45d3fe" },
  ],
  passes: [
    // A paragraph run over a page break joins when the layout says it runs on: 1.12 runs from
    // printed p.4 ("the amount of material that a") to p.5 ("recipient had to consider").
    layoutPageJoins(),
    // A quotation running over a page arrives as two (the Approved Document B extracts, ch.6).
    quoteListRunOns(),
    // The running heads are set in white Calibri 10pt on a banner: "The Grenfell Tower Inquiry: Phase 2
    // Report" on versos (p.4), "Part 1 | Chapter 1: Introduction" on rectos (p.5). The recto head names
    // the chapter, so it recurs only on that chapter's few rectos and `runningFurniture` left the short
    // chapters' heads in the text (chs 1, 13, 14), while it stripped real headings that open many pages
    // ("Introduction" under the banners of chs 4-8 and 10, "Part 3" in the executive summary, p.12) and
    // the banners' "Chapter 2" lines. Dropped by face instead, and nothing else.
    furnitureFaces(["Calibri|15|#ffffff"]),
    // The body's left edge is read per page. The volume-wide margin is the column the paragraph numbers
    // sit in (10), so on a page that opens mid-paragraph, with no number on it, every line of the hanging
    // text (12) read as a new paragraph and only the lower-case ones were joined back: "…the BBA
    // certificate for" / "Reynobond 55 PE." (2.86, p.22-23), the end of 9.40 (p.141) and of 6.21 (p.73)
    // stood as paragraphs of their own (the Inquiry's HTML edition has each as one paragraph).
    geometry("per-page"),
    // The figures and charts of chapters 5 and 6 (printed pp.50-79) draw their words in Times New Roman,
    // which nothing else in the volume uses: Figure 5.1's labels ("Chimney", "Combustion chamber",
    // p.50) stood as paragraphs, "BS 476-6" drawn over 5.9's last line was glued into it, and the
    // charts of pp.73-79 came out as runs of interleaved words (reportsthatmatter-7150). The captions
    // ("Figure 5.1: …", Calibri bold grey) stay.
    figureFaces(["TimesNewRomanPSMT", "TimesNewRomanPS"]),
    // The front matter is folioed v to viii (the contents, PDF pp.5-8); without this its pages were
    // marked 1, 2, "2#2".
    romanFolios(),
    // 2,019 notes at the page feet, numbered once through the volume, the number on its own line and the
    // text beneath ("1" / "The Attorney-General's Undertaking is at…", p.4): the default (bare) style.
    // Markers are raised digits after a word or a closing quotation mark ("proceedings.1", p.4).
    layoutMarkers(),
    // "1.10" paragraphs, the number at the margin and the text hanging one tab in (p.4).
    numberedParagraphs(),
    // A numbered paragraph after one ending "…Approved Document B." stays apart: the text rule that reads a
    // closing initial as an unfinished sentence ran 2.86 on inside 2.85 (p.22), 5.9 inside 5.8 (p.49) and
    // 9.42 inside 9.41 (p.142), so their ids did not exist (reportsthatmatter-f951).
    numberedOpenings(),
    hangingIndents(),
    // Headings are set only by face. Levels: the Part title pages (Calibri 40pt white, "Part 1" light
    // and "Introduction" bold, p.1); the chapter banners (Calibri 20pt bold white, "Chapter 1" /
    // "Introduction", p.3); then three blue (#314c88) bold sub-heading sizes: 18pt ("Introduction" p.37,
    // and the executive summary's "Part 3 / The testing and marketing of products (Chapters 15 – 29)",
    // p.12), 15pt ("Arconic Architectural Products" p.12, "The Holroyd report" p.42) and 12pt ("BR 135,
    // second edition: 2003", p.112), each also in bold italic where it names a publication ("Fire Note 9",
    // p.93). (Layout keys read 1.5 times the point size.) `relevel`: the
    // executive summary's "Part 3" to "Part 14" headings were read by their text as divisions ("Part 3:
    // …", level 2) and stood as top-level sections beside the volume's own Parts 1 and 2; they take
    // their face's level, under Chapter 2.
    typographicHeadings({
      firstLevel: 2,
      relevel: true,
      faces: [
        ["Calibri-Light|60|#ffffff", "Calibri|60|#ffffff|b"],
        ["Calibri|30|#ffffff|b"],
        ["Calibri|27|#314c88|b", "Calibri|27|#314c88|b|i"],
        ["Calibri|23|#314c88|b", "Calibri|23|#314c88|b|i"],
        ["Calibri|18|#314c88|b", "Calibri|18|#314c88|b|i"],
      ],
    }),
  ],
});
