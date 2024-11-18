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
        minWidth: 70,
        maxWidth: 70,
        pinned: "left",
        lockPosition: true,
        headerCheckboxSelection: true, // 表頭是否顯示全選框
        checkboxSelection: (params) => params.data.name !== "禁用選擇", // 是否顯示單元格選擇框
        valueGetter: (params) => params.node.rowIndex + 1,
        cellStyle: { textAlign: "center" },
    },
    {
        headerName: "一般",
        field: "",
        hide: false, // 是否隱藏
        editable: true, // 是否編輯
        pinned: null, // "left" 或 "right"
        lockPinned: true, // 鎖定位置
        resizable: true, // 是否可調整列寬
        suppressMenu: true, // 是否禁用右鍵菜單

        cellRenderer: (params) => `<b>${params.value}</b>`, // 自定義單元格內容
        cellEditor: "agTextCellEditor", // 單元格編輯器
        valueFormatter: (params) => `名稱: ${params.value}`, // 格式化顯示的數據
        valueGetter: (params) => params.data.name.toUpperCase(), // 自定義數據獲取方式
        valueSetter: (params) => {
            params.data.name = params.newValue.toLowerCase();
            return true; // 設置成功返回 true
        },
        headerClass: "custom-header-class", // 自定義表頭樣式
        cellClass: (params) => (params.value.length > 5 ? "long-text" : "short-text"), // 動態樣式
        cellStyle: { color: "blue", textAlign: "center" }, // 單元格樣式
    },
    {
        headerName: "按鈕",
        minWidth: 400,
        maxWidth: 400,
        pinned: "right",
        lockPosition: true,
        cellRenderer: "AgGridCellButton",
        cellRendererParams:
        {
            btn1: { label: "1", type: "primary", func: (params) => console.log(params), show: false, disabled: false },
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
}
</style>