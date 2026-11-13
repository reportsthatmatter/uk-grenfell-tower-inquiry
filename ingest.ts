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
  hyphenMajority,
  footnoteResets,
  numberedInSequence,
  letteredItems,
  type VolumePass,
} from "@rtm/ingest";

/**
 * Volumes 2 to 7 each open with the same four pages as Volume 1: the cover ("GRENFELL TOWER INQUIRY: /
 * PHASE 2 REPORT … Volume 2 / Part 3 – The testing and marketing of key products / HC 19–II", PDF p.1),
 * a blank, the title page (p.3) and the imprint ("This report contains content which some may find
 * distressing." / "© Crown copyright 2024 … (Volume 2 of 7)", p.4); the Part title page follows at
 * p.5 in every volume. Each closes on a back cover ("ISBN 978-1-5286-5080-9 / (Volume 2 of 7)", its last
 * page, Vol 2 p.228). Read through, each volume's opening repeated the report's title as two
 * "PHASE 2 REPORT" headings and its cover as a "Volume N: …" heading, short sections that folded into
 * the previous volume's last chapter (Volume 3's cover closed Chapter 29), and each back cover stood as
 * an "ISBN" paragraph at the end of the volume's last chapter. Those pages carry no text of the report's
 * own and no folio, so they are dropped for Volumes 2-7; Volume 1's, which carry its contents for all
 * seven volumes and are already published, are kept.
 *
 * Volume 7's Part title page ("Part 10 / Response and recovery", PDF p.5) is the one that prints no
 * folio; with the front matter gone nothing before it is numbered, so no page marker stood over Part 10
 * and its section was labelled with Volume 6's last page. It takes its place in the sequence, p.5,
 * as it has in Volumes 2-6.
 */
const laterVolumeCovers: VolumePass = {
  name: "laterVolumeCovers",
  stage: "volume",
  run: (pages) => {
    const last = Math.max(...pages.map((page) => page.pdfIndex));
    return pages.map((page) => {
      if (page.volume > 1 && (page.pdfIndex <= 4 || page.pdfIndex === last)) return { ...page, body: [], footnotes: [] };
      if (page.volume === 7 && page.pdfIndex === 5 && page.printed === null) return { ...page, printed: 5 };
      return page;
    });
  },
};

/**
 * Volume 7's appendices (PDF pp.249-274: Appendix A, Glossary; Appendix B, Guide to references, with its
 * table of hearing days, witnesses and the commemorative presentations about those who died; Appendix C,
 * The Inquiry Team; the imprint) are tables: read as prose, their cells came out as runs of one-line
 * paragraphs and false quotations (58 of the volume's 104 oracle findings on 26 of its 274 pages). They
 * are left out of this unit, as the Mueller report's appendices were, until tables can be read
 * (reportsthatmatter-bnqs); the report's text ends with Chapter 113, the recommendations (PDF p.248).
 */
