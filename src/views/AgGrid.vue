<template>
    {{ objectOption.data }}
    <section>
        <ag-grid-vue class="agGrid" :grid-options="gridOptions" :detailCellRendererParams="detailCellRendererParams"
            :rowData="rowData" @grid-ready="onGridReady" />
    </section>
</template>

<script setup>import { useQuery } from "@tanstack/vue-query";
import { arrayData, objectData, objectArrayData } from "@/utils/useQuery";
import { addMaseterRow, getGridData } from "@/utils/agGrid"

const arrayOption = useQuery(arrayData);
const objectOption = useQuery(objectData);
const objectArrayOption = useQuery(objectArrayData);

const gridApi = ref();

const onGridReady = (params) => {
    gridApi.value = params.api;
};

const defaultGridOptions = inject("defaultGridOptions");

const gridOptions = {
    ...defaultGridOptions(), // 預設 gridOptions 副本
    columnDefs: [
        {
            headerName: "項次",
            field: "masterRowNumber",
            minWidth: 70,
            maxWidth: 70,
            pinned: "left",
            headerCheckboxSelection: true, // 顯示全選框
            checkboxSelection: true, // 顯示選擇框
            cellRenderer: "agGroupCellRenderer", // 顯示 detail grid 按鈕
            cellStyle: { textAlign: "center" },
        },
        {
            headerName: "一般 cell",
            field: "cell",
            // minWidth: 120,
            // maxWidth: 120,
            hide: false, // 隱藏
            editable: false, // 編輯
            pinned: null, // "left" 或 "right"
            rowGroup: false, // 列作為分組鍵。
            // valueFormatter: (params) => { },     // 處理顯示的數據格式
            // valueParser: (params) => { },        // 處理輸入的數據格式
            // valueGetter: (params) => { },        // 直接讀取 rowData
            // valueSetter: (params) => { },        // 直接寫入 rowData
            // cellStyle: { textAlign: "right" }
        },
        {
            field: "input",
            headerName: "輸入 input",
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            valueFormatter: (params) => params.value || "請輸入",
            // valueParser: (params) => { },        // 處理輸入的數據格式
            // valueGetter: (params) => { },        // 直接讀取 rowData
            // valueSetter: (params) => { 輸入檢查 },        // 直接寫入 rowData
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            field: "date",
            headerName: "日期 date",
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agDateStringCellEditor",
            valueFormatter: (params) => params.value || "請輸入",
            // valueParser: (params) => { },        // 處理輸入的數據格式
            // valueGetter: (params) => { },        // 直接讀取 rowData
            // valueSetter: (params) => { },        // 直接寫入 rowData
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            field: "array",
            headerName: "查詢選單 Array",
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agRichSelectCellEditor",
            cellEditorParams: () => {
                return {
                    values: arrayOption.data.value,
                    searchType: "matchAny",
                    allowTyping: true,
                    filterList: true,
                    highlightMatch: true,
                    valueListMaxHeight: 200,
                };
            },
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            field: "object",
            headerName: "查詢選單 Object",
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agRichSelectCellEditor",
            cellEditorParams: () => {
                return {
                    values: Object.values(objectOption.data.value).map(({name}) => name),
                    searchType: "matchAny",
                    allowTyping: true,
                    filterList: true,
                    highlightMatch: true,
                    valueListMaxHeight: 200,
                };
            },
            valueGetter: (params) => {
                try {
                    return objectOption.data.value[params.data.object].name
                } catch(E) {
                    return params.data.objectArray
                }
            },
            valueSetter: (params) => {
                params.data.useQuery = objectOption.data.value.find(item => item.name === params.newValue).value
            },
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            field: "objectArray",
            headerName: "查詢選單 Object Array",
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agRichSelectCellEditor",
            cellEditorParams: () => {
                return {
                    values: objectArrayOption.data.value.map(({ name }) => name),
                    searchType: "matchAny",
                    allowTyping: true,
                    filterList: true,
                    highlightMatch: true,
                    valueListMaxHeight: 200,
                };
            },
            valueGetter: (params) => {
                try {
                    return objectArrayOption.data.value.find(item => item.value === params.data.objectArray).name
                } catch(E) {
                    return params.data.objectArray
                }
            },
            valueSetter: (params) => {
                params.data.objectArray = objectArrayOption.data.value.find(item => item.name === params.newValue).value
            },
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            headerName: "按鈕",
            minWidth: 320,
            maxWidth: 320,
            pinned: "right",
            lockPosition: true,
            headerComponent: "AgGridButton",
            headerComponentParams: {
                btn1: {
                    label: "新增", type: "primary", show: true, disabled: false, func: (params) => {
                        addMaseterRow(params, {
                            cell: "",
                            date: null,
                            input: "",
                            useQuery: ""
                        })
                    }
                },
                btn2: {
                    label: "存檔", type: "success", show: true, disabled: false, func: (params) => {
                        console.log(getGridData(gridApi)[0].master)
                    }
                },
            },
            cellRenderer: "AgGridButton",
            cellRendererParams:
            {
                btn1: { label: "1", type: "primary", show: true, disabled: false, func: (params) => console.log(params) },
                btn2: { label: "2", type: "success", show: true, disabled: false, func: (params) => console.log(params) },
                btn3: { label: "3", type: "warning", show: true, disabled: false, func: (params) => console.log(params) },
                btn4: { label: "4", type: "danger", show: true, disabled: false, func: (params) => console.log(params) },
                btn5: { label: "5", type: "info", show: true, disabled: false, func: (params) => console.log(params) },
                btn6: { label: "6", type: "", show: true, disabled: false, func: (params) => console.log(params) },
            },
            // cellClass: () => ""
        }
    ],
    onRowGroupOpened: (params) => { },
    onCellEditingStopped: (params) => { },
}

