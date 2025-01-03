<template>
  <ag-grid-vue
    class="agGrid"
    :gridOptions="gridOptions"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
</template>

<script setup>
import service from "@/api/service.ts";

const agGridOptions = inject("agGridOptions"); // gridOptions 預設設定

const gridOptions = {
  ...agGridOptions, // 基本 gridOptions 設定
  rowModelType: "serverSide", // 指定行模型為伺服器端行模型
  cacheBlockSize: 10, // 與 paginationPageSize 保持一致
  maxBlocksInCache: 1,

  columnDefs: [
    { headerName: "ID", field: "id", sortable: true },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Capital", field: "capital", sortable: true },
    { headerName: "Currency", field: "currency", sortable: true },
    { headerName: "Abbreviation", field: "abbreviation", sortable: true },
  ],
};

// 創建伺服器數據源
function createServerSideDatasource() {
  return {
    getRows: async (params) => {
      const startRow = params.request.startRow; // 起始行，例如 20
      const endRow = params.request.endRow;     // 結束行，例如 40
      const page = startRow / 20 + 1;
      const size = endRow - startRow

      const filterParam = []
      const sortParam = params.request.sortModel.map(sort => `sort=${encodeURI(sort.colId)},${sort.sort}`)
      const requestData = [
        // ...filterParam,
        ...sortParam,
        // `page=${page}`,
        // `size=${size}`,
      ].join("&")

      const {success, error, data} = await service.getCountries(requestData);
      if (success) {
        params.success({
          rowData: data, 
          rowCount: data.length,
        });
      } else {
        console.log(error)
        params.fail();
      }

    },
  };
}

const onGridReady = (params) => {
  const datasource = createServerSideDatasource(); // 創建數據源
  params.api.setGridOption("serverSideDatasource", datasource);
};
</script>

<style lang="scss" scoped>
.agGrid {
  height: 100%;

  :deep(.cellInput) {
    border-radius: 0.25rem;
    cursor: pointer;
    border: 1px solid var(--MAGENTA);
  }
}
</style>
