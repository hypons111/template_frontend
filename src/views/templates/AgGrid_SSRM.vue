<template>
  <ag-grid-vue
    class="agGrid"
    :gridOptions="gridOptions"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
</template>

<script setup>
import service from "@/api/service.ts";

import { agGridThemeCustomize } from "@/style/ag-theme-customize";
import AgGridButton from "@/components/agGridButton.vue";
import { localeText } from "@/settings/localeText";
import { messageBoxHandler } from "@/utils/utility";
const agGridOptions = inject("agGridOptions"); // gridOptions 預設設定
// const agGridSSROptions = inject("agGridSSROptions"); // gridOptions 預設設定

const gridOptions = {
  // ...agGridOptions, // 基本 gridOptions 設定
  // ...agGridSSROptions, // 基本 gridOptions 設定

  theme: agGridThemeCustomize, // 主題
  rowModelType: "serverSide", // 指定行模型為伺服器端行模型

  pagination: true,
  paginationPageSize: 10, // 預設每頁行數
  paginationPageSizeSelector: [10, 20, 50], // 可選行數

  rowModelType: "serverSide",
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
      const sortParam = params.request.sortModel.map(sort => `sort=${encodeURI(sort.colId)},${sort.sort}`)
      const requestData = [
        ...sortParam,
      ].join("&")

      try {
        const server = FakeServer(await service.getCountries());
        const request = {
          startRow: 0,
          endRow: 3,
          sortModel: [{ colId: "name", sort: "asc" }],
        };

console.log(requestData)
console.log(request)


        const result = server.getData(request);

        params.success({
          rowData: result.rows, // 伺服器返回數據
          rowCount: result.rows.length, // 數據總數
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        params.fail();
      }

      // try {
      //   const response = await service.getCats(requestData);
      //   if (response.success) {
      //     params.success({
      //       rowData: response.data, // 伺服器返回數據
      //       rowCount: response.data.length, // 數據總數
      //     });
      //   } else {
      //     params.fail(); // 請求失敗處理
      //   }
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   params.fail();
      // }
    },
  };
}

function FakeServer(allData) {
    alasql.options.cache = false;

    return {
        getData: function (request) {
            const results = executeQuery(request);

            return {
                success: true,
                rows: results,
                lastRow: getLastRowIndex(request),
            };
        },
    };

    function executeQuery(request) {
        const sql = buildSql(request);

        console.log('[FakeServer] - about to execute query:', sql);

        return alasql(sql, [allData]);
    }

    function buildSql(request) {
        return 'SELECT * FROM ?' + orderBySql(request) + limitSql(request);
    }

    // 修改此處：支持解析 "sort=id,asc" 格式
    function orderBySql(request) {
        if (!request.sort) return ''; // 如果沒有排序條件，直接返回空字符串

        // 將 "sort=id,asc" 拆分為列名和排序方向
        const [colId, sortDirection] = request.sort.split(',');
        if (!colId || !sortDirection) return ''; // 若解析失敗，返回空字符串

        return ` ORDER BY ${colId} ${sortDirection.toUpperCase()}`;
    }

    function limitSql(request) {
        if (request.endRow == undefined || request.startRow == undefined) {
            return '';
        }
        const blockSize = request.endRow - request.startRow;

        return ' LIMIT ' + blockSize + ' OFFSET ' + request.startRow;
    }

    function getLastRowIndex(request) {
        return executeQuery({ ...request, startRow: undefined, endRow: undefined }).length;
    }
}


// 當網格準備好時
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
