import { agGridThemeCustomize } from "@/style/ag-theme-customize";
import AgGridButton from "@/components/agGridButton.vue";
import { localeText } from "@/settings/localeText";

export const agGridOptions = {
  theme: agGridThemeCustomize, // 主題
  suppressRowClickSelection: true, // 只有點擊行內部的 Checkbox 才會觸發行選擇
  rowSelection: "multiple", // 允許勾選選擇框來選擇多行
  singleClickEdit: true, // 單擊可編輯單元格時直接進入編輯狀態
  masterDetail: true, // 允許 detail grid
  enableRowGroup: true, // 允許分組
  pagination: true, // 允許分頁
  paginationPageSize: 10, // 預設每頁行數
  paginationPageSizeSelector: [10, 20, 50], // 可選行數
  localeText: localeText, // 中文化
  defaultColDef: {
    flex: 1, // 自動適應寬度
    resizable: true, // 調整列寬
    lockPosition: true, // 鎖定位置
    lockPinned: true, // 鎖定 pinned
    suppressMenu: true, // 禁用菜單
    floatingFilter: false, // 啟用浮動篩選器
    sortable: false, // 啟用排序
    filter: false, // 啟用篩選
  },
  components: {
    AgGridButton: AgGridButton,
  },
  columnTypes: {
    input: {
      editable: true,
      cellClass: "cellInput",
      valueFormatter: (params) => params.value || "請輸入",
    },
    number: {
      editable: true,
      cellClass: "cellInput",
      valueFormatter: (params) => (params.value === null || params.value === undefined) ? "請輸入" : params.value,
      valueParser: (params) => {
        const newValue = params.newValue.toString().replace(/[^0-9]+/g, "")
        return newValue === "" ? undefined : Number(newValue)
      },
      cellStyle: { textAlign: "right" },
    },
    date: {
      editable: true,
      cellClass: "cellInput",
      cellEditor: "agDateStringCellEditor",
      valueFormatter: (params) => params.value || "請輸入",
    },
    option: {
      editable: true,
      cellClass: "cellInput",
      cellEditor: "agRichSelectCellEditor",
    }
  },
};
