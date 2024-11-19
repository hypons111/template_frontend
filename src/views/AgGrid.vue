<template>
    <section>
        <ag-grid-vue class="agGrid" :grid-options="gridOptions" :columnDefs="columnDefs" :rowData="rowData"
            @grid-ready="onGridReady" />
    </section>
</template>

<script setup>
const gridOptions = inject("gridOptions");

const columnDefs = ref([
    {
        headerName: "項次",
        field: "masterRowNumber",
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
        headerName: "一般",
        field: "",
        // minWidth: 120,
        // maxWidth: 120,
        hide: false, // 隱藏
        editable: true, // 編輯
        pinned: null, // "left" 或 "right"
        rowGroup: false, // 列作為分組鍵。
        /* 
            rowData(數據源)
            ↓↑
            Getter(讀取) / Setter(寫入) (邏輯處理)
            ↓↑
            Formatter(顯示) / Parser(輸入) (格式化)
            ↓↑
            格 (Grid)
        */
        valueFormatter: (params) => { },     // 處理顯示的數據格式
        valueParser: (params) => { },        // 處理輸入的數據格式
        valueGetter: (params) => { },        // 直接讀取 rowData
        valueSetter: (params) => { },        // 直接寫入 rowData
    },
    {
        field: "input",
        headerName: "輸入",
        // minWidth: 120,
        // maxWidth: 120,
        editable: true,
        valueFormatter: (params) => params.value || "請輸入",
        // valueParser: (params) => { },        // 處理輸入的數據格式
        // valueGetter: (params) => { },        // 直接讀取 rowData
        // valueSetter: (params) => { },        // 直接寫入 rowData
        cellClass: "cellInput",
        // cellStyle: { textAlign: "right" }
    },
    {
        field: "date",
        headerName: "日期",
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
        field: "select",
        headerName: "選單",
        // minWidth: 120,
        // maxWidth: 120,
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
        headerName: "按鈕",
        minWidth: 320,
        maxWidth: 320,
        pinned: "right",
        lockPosition: true,
        cellRenderer: "AgGridCellButton",
        cellRendererParams:
        {
            btn1: { label: "1", type: "primary", func: (params) => console.log(params), show: true, disabled: false },
            btn2: { label: "2", type: "success", func: (params) => console.log(params), show: true, disabled: false },
            btn3: { label: "3", type: "warning", func: (params) => console.log(params), show: true, disabled: false },
            btn4: { label: "4", type: "danger", func: (params) => console.log(params), show: true, disabled: false },
            btn5: { label: "5", type: "info", func: (params) => console.log(params), show: true, disabled: false },
            btn6: { label: "6", type: "", func: (params) => console.log(params), show: true, disabled: false },
        },
        cellClass: () => "buttonCell"
    }
])

const rowData = ref([
    { name: "A" },
    { name: "B" },
    { name: "C" },
    { name: "D" },
    { name: "E" },
    { name: "F" },
    { name: "G" },
]);

const gridApi = ref();
const onGridReady = (params) => {
    gridApi.value = params.api;
};

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