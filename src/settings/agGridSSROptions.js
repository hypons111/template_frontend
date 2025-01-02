export const agGridOptions = {
  rowModelType: 'serverSide', // 使用伺服器端行模型
  cacheBlockSize: 100, // 每次向伺服器請求的數據筆數
  maxBlocksInCache: 2, // 緩存的數據區塊數量上限，超過上限時最舊的區塊會被移除

  pagination: true, // 啟用分頁模式
  paginationPageSize: 10, // 分頁模式下每頁顯示的筆數
  blockLoadDebounceMillis: 100, // 延遲加載數據防止快速滾動時多次觸發加載

  // 每行的高度，影響網格的可視行數
  rowHeight: 3, // 默認為 25，這裡設置為每行高度 30px

  // 控制伺服器端加載的數據範圍
  serverSideStoreType: 'partial', // 默認為 'partial'，僅加載當前需要的數據

  // 視窗內外預加載的行數，用於平滑滾動
  rowBuffer: 5, // 默認為 10，這裡設置為預加載 5 行

  // 是否抑制初始數據加載
  suppressServerSideInitialLoad: false, // 默認為 false，自動加載數據

  // 無數據時顯示的模板
  overlayNoRowsTemplate: '<span>沒有數據顯示</span>', // 自訂顯示的 HTML 模板

  // 允許用戶選擇網格內的文字（例如複製數據）
  enableCellTextSelection: true, // 默認為 false，不允許選擇文字
};