const volume7Appendices: VolumePass = {
  name: "volume7Appendices",
  stage: "volume",
  run: (pages) => pages.map((page) => (page.volume === 7 && page.pdfIndex >= 249 ? { ...page, body: [], footnotes: [] } : page)),
};

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
 * Needs @rtm/ingest with furnitureFaces(), typographicHeadings({ relevel }), numberedOpenings() and
 * figureFaces() (ingest PR #68, branch grenfell-passes; not yet released when this was written).
 * Volumes 2-7 need hyphenMajority() and numberedInSequence() (ingest branch hyphen-majority; not yet
 * released when this was written).
 */
export default pipeline({
  id: "uk-grenfell-tower-inquiry",
  title: "Grenfell Tower Inquiry: Phase 2 Report",
  authors: "Sir Martin Moore-Bick (Chairman), Ali Akbor and Thouria Istephan",
  published_at: "4 September 2024",
  source_url: "https://assets.publishing.service.gov.uk/media/66d817aa701781e1b341dbd3/CCS0923434692-004_GTI_Phase_2_Volume_1_BOOKMARKED.pdf",
  repo: ".",
  volumes: [
    // HC 19-I, Volume 1 of 7: Part 1 (Introduction, Executive summary) and Part 2 (The path to disaster).
    { path: "archive/grenfell-tower-inquiry-phase2-vol1-hc19-i.pdf", sha256: "51d7e2c9592f79b9522bce99c9294badb9479a3b214ad5ce7506d8dd0e45d3fe" },
    // HC 19-II, Volume 2: Part 3 (The testing and marketing of products, chs 15-29). Notes restart at 1 in each volume.
    { path: "archive/grenfell-tower-inquiry-phase2-vol2-hc19-ii.pdf", sha256: "d85ee6c7f7ef03ca4cfa4646f2ec6332b94ca06ec32b721c3aadfdee827363c5" },
    // HC 19-III, Volume 3: Part 4 (The Tenant Management Organisation) and Part 5 (The management of fire safety).
    { path: "archive/grenfell-tower-inquiry-phase2-vol3-hc19-iii.pdf", sha256: "cf7bb66384ea1de569527ed940e3268d27d096b6cc37dfdb9bea61cb9532a580" },
    // HC 19-IV, Volume 4: Part 6 (The refurbishment of Grenfell Tower).
    { path: "archive/grenfell-tower-inquiry-phase2-vol4-hc19-iv.pdf", sha256: "6d665c34ed45d85bbbef254c4fb2bdfca65dd94e5297b8b1d39dc8b033bfe9c4" },
    // HC 19-V, Volume 5: Part 7 (Replacement of the gas riser) and Part 8 (The London Fire Brigade).
    { path: "archive/grenfell-tower-inquiry-phase2-vol5-hc19-v.pdf", sha256: "aafba7143b72c581d2db383378638431d6da8a545d80a386143cd1578db272ea" },
    // HC 19-VI, Volume 6: Part 9 (The deceased).
    { path: "archive/grenfell-tower-inquiry-phase2-vol6-hc19-vi.pdf", sha256: "54369b7b88becec14c28cdd51d22801a7f6200a289d145279ee54520446c74e2" },
    // HC 19-VII, Volume 7: Parts 10-14 (Response and recovery to Recommendations; the 58 recommendations are Part 14).
    { path: "archive/grenfell-tower-inquiry-phase2-vol7-hc19-vii.pdf", sha256: "9bb429dcb716aab5610338566a5a192ae78435078c6de41e4919033e67ac8ff9" },
  ],
  passes: [
    laterVolumeCovers,
    volume7Appendices,
    // A paragraph run over a page break joins when the layout says it runs on: 1.12 runs from
    // printed p.4 ("the amount of material that a") to p.5 ("recipient had to consider").
    // numberedBody: every body paragraph is numbered, so an unnumbered page opening carries on the one above:
    // 7.44 "…from the department." / "The Select Committee heard evidence…" (printed p.94), and 5.23's inline
    // "(i) …," / "(ii) a composite product…" (p.55) is the sentence's own list (reportsthatmatter-ni9o).
    layoutPageJoins({ numberedBody: true }),
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
    // Each volume numbers its notes from 1. Volumes 6 and 7 open on a page with a single note, "1" (Vol 6
    // PDF p.7, at 84.4; Vol 7 PDF p.7, at 98.x), where the reader was still looking for the note after the
    // previous volume's last (1772, 1798), so notes 1-2 of Vol 6 and note 1 of Vol 7 stood in the body
    // with their markers bare. Volumes 2-5 open on a run of notes and restart without help.
    footnoteResets([
      { volume: 6, page: 7, note: 1 },
      { volume: 7, page: 7, note: 1 },
    ]),
    // The seven volumes print "high-rise" about 400 times and "highrise" once (Volume 3, PDF p.73), so
    // with both in the vocabulary every "high- rise" at a line end closed up: 2.3 (printed p.9), 7.90,
    // 11.21 and 11.67 in Volume 1 changed when Volumes 2-7 were added. The more frequent spelling wins.
    hyphenMajority(),
    // "1.10" paragraphs, the number at the margin and the text hanging one tab in (p.4).
    numberedParagraphs(),
    // A numbered paragraph after one ending "…Approved Document B." stays apart: the text rule that reads a
    // closing initial as an unfinished sentence ran 2.86 on inside 2.85 (p.22), 5.9 inside 5.8 (p.49) and
    // 9.42 inside 9.41 (p.142), so their ids did not exist (reportsthatmatter-f951).
    numberedOpenings(),
    // A time or clause reference wrapped to the head of a line read as a paragraph number and cut the
    // sentence: "…at about" / "02.05 she said that she had lost her friend…" (Vol 6 p.209, in 97.108),
    // "…in accordance with paragraph" / "12.7 of Approved Document B…" (Vol 2, in 22.105); 13 in Vol 6,
    // 4 in Vol 7, 2 in Vol 2. A number of another chapter after an unfinished sentence carries it on.
    numberedInSequence(),
    hangingIndents(),
    // Lettered sub-items, "a.   Although Natasha Elcock’s first two emergency calls at 01.28 and 01.33 prompted" over
    // wrapped lines hung at the item's text (Vol 6 p.37, in 86.x): the wrapped lines read as a quotation
    // cut from the item's first line, 41 times in Vol 6 and over 100 in Volumes 2-7. From Volume 2 only:
    // Volume 1 was published without it, and it would move Volume 1's ids (5.23's "(ii)", ni9o).
    letteredItems({ fromVolume: 2 }),
    // Headings are set only by face. Levels: the Part title pages (Calibri 40pt white, "Part 1" light
    // and "Introduction" bold, p.1); the chapter banners (Calibri 20pt bold white, "Chapter 1" /
    // "Introduction", p.3); then three blue (#314c88) bold sub-heading sizes: 18pt ("Introduction" p.37,
    // and the executive summary's "Part 3 / The testing and marketing of products (Chapters 15 – 29)",
    // p.12), 15pt ("Arconic Architectural Products" p.12, "The Holroyd report" p.42) and 12pt ("BR 135,
    // second edition: 2003", p.112), each also in bold italic where it names a publication ("Fire Note 9",
    // p.93). (Layout keys read 1.5 times the point size.) Volumes 3 and 6 set the same three sizes in a
    // darker blue, #004a82: "Arm’s Length Management Organisations" (Vol 3, PDF p.10); in Vol 6 the name of
    // each of the deceased (18pt) over "Background and composition of household", "Vulnerability",
    // "Events of 14 June 2017" (15pt). Vol 6's bold black 12pt "Date of birth:" labels stay in the text. `relevel`: the
    // executive summary's "Part 3" to "Part 14" headings were read by their text as divisions ("Part 3:
    // …", level 2) and stood as top-level sections beside the volume's own Parts 1 and 2; they take
    // their face's level, under Chapter 2.
    typographicHeadings({
      firstLevel: 2,
      relevel: true,
      faces: [
        ["Calibri-Light|60|#ffffff", "Calibri|60|#ffffff|b"],
        ["Calibri|30|#ffffff|b"],
        ["Calibri|27|#314c88|b", "Calibri|27|#314c88|b|i", "Calibri|27|#004a82|b"],
        ["Calibri|23|#314c88|b", "Calibri|23|#314c88|b|i", "Calibri|23|#004a82|b"],
        ["Calibri|18|#314c88|b", "Calibri|18|#314c88|b|i", "Calibri|18|#004a82|b"],
      ],
    }),
  ],
});
