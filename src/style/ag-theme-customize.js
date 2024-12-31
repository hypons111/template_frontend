import { themeQuartz } from "@ag-grid-community/theming";

const CYAN = "#00FFFF"
const MAGENTA = "#FF00FF"
const YELLOW = "#FFFF00"
const LIME = "#00FF00"

export const agGridThemeCustomize = themeQuartz.withParams({
  accentColor: LIME,
  backgroundColor: "black",
  borderColor: null,
  borderRadius: 0,
  browserColorScheme: "dark",
  cellHorizontalPaddingScale: 1,
  cellTextColor: LIME,
  columnBorder: true,
  fontFamily: {
    // googleFont: "IBM Plex Mono",
  },
  fontSize: 12,
  foregroundColor: LIME,
  headerBackgroundColor: "#21222C",
  headerFontSize: 14,
  headerFontWeight: 700,
  headerTextColor: LIME,
  headerVerticalPaddingScale: 1.5,
  oddRowBackgroundColor: "black",
  rangeSelectionBackgroundColor: MAGENTA,
  rangeSelectionBorderColor: LIME,
  rangeSelectionBorderStyle: "dashed",
  rowBorder: true,
  rowVerticalPaddingScale: 1.5,
  sidePanelBorder: true,
  spacing: 4,
  wrapperBorder: true,
  wrapperBorderRadius: 0,
});
