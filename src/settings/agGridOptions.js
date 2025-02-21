import { agGridThemeCustomize } from "@/style/ag-theme-customize";
import AgGridButtonGroup from "@/components/AgGridButtonGroup.vue";
import { localeText } from "@/settings/localeText";
import { messageBoxHandler } from "@/utils/utility";

export const agGridOptions = {
  theme: agGridThemeCustomize, // 主題
  suppressRowClickSelection: true, // 只有點擊行內部的 Checkbox 才會觸發行選擇
  rowSelection: "multiple", // 允許勾選選擇框來選擇多行
  singleClickEdit: true, // 單擊可編輯單元格時直接進入編輯狀態
  stopEditingWhenCellsLoseFocus: true, // 當失去焦點時自動結束編輯
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
    AgGridButtonGroup: AgGridButtonGroup
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
        if(newValue === "") {
          return undefined
        } else if(params.colDef.minInput && params.newValue < params.colDef.minInput) {
          setTimeout(() => messageBoxHandler(`輸入數值不可小於${params.colDef.minInput}`), 0); // setTimeout 保証觸發 messageBoxHandler
          return params.oldValue
        } else if(params.colDef.maxInput && params.newValue > params.colDef.maxInput) {
          setTimeout(() => messageBoxHandler(`輸入數值不可大於${params.colDef.maxInput}`), 0); // setTimeout 保証觸發 messageBoxHandler
          return params.oldValue
        } else {
          return Number(newValue)
        }
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
      cellClass: "cellOption",
      cellEditor: "agRichSelectCellEditor",
    }
  },
};
