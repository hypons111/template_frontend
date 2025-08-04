<template>
  <el-row>
    <ButtonGroup
      :buttons="[
        { label: '顯示', type: 'primary', show: true, disabled: false, func: () => gridHandler(true) },
        { label: '隱藏', type: 'danger', show: true, disabled: false, func: () => gridHandler(false) }
      ]"
    />
  </el-row>

  <ag-grid-vue 
    v-show="isShowGrid"
    v-loading="isGridLoading"
    class="agGrid" 
    :gridOptions="gridOptions"
    :columnDefs="(columnDefs as any)[operationMode]"
    :detailCellRendererParams="detailCellRendererParams" 
    :rowData="rowData" 
    @grid-ready="gridOptions.onGridReady"
  />
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getDragonballData, getDragonballIds, getDragonballNames } from "@/request/useQuery";
import { agGrid } from "@/utility/utility_AgGrid";

const operationMode = ref("master");
const isShowGrid = ref(false);
const isGridLoading = ref(false);
const agGridOptions = inject("agGridOptions") as any; // gridOptions 預設設定
const dragonBallData = useQuery(getDragonballData) as any; // rawData，用嚟 mapping
const dragonballIds = useQuery(getDragonballIds) as any; // dragonball id list 用嚟放喺 ag grid select menu
const dragonballNames = useQuery(getDragonballNames) as any; // dragonball name list 用嚟放喺 ag grid select menu

const rawData = ref([]) as any; // response 回傳 data，用嚟更新 rowData
const rowData = computed(() => agGrid.processToRowData(rawData.value))

function gridHandler(isShowGrida:boolean) {
  isShowGrid.value = isShowGrida
  isGridLoading.value = true;
  rawData.value = mapToGridData(fakeData);
  isGridLoading.value = false;
}

function mapToGridData(data:any) {
  data.forEach((master: any, index: number) => {
    master.details.forEach((detail:any) => {})
  });
  return data
}

function mapToPayload(data:any) {
  data.forEach((item: any, index: number) => {});
  return data
}

const gridApi = ref()

const gridOptions = {
  ...agGridOptions,
  onGridReady: (params:any) => { gridApi.value = params.api },
  onRowGroupOpened: (event:any) => { agGrid.ensureSingleNodeExpended(gridApi.value, event) },
  // onCellEditingStopped: (params) => {},
  // onCellValueChanged: (params) => {},
};

const columnDefs = {
  master: [
    {
      headerName: "項次",
      field: "masterRowNumber",
      minWidth: 80,
      maxWidth: 80,
      pinned: "left",
      headerCheckboxSelection: true, // 全選框
      checkboxSelection: true, // 選擇框
      cellRenderer: "agGroupCellRenderer", // detail grid
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Cell",
      field: "cell",
      type: "",
      flex: 1,
      // minWidth: 120,
      // maxWidth: 120,
      // pinned: "left", // "left" 或 "right"
      // editable: false, // 編輯
      // rowGroup: false, // 分組
      // hide: false, // 隱藏
      // cellStyle: { textAlign: "right" }
    },
    {
      headerName: "Input",
      field: "input",
      type: "input",
    },
    {
      headerName: "Number",
      field: "number",
      type: "number",
      minInput: 1,    // 最少數值
      maxInput: 100,  // 最大數值
    },
    {
      headerName: "Date",
      field: "date",
      type: "date",
    },
    {
      headerName: "Select",
      field: "dragonBall",
      type: "option",
      cellEditorParams: () => ({
        /* 因為 rowData 傳入嚟嘅值型別係 number，所以 valueFormatter 收到嘅 value 會係 number */ 
        /* 所以傳入 cellEditorParams.values 嘅 dragonballIds.data.value 陣列都係要 [number] */ 
        /* 否則 select menu 會有問題 */ 
        /* dragonballIds.data.value 用 useQuery getDragonballIds 砌成陣列，可以自定資料型態 */
        values: dragonballIds.data.value, 
        searchType: "matchAny",
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 200,
      }),
      valueFormatter: (data:any) => {
        /* 只做顯示轉換，唔會影響本身嘅值 */
        /* 選擇新嘅 option，會自動更新值 */
        console.log(data)
        return dragonBallData.data.value.find(({id}:any) => id === data.value).name
      }
    },
    {
      headerName: "按鈕",
      minWidth: 185,
      maxWidth: 185,
      pinned: "right",
      lockPosition: true,
      headerComponent: "AgGridButtonGroup",
      headerComponentParams: (params: any) => ({
        buttons: [
          {
            label: "Grid 資料",
            type: "success",
            show: true,
            disabled: false,
            func: () => console.log(mapToPayload(agGrid.getGridData(gridApi.value)))
          },
          {
            label: "新增",
            type: "primary",
            show: true,
            disabled: false,
            func: () =>  agGrid.addMaseterRow(gridApi.value, params, {
              cell: `New Master Row`,
              date: null,
              input: "",
              array: "A",
              object: "A",
              objectArray: "A",
              details: [],
            })
          }
        ]
      }),
      // headerClass: "left", // default: "center",
      cellRenderer: "AgGridButtonGroup",
      cellRendererParams: (params:any) => ({
        buttons: [
          {
            label: "資料",
            type: "success",
            show: true,
            disabled: false,
            func: () => console.log(agGrid.getMasterRowData(gridApi.value, params.data.masterRowIndex)),
          },
          {
            label: "刪除",
            type: "danger",
            show: true,
            disabled: false,
            func: () => agGrid.deleteMasterRow(gridApi.value, params.data),
          }
        ]
      }),
      cellClass: "left",
    }
  ],
  detail: []
};

