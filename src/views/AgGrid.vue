<template>
    <section v-if="objectArrayOption.data.value">
        <ag-grid-vue class="agGrid" :grid-options="gridOptions" :detailCellRendererParams="detailCellRendererParams"
            :rowData="rowData" @grid-ready="onGridReady" />
    </section>
</template>

<script setup>import { useQuery } from "@tanstack/vue-query";
import { arrayData, objectData, objectArrayData } from "@/utils/useQuery";
import {
    getGridData,
    getMasterRowData,
    addMaseterRow,
    deleteMasterRow,
    addDetailrRow,
    deleteDetailRow,
    ensureSingleNodeExpended
} from "@/utils/agGrid"
import { nextTick } from "vue";
const defaultGridOptions = inject("defaultGridOptions");

const arrayOption = useQuery(arrayData);
const objectOption = useQuery(objectData);
const objectArrayOption = useQuery(objectArrayData);

const gridApi = ref();

const gridOptions = {
    ...defaultGridOptions(), // 基本 gridOptions 設定
    columnDefs: [
        {
            headerName: "項次",
            field: "masterRowNumber",
            minWidth: 80,
            maxWidth: 80,
            pinned: "left",
            headerCheckboxSelection: true, // 顯示全選框
            checkboxSelection: true, // 顯示選擇框
            cellRenderer: "agGroupCellRenderer", // 顯示 detail grid 按鈕
            cellStyle: { textAlign: "center" },
        },
        {
            headerName: "Cell",
            field: "cell",
            // flex" 1,
            // minWidth: 120,
            // maxWidth: 120,
            pinned: null, // "left" 或 "right"
            editable: false, // 編輯
            rowGroup: false, // 列作為分組鍵。
            hide: false, // 隱藏
            // valueFormatter: (params) => { },     // 處理顯示的數據格式
            // valueParser: (params) => { },        // 處理輸入的數據格式
            // valueGetter: (params) => { },        // 直接讀取 rowData
            // valueSetter: (params) => { },        // 直接寫入 rowData
            // cellStyle: { textAlign: "right" }
        },
        {
            headerName: "Input",
            field: "input",
            // flex" 1,
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            valueFormatter: (params) => params.value || "請輸入",
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            headerName: "Date",
            field: "date",
            // flex" 1,
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agDateStringCellEditor",
            valueFormatter: (params) => params.value || "請輸入",
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            headerName: "選單 Array",
            field: "array",
            // flex" 1,
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
            headerName: "選單 Object",
            field: "object",
            // flex" 1,
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agRichSelectCellEditor",
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
                        const option = objectOption.data.value[key]
                        return `[${option.id}] ${option.name}`
                    }
                }
            },
            valueSetter: (params) => {
                const id = params.newValue.slice(1, 4)
                params.data.object = objectOption.data.value[id].value
            },
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            headerName: "選單 Object Array",
            field: "objectArray",
            // flex" 1,
            // minWidth: 120,
            // maxWidth: 120,
            editable: true,
            cellEditor: "agRichSelectCellEditor",
            cellEditorParams: () => {
                return {
                    values: objectArrayOption.data.value.map(({ id, name }) => `[${id}] ${name}`),
                    searchType: "matchAny",
                    allowTyping: true,
                    filterList: true,
                    highlightMatch: true,
                    valueListMaxHeight: 200,
                };
            },
            valueFormatter: (params) => {
                for (let option of objectArrayOption.data.value) {
                    if (option.value === params.value) {
                        return `[${option.id}] ${option.name}`
                    }
                }
            },
            valueSetter: (params) => {
                const newValueId = params.newValue.slice(1, 4)
                params.data.objectArray = objectArrayOption.data.value.find(({ id }) => id === newValueId).value
            },
            cellClass: "cellInput",
            // cellStyle: { textAlign: "right" }
        },
        {
            headerName: "按鈕",
            minWidth: 430,
            maxWidth: 430,
            pinned: "right",
            lockPosition: true,
            headerComponent: "AgGridButton",
            headerComponentParams: {
                btn1: {
                    label: "Get Grid Data", type: "success", show: true, disabled: false, func: (params) => {
                        console.log(getGridData(gridApi.value))
                    }
                },
                btn2: {
                    label: "Add Master Row", type: "primary", show: true, disabled: false, func: (params) => {
                        addMaseterRow(gridApi.value, params, {
                            cell: `New Master Row`,
                            date: null,
                            input: "",
                            array: "A",
                            object: "A",
                            objectArray: "A",
                            details: [],
                        })
                    }
                },
            },
            cellRenderer: "AgGridButton",
            cellRendererParams:
            {
                btn1: { label: "Get Row Data", type: "success", show: true, disabled: false, func: (params) => console.log(getMasterRowData(gridApi.value, params.data.masterRowIndex)) },
                btn2: {
                    /*  註 : [Add Detail Row] 按鈕放在 master cell 時在 onRowGroupOpened() 「不使用」 ensureSingleNodeExpended() */
                    label: "Add Detail Row", type: "primary", show: true, disabled: false, func: (params) => addDetailrRow(gridApi.value, params, {
                        cell: "New Detail Row",
                        date: null,
                        input: "",
                        array: "A",
                        object: "A",
                        objectArray: "A",
                        newRow: true
                    })
                },
                btn3: { label: "Delete Row", type: "danger", show: true, disabled: false, func: (params) => deleteMasterRow(gridApi.value, params.data) },
                // btn1: { label: "1", type: "primary", show: true, disabled: false, func: (params) => console.log(params) },
                // btn2: { label: "2", type: "success", show: true, disabled: false, func: (params) => console.log(params) },
                // btn3: { label: "3", type: "warning", show: true, disabled: false, func: (params) => console.log(params) },
                // btn4: { label: "4", type: "danger", show: true, disabled: false, func: (params) => console.log(params) },
                // btn5: { label: "5", type: "info", show: true, disabled: false, func: (params) => console.log(params) },
                // btn6: { label: "6", type: "", show: true, disabled: false, func: (params) => console.log(params) },
            },
            // cellClass: () => ""
        }
    ],
    onGridReady: (params) => gridApi.value = params.api,
    onRowGroupOpened: (event) => {
        /*  註 : [Add Detail Row] 按鈕放在 detail header 時「使用」ensureSingleNodeExpended() */
        /*  註 :  [Add Detail Row] 按鈕放在 master cell 時「不使用」ensureSingleNodeExpended() */
        ensureSingleNodeExpended(gridApi.value, event)
    },
    // onCellEditingStopped: (params) => {},
    // onCellValueChanged: (params) => {},
}

