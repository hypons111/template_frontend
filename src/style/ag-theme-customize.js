import { themeQuartz } from "@ag-grid-community/theming";

const CYAN = "#00FFFF"
const MAGENTA = "#FF00FF"
const YELLOW = "#FFFF00"
const LIME = "#00FF00"

export const agGridThemeCustomize = themeQuartz.withParams({
  accentColor: "#00FF00",
  backgroundColor: "black",
  borderColor: LIME,
  borderRadius: 0,
  browserColorScheme: "dark",
  cellHorizontalPaddingScale: 1,
  cellTextColor: LIME,
  columnBorder: true,
  fontFamily: {
    googleFont: "IBM Plex Mono",
  },
  fontSize: 12,
  foregroundColor: "#00FF00",
  headerBackgroundColor: "#21222C",
  headerFontSize: 14,
  headerFontWeight: 700,
  headerTextColor: LIME,
  headerVerticalPaddingScale: 1.5,
  oddRowBackgroundColor: "#21222C",
  rangeSelectionBackgroundColor: "#FFFF0020",
  rangeSelectionBorderColor: "#00FF00",
  rangeSelectionBorderStyle: "dashed",
  rowBorder: true,
  rowVerticalPaddingScale: 1.5,
  sidePanelBorder: true,
  spacing: 4,
  wrapperBorder: true,
  wrapperBorderRadius: 0,
});
