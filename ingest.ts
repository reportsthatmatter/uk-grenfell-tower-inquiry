import {
  pipeline,
  layoutPageJoins,
  quoteListRunOns,
  furnitureFaces,
  romanFolios,
  layoutMarkers,
  numberedParagraphs,
  hangingIndents,
  typographicHeadings,
} from "@rtm/ingest";

/**
 * How this report is built. Owned by the report: every decision that shaped
 * its text is named here, and the passes it composes are library code, so a
 * fix to a shared pass reaches every report that calls it.
 *
 * The source is the Inquiry's born-digital, tagged InDesign PDF of Phase 2
 * Volume 1 (232 A4 pages, single column), as published on GOV.UK.
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
  ],
  passes: [
    layoutPageJoins(),
    quoteListRunOns(),
    furnitureFaces(["Calibri|15|#ffffff"]),
    romanFolios(),
    layoutMarkers(),
    numberedParagraphs(),
    hangingIndents(),
    typographicHeadings({
      firstLevel: 2,
      relevel: true,
      faces: [
        ["Calibri-Light|60|#ffffff", "Calibri|60|#ffffff|b"],
        ["Calibri|30|#ffffff|b"],
        ["Calibri|27|#314c88|b"],
        ["Calibri|23|#314c88|b"],
        ["Calibri|18|#314c88|b"],
      ],
    }),
  ],
});