const detailCellRendererParams = {
    detailGridOptions: {
        ...defaultGridOptions(), // 預設 gridOptions 副本
        columnDefs: [
            {
                headerName: "detail_項次",
                field: "",
                minWidth: 70,
                maxWidth: 70,
                pinned: "left",
                headerCheckboxSelection: true, // 顯示全選框
                checkboxSelection: true, // 顯示選擇框
                cellRenderer: "agGroupCellRenderer", // 顯示 detail grid 按鈕
                valueGetter: (params) => params.node.rowIndex + 1,
                cellStyle: { textAlign: "center" },
            },
            {
                headerName: "detail_一般",
                field: "cell",
                hide: false, // 隱藏
                editable: true, // 編輯
                pinned: null, // "left" 或 "right"
                rowGroup: false, // 列作為分組鍵。
                // valueFormatter: (params) => { },     // 處理顯示的數據格式
                // valueParser: (params) => { },        // 處理輸入的數據格式
                // valueGetter: (params) => { },        // 直接讀取 rowData
                // valueSetter: (params) => { },        // 直接寫入 rowData
                // cellStyle: { textAlign: "right" }
            },
            {
                field: "input",
                headerName: "detail_輸入",
                editable: true,
                valueFormatter: (params) => params.value || "請輸入",
                // valueParser: (params) => { },        // 處理輸入的數據格式
                // valueGetter: (params) => { },        // 直接讀取 rowData
                // valueSetter: (params) => { 輸入檢查 },        // 直接寫入 rowData
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                field: "date",
                headerName: "detail_日期",
                editable: true,
                cellEditor: "agDateStringCellEditor",
                valueFormatter: (params) => params.value || "請輸入",
                // valueParser: (params) => { },        // 處理輸入的數據格式
                // valueGetter: (params) => { },        // 直接讀取 rowData
                // valueSetter: (params) => { },        // 直接寫入 rowData
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                field: "UseQuery",
                headerName: "detail_UseQuery 查詢選單",
                editable: true,
                cellEditor: "agRichSelectCellEditor",
                cellEditorParams: (params) => {
                    return {
                        values: Array.from(examplesMap.data.value).map(item => item[1].name),
                        allowTyping: true,
                        filterList: true,
                        highlightMatch: true,
                        searchType: "matchAny",
                        valueListMaxHeight: 200, //（pixel）
                    }
                },
                valueFormatter: (params) => params.value || "請選擇",
                // valueParser: (params) => { },        // 處理輸入的數據格式
                // valueGetter: (params) => { },        // 直接讀取 rowData
                // valueSetter: (params) => { },        // 直接寫入 rowData
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                field: "select",
                headerName: "detail_查詢選單",
                editable: true,
                cellEditor: "agRichSelectCellEditor",
                cellEditorParams: (params) => {
                    return {
                        values: ["選項1", "選項2", "選項3"],
                        allowTyping: true,
                        filterList: true,
                        highlightMatch: true,
                        searchType: "matchAny",
                        valueListMaxHeight: 200, //（pixel）
                    }
                },
                valueFormatter: (params) => params.value || "請選擇",
                // valueParser: (params) => { },        // 處理輸入的數據格式
                // valueGetter: (params) => { },        // 直接讀取 rowData
                // valueSetter: (params) => { },        // 直接寫入 rowData
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                headerName: "detail_按鈕",
                minWidth: 320,
                maxWidth: 320,
                pinned: "right",
                lockPosition: true,
                headerComponent: "AgGridButton",
                headerComponentParams: {
                    btn1: { label: "1", type: "primary", show: true, disabled: false, func: (params) => console.log(params) },
                },
                cellRenderer: "AgGridButton",
                cellRendererParams:
                {
                    btn1: { label: "1", type: "primary", show: true, disabled: false, func: (params) => console.log(params) },
                    btn2: { label: "2", type: "success", show: true, disabled: false, func: (params) => console.log(params) },
                    btn3: { label: "3", type: "warning", show: true, disabled: false, func: (params) => console.log(params) },
                    btn4: { label: "4", type: "danger", show: true, disabled: false, func: (params) => console.log(params) },
                    btn5: { label: "5", type: "info", show: true, disabled: false, func: (params) => console.log(params) },
                    btn6: { label: "6", type: "", show: true, disabled: false, func: (params) => console.log(params) },
                },
                // cellClass: () => ""
            }
        ],
    },
    getDetailRowData: (params) => {
        params.successCallback(params.data.details); //  動態數據
    },
    onCellEditingStopped: (params) => { },
}

const rowData = ref([
    {
        masterRowIndex: 0,
        masterRowNumber: 1,
        cell: "A cell",
        input: "",
        date: null,
        array: "A",
        object: "001",
        objectArray: "A",
    },
    // {
    //     masterRowIndex: 1,
    //     masterRowNumber: 2,
    //     cell: "B cell",
    //     input: "",
    //     date: null,
    //     objectArray: "B",
    // },
    // {
    //     masterRowIndex: 2,
    //     masterRowNumber: 3,
    //     cell: "C cell",
    //     input: "",
    //     date: null,
    //     objectArray: "C",
    // },
    // {
    //     masterRowIndex: 3,
    //     masterRowNumber: 4,
    //     cell: "D cell",
    //     input: "",
    //     date: null,
    //     objectArray: "D",
    // },
    // {
    //     masterRowIndex: 4,
    //     masterRowNumber: 5,
    //     cell: "E cell",
    //     input: "",
    //     date: null,
    //     objectArray: "E",
    // }
]);



</script>

<style lang="scss" scoped>
.agGrid {
    height: 40rem;

    :deep(.cellInput) {
        border-radius: 0.25rem;
        border: 1px solid lime;
        cursor: pointer;
    }
}
</style>