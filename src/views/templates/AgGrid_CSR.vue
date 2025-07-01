<template>
  <button @click="switchGrid">{{ isShowGrid ? 'Hide Grid' : 'Show Grid' }}</button>

  <ag-grid-vue 
    v-loading="isGridLoading"
    v-if="isShowGrid"
    class="agGrid" 
    :gridOptions="gridOptions"
    :columnDefs="(columnDefs as any)[operationMode]"
    :detailCellRendererParams="detailCellRendererParams" 
    :rowData="rowData" 
    @grid-ready="gridOptions.onGridReady"
  />
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { arrayData, objectData, objectArrayData } from "@/utils/useQuery";
import { agGrid } from "@/utils/agGrid";
import { inject, ref } from "vue";

const operationMode = ref("master");
const isShowGrid = ref(false);
const isGridLoading = ref(false);

/* gridOptions 預設設定 */
const agGridOptions = inject("agGridOptions") as any; 
const arrayOption = useQuery(arrayData);
const objectOption = useQuery(objectData);
const objectArrayOption = useQuery(objectArrayData);

/* 顯示 / 隱藏 grid */
const switchGrid = () => isShowGrid.value = !isShowGrid.value

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
      // valueFormatter: (params) => { },     // 處理顯示的數據格式
      // valueParser: (params) => { },        // 處理輸入的數據格式
      // valueGetter: (params) => { },        // 直接讀取 rowData
      // valueSetter: (params) => { },        // 直接寫入 rowData
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
      headerName: "選單 Array",
      field: "array",
      type: "option",
      cellEditorParams: () => ({
        values: arrayOption.data.value,
        searchType: "matchAny",
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 200,
      }),
    },
    {
      headerName: "選單 Object",
      field: "object",
      type: "option",
      cellEditorParams: () => ({
        values: Object.values(objectOption.data.value).map(({ id, name }) => `[${id}] ${name}`),
        searchType: "matchAny",
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 200,
      }),
      valueFormatter: (params) => {
        let option = undefined
        /* 如果 objectOption 嘅 key 同 params.value 一樣就用呢個 */
        option = objectOption.data.value[params.value]
        /* 如果 objectOption 嘅 key 同 params.value 唔一樣就用呢個 */
        // option = Object.values(objectOption.data.value).find(({ value }) => value === params.value) 
        if(option) return `[${option.id}] ${option.name}`
      },
      valueSetter: (params) => {
        const id = params.newValue.slice(1, 4);
        params.data.object = objectOption.data.value[id].value;
      },
    },
    {
      headerName: "選單 Object Array",
      field: "objectArray",
      type: "option",
      cellEditorParams: () => ({
        values: objectArrayOption.data.value.map(({ id, name }) => `[${id}] ${name}`),
        searchType: "matchAny",
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 200,
      }),
      valueFormatter: (params) => {
        const option = Object.values(objectArrayOption.data.value).find(({ value }) => value === params.value)
        if(option) return `[${option.id}] ${option.name}`
      },
      valueSetter: (params) => {
        const newValueId = params.newValue.slice(1, 4);
        params.data.objectArray = objectArrayOption.data.value.find(({ id }) => id === newValueId).value;
      },
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
            func: () => console.log(agGrid.getGridData(gridApi.value))
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
      cellRendererParams: (params: any) => ({
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
        // valueFormatter: (params) => { },     // 處理顯示的數據格式
        // valueParser: (params) => { },        // 處理輸入的數據格式
        // valueGetter: (params) => { },        // 直接讀取 rowData
        // valueSetter: (params) => { },        // 直接寫入 rowData
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
        headerName: "選單 Array",
        field: "array",
        type: "option",
        cellEditorParams: () => ({
          values: arrayOption.data.value,
          searchType: "matchAny",
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
          valueListMaxHeight: 200,
        }),
      },
      {
        headerName: "選單 Object",
        field: "object",
        type: "option",
        cellEditorParams: () => {
          return {
            values: Object.values(objectOption.data.value).map(({ id, name }) => `[${id}] ${name}`),
            searchType: "matchAny",
            allowTyping: true,
            filterList: true,
            highlightMatch: true,
            valueListMaxHeight: 200,
          };
        },
        valueFormatter: (params) => {
          for (let key in objectOption.data.value) {
            if (objectOption.data.value[key].value === params.value) {
              const option = objectOption.data.value[key];
              return `[${option.id}] ${option.name}`;
            }
          }
        },
        valueSetter: (params) => {
          const id = params.newValue.slice(1, 4);
          params.data.object = objectOption.data.value[id].value;
        },
      },
      {
        headerName: "選單 Object Array",
        field: "objectArray",
        type: "option",
        cellEditorParams: () => ({
          values: objectArrayOption.data.value.map(({ id, name }) => `[${id}] ${name}`),
          searchType: "matchAny",
          allowTyping: true,
          filterList: true,
          highlightMatch: true,
          valueListMaxHeight: 200,
        }),
        valueFormatter: (params) => {
          for (let option of objectArrayOption.data.value) {
            if (option.value === params.value) {
              return `[${option.id}] ${option.name}`;
            }
          }
        },
        valueSetter: (params) => {
          const newValueId = params.newValue.slice(1, 4);
          params.data.objectArray = objectArrayOption.data.value.find(({ id }) => id === newValueId).value;
        },
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
              func: (params) => agGrid.addDetailrRow(gridApi.value, params, {
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
              func: (params) => console.log(agGrid.getDetailRowData(gridApi.value, params.data)),
            },
            {
              label: "刪除",
              type: "danger",
              show: true,
              disabled: false,
              func: (params) => agGrid.deleteDetailRow(gridApi.value, params.data),
            }
          ]
        },
      },
    ],
  },
  getDetailRowData: (params) => {
    params.successCallback(params.data.details); //  動態數據
  },
  onCellEditingStopped: (params) => { },
};

