
import { agGridThemeCustomize } from "@/settings/ag-theme-customize";
import AgGridCellButton from "@/components/AgGridCellButton.vue";

export const gridOptions = {
  theme: agGridThemeCustomize, // 主題
  rowSelection: "multiple", // 允許勾選選擇框來選擇多行
  singleClickEdit: true, // 單擊可編輯單元格時直接進入編輯狀態
  suppressRowClickSelection: true, // 只有點擊行內部的 Checkbox 才會觸發行選擇
  pagination: true, // 允許分頁
  paginationPageSize: 10, // 預設每頁行數
  paginationPageSizeSelector: [10, 20, 50], // 可選行數
  masterDetail: true, // 允許 detail grid
  enableRowGroup: true, // 允許分組
  defaultColDef: {
      flex: 1, // 自動適應寬度
      menuTabs: [], // 禁用菜單功能
      floatingFilter: false, // 啟用浮動篩選器
      resizable: true, // 是否可調整列寬
      sortable: false, // 啟用排序
      filter: false, // 啟用篩選
      suppressMenu: true, // 禁用右鍵菜單
      resizable: false, // 調整列寬
      lockPosition: true, // 鎖定位置
      lockPinned: true, // 鎖定 pinned 
  },
  components: {
      AgGridCellButton: AgGridCellButton
  },
  detailCellRendererParams: {
      detailGridOptions: {
          columnDefs: [
              { headerName: "子項名稱", field: "subName" },
              { headerName: "數量", field: "subQuantity" },
          ],
          rowData: null, // 靜態數據 (優先級比 successCallback 高)
      },
      getDetailRowData: (params) => {
          params.successCallback(params.data.subItems); //  動態數據
      },
  },
  onRowGroupOpened: (params) => { },
  onCellEditingStopped: (params) => { },
}