/* detail grid columnDefs 唔可以好似 master 咁用變數嚟轉換 */
/* 解決方法 1 : 將 detailCellRendererParams 寫成 function，喺 columnDefs 加邏輯 */
/* 解決方法 2 : 唔用 detailCellRendererParams，喺 master grid 加 btn 將 master grid 重新 render 做 detail grid */
const detailCellRendererParams = {
  detailGridOptions: {
    ...agGridOptions, // 基本 gridOptions 設定
    columnDefs: [
      {
        headerName: "項次",
        field: "detailRowNumber",
        minWidth: 70,
        maxWidth: 70,
        pinned: "left",
        headerCheckboxSelection: true, // 全選框
        checkboxSelection: true, // 選擇框
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: "Cell",
        field: "cell",
        type: "",
        flex: 1,
        // minWidth: 120,
        // maxWidth: 120,
        // pinned: "left", // "left" 或 "right"
        // editable: false, // 編輯
        // rowGroup: false, // 分組
        // hide: false, // 隱藏
        // cellStyle: { textAlign: "right" }
      },
      {
        headerName: "Input",
        field: "input",
        type: "input",
      },
      {
        headerName: "Number",
        field: "number",
        type: "number",
        minInput: 1,    // 最少數值
        maxInput: 100,  // 最大數值
      },
      {
        headerName: "Date",
        field: "date",
        type: "date",
      },
      {
        headerName: "Select",
        field: "dragonBall",
        type: "option",
        cellEditorParams: () => ({
          /* 因為 rowData 傳入嚟嘅值型別係 number，所以 valueFormatter 收到嘅 value 會係 number */ 
          /* 所以傳入 cellEditorParams.values 嘅 dragonballIds.data.value 陣列都係要 [number] */ 
          /* 否則 select menu 會有問題 */ 
          /* dragonballIds.data.value 用 useQuery getDragonballIds 砌成陣列，可以自定資料型態 */
          values: dragonballIds.data.value,
          searchType: "matchAny",
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
          valueListMaxHeight: 200,
        }),
        valueFormatter: (data:any) => {
          /* 只做顯示轉換，唔會影響本身嘅值 */
          /* 選擇新嘅 option，會自動更新值 */
          return dragonBallData.data.value.find(({id}:any) => id === data.value).name
        }
      },
      {
        headerName: "按鈕",
        minWidth: 142,
        maxWidth: 142,
        pinned: "right",
        lockPosition: true,
        headerComponent: "AgGridButtonGroup",
        headerComponentParams: {
          buttons: [
            {
              label: "新增",
              type: "primary",
              show: true,
              disabled: false,
              func: (params:any) => agGrid.addDetailrRow(gridApi.value, params, {
                cell: "New Detail Row",
                date: null,
                input: "",
                array: "A",
                object: "A",
                objectArray: "A",
              })
            }
          ]
        },
        cellRenderer: "AgGridButtonGroup",
        cellRendererParams: {
          buttons:[
            {
              label: "資料",
              type: "success",
              show: true,
              disabled: false,
              func: (params:any) => console.log(agGrid.getDetailRowData(gridApi.value, params.data)),
            },
            {
              label: "刪除",
              type: "danger",
              show: true,
              disabled: false,
              func: (params:any) => agGrid.deleteDetailRow(gridApi.value, params.data),
            }
          ]
        },
      },
    ],
  },
  getDetailRowData: (params:any) => {
    params.successCallback(params.data.details); //  動態數據
  },
  onCellEditingStopped: (params:any) => { },
};

const fakeData = [{
    cell: "Master 1",
    input: "",
    number: 100,
    date: "2025-07-24",
    dragonBall: 1,
    details: [
      {
        cell: "Detail 1",
        input: "",
        date: undefined,
        dragonBall: 4,
      },
      {
        cell: "Detail 2",
        input: "",
        date: undefined,
        dragonBall: 7,
      },
      {
        cell: "Detail 3",
        input: "",
        date: undefined,
        dragonBall: 10,
      }
    ],
  },
  {
    cell: "Master 2",
    input: "",
    number: 200,
    date: "2025-07-25",
    dragonBall: 2,
    details: [
      {
        cell: "Detail 1",
        input: "",
        date: undefined,
        dragonBall: 3,
      },
      {
        cell: "Detail 2",
        input: "",
        date: undefined,
        dragonBall: 7,
      },
      {
        cell: "Detail 3",
        input: "",
        date: undefined,
        dragonBall: 2,
      },
    ],
  },
  {
    cell: "Master 3",
    input: "",
    number: 300,
    date: "2025-07-26",
    dragonBall: 3,
    details: [],
  },
  {
    cell: "Master 4",
    input: "",
    number: 400,
    date: "2025-07-27",
    dragonBall: 4,
    details: [],
  },
  {
    cell: "Master 5",
    input: "",
    number: 500,
    date: "2025-07-28",
    dragonBall: 5,
    details: [],
}]

</script>

<style lang="scss" scoped>
@use '@/style/ag-grid.scss';
</style>