const rowData = ref([
  {
    masterRowIndex: 0,
    masterRowNumber: 1,
    cell: "Master 1",
    input: "",
    number: undefined,
    date: undefined,
    array: "A",
    object: "A",
    objectArray: "A",
    details: [
      {
        masterRowIndex: 0,
        masterRowNumber: 1,
        detailRowIndex: 0,
        detailRowNumber: 1,
        cell: "Detail 1",
        input: "",
        date: undefined,
        array: "A",
        object: "A",
        objectArray: "A",
      },
      {
        masterRowIndex: 0,
        masterRowNumber: 1,
        detailRowIndex: 1,
        detailRowNumber: 2,
        cell: "Detail 2",
        input: "",
        date: undefined,
        array: "B",
        object: "B",
        objectArray: "B",
      },
      {
        masterRowIndex: 0,
        masterRowNumber: 1,
        detailRowIndex: 2,
        detailRowNumber: 3,
        cell: "Detail 3",
        input: "",
        date: undefined,
        array: "C",
        object: "C",
        objectArray: "C",
      }
    ],
  },
  {
    masterRowIndex: 1,
    masterRowNumber: 2,
    cell: "Master 2",
    input: "",
    number: undefined,
    date: undefined,
    array: "B",
    object: "B",
    objectArray: "B",
    details: [
      {
        masterRowIndex: 1,
        masterRowNumber: 2,
        detailRowIndex: 0,
        detailRowNumber: 1,
        cell: "Detail 1",
        input: "",
        date: undefined,
        array: "A",
        object: "A",
        objectArray: "A",
      },
      {
        masterRowIndex: 1,
        masterRowNumber: 2,
        detailRowIndex: 1,
        detailRowNumber: 2,
        cell: "Detail 2",
        input: "",
        date: undefined,
        array: "B",
        object: "B",
        objectArray: "B",
      },
      {
        masterRowIndex: 1,
        masterRowNumber: 2,
        detailRowIndex: 2,
        detailRowNumber: 3,
        cell: "Detail 3",
        input: "",
        date: undefined,
        array: "C",
        object: "C",
        objectArray: "C",
      },
    ],
  },
  {
    masterRowIndex: 2,
    masterRowNumber: 3,
    cell: "Master 3",
    input: "",
    number: undefined,
    date: undefined,
    array: "C",
    object: "C",
    objectArray: "C",
    details: [],
  },
  {
    masterRowIndex: 3,
    masterRowNumber: 4,
    cell: "Master 4",
    input: "",
    number: undefined,
    date: undefined,
    array: "D",
    object: "D",
    objectArray: "D",
    details: [],
  },
  {
    masterRowIndex: 4,
    masterRowNumber: 5,
    cell: "Master 5",
    input: "",
    number: undefined,
    date: undefined,
    array: "E",
    object: "E",
    objectArray: "E",
    details: [],
  },
]);
</script>

<style lang="scss" scoped>
@import '@/style/ag-grid.scss';
</style>