const detailCellRendererParams = {
    detailGridOptions: {
        ...defaultGridOptions(), // 基本 gridOptions 設定
        columnDefs: [
            {
                headerName: "項次",
                field: "detailRowNumber",
                minWidth: 70,
                maxWidth: 70,
                pinned: "left",
                headerCheckboxSelection: true, // 顯示全選框
                checkboxSelection: true, // 顯示選擇框
                cellStyle: { textAlign: "center" },
            },
            {
                headerName: "Cell",
                field: "cell",
                // flex" 1,
                // minWidth: 120,
                // maxWidth: 120,
                hide: false, // 隱藏
                editable: false, // 編輯
                pinned: null, // "left" 或 "right"
                rowGroup: false, // 列作為分組鍵。
                // cellStyle: { textAlign: "right" }
            },
            {
                headerName: "Input",
                field: "input",
                // flex" 1,
                // minWidth: 120,
                // maxWidth: 120,
                editable: true,
                valueFormatter: (params) => params.value || "請輸入",
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                headerName: "Date",
                field: "date",
                // flex" 1,
                // minWidth: 120,
                // maxWidth: 120,
                editable: true,
                cellEditor: "agDateStringCellEditor",
                valueFormatter: (params) => params.value || "請輸入",
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                headerName: "選單 Array",
                field: "array",
                // flex" 1,
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
                headerName: "選單 Object",
                field: "object",
                // flex" 1,
                // minWidth: 120,
                // maxWidth: 120,
                editable: true,
                cellEditor: "agRichSelectCellEditor",
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
                            const option = objectOption.data.value[key]
                            return `[${option.id}] ${option.name}`
                        }
                    }
                },
                valueSetter: (params) => {
                    const id = params.newValue.slice(1, 4)
                    params.data.object = objectOption.data.value[id].value
                },
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                headerName: "選單 Object Array",
                field: "objectArray",
                // flex" 1,
                // minWidth: 120,
                // maxWidth: 120,
                editable: true,
                cellEditor: "agRichSelectCellEditor",
                cellEditorParams: () => {
                    return {
                        values: objectArrayOption.data.value.map(({ id, name }) => `[${id}] ${name}`),
                        searchType: "matchAny",
                        allowTyping: true,
                        filterList: true,
                        highlightMatch: true,
                        valueListMaxHeight: 200,
                    };
                },
                valueFormatter: (params) => {
                    for (let option of objectArrayOption.data.value) {
                        if (option.value === params.value) {
                            return `[${option.id}] ${option.name}`
                        }
                    }
                },
                valueSetter: (params) => {
                    const newValueId = params.newValue.slice(1, 4)
                    params.data.objectArray = objectArrayOption.data.value.find(({ id }) => id === newValueId).value
                },
                cellClass: "cellInput",
                // cellStyle: { textAlign: "right" }
            },
            {
                headerName: "按鈕",
                minWidth: 190,
                maxWidth: 190,
                pinned: "right",
                lockPosition: true,
                headerComponent: "AgGridButton",
                headerComponentParams: {
                    btn1: {
                        /*  註 : [Add Detail Row] 按鈕放在 detail header 時在 onRowGroupOpened() 「使用」 ensureSingleNodeExpended() */
                        label: "Add Detail Row", type: "primary", show: true, disabled: false, func: (params) => addDetailrRow(gridApi.value, params, {
                            cell: "New Detail Row",
                            date: null,
                            input: "",
                            array: "A",
                            object: "A",
                            objectArray: "A",
                        })
                    }
                },
                cellRenderer: "AgGridButton",
                cellRendererParams:
                {
                    btn1: { label: "Delete Detail Row", type: "danger", show: true, disabled: false, func: (params) => deleteDetailRow(gridApi.value, params.data) },
                    // btn1: { label: "1", type: "primary", show: true, disabled: false, func: (params) => console.log(params) },
                    // btn2: { label: "2", type: "success", show: true, disabled: false, func: (params) => console.log(params) },
                    // btn3: { label: "3", type: "warning", show: true, disabled: false, func: (params) => console.log(params) },
                    // btn4: { label: "4", type: "danger", show: true, disabled: false, func: (params) => console.log(params) },
                    // btn5: { label: "5", type: "info", show: true, disabled: false, func: (params) => console.log(params) },
                    // btn6: { label: "6", type: "", show: true, disabled: false, func: (params) => console.log(params) },
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
        cell: "Master A",
        input: "",
        date: null,
        array: "A",
        object: "A",
        objectArray: "A",
        details: [
            // {
            //     masterRowIndex: 0,
            //     masterRowNumber: 1,
            //     detailRowIndex: 0,
            //     detailRowNumber: 1,
            //     cell: "Detail a",
            //     input: "",
            //     date: null,
            //     array: "A",
            //     object: "A",
            //     objectArray: "A",
            // },
            // {
            //     masterRowIndex: 0,
            //     masterRowNumber: 1,
            //     detailRowIndex: 1,
            //     detailRowNumber: 2,
            //     cell: "Detail b",
            //     input: "",
            //     date: null,
            //     array: "B",
            //     object: "B",
            //     objectArray: "B",
            // },
            // {
            //     masterRowIndex: 0,
            //     masterRowNumber: 1,
            //     detailRowIndex: 2,
            //     detailRowNumber: 3,
            //     cell: "Detail c",
            //     input: "",
            //     date: null,
            //     array: "C",
            //     object: "C",
            //     objectArray: "C",
            // }
        ]
    },
    {
        masterRowIndex: 1,
        masterRowNumber: 2,
        cell: "Master B",
        input: "",
        date: null,
        array: "B",
        object: "B",
        objectArray: "B",
        details: [
            {
                masterRowIndex: 1,
                masterRowNumber: 2,
                detailRowIndex: 0,
                detailRowNumber: 1,
                cell: "Detail a",
                input: "",
                date: null,
                array: "A",
                object: "A",
                objectArray: "A",
            },
            {
                masterRowIndex: 1,
                masterRowNumber: 2,
                detailRowIndex: 1,
                detailRowNumber: 2,
                cell: "Detail b",
                input: "",
                date: null,
                array: "B",
                object: "B",
                objectArray: "B",
            },
            {
                masterRowIndex: 1,
                masterRowNumber: 2,
                detailRowIndex: 2,
                detailRowNumber: 3,
                cell: "Detail c",
                input: "",
                date: null,
                array: "C",
                object: "C",
                objectArray: "C",
            }
        ]
    },
    {
        masterRowIndex: 2,
        masterRowNumber: 3,
        cell: "Master C",
        input: "",
        date: null,
        array: "C",
        object: "C",
        objectArray: "C",
        details: []
    },
    {
        masterRowIndex: 3,
        masterRowNumber: 4,
        cell: "Master D",
        input: "",
        date: null,
        array: "D",
        object: "D",
        objectArray: "D",
        details: []
    },
    {
        masterRowIndex: 4,
        masterRowNumber: 5,
        cell: "Master E",
        input: "",
        date: null,
        array: "E",
        object: "E",
        objectArray: "E",
        details: []
    }
]);

</script>

<style lang="scss" scoped>
:deep(.agGrid) {
    height: 100%;

    .cellInput {
        border-radius: 0.25rem;
        cursor: pointer;
        border: 1px solid magenta;
    }
}
</style>