function getNewRowIndex(params) {
  let masterRowLength = 0;
  params.api.forEachNode(node => {
    if (!node.detail) {
      masterRowLength++;
    }
  });
  return masterRowLength
}
function stopEditing(gridApi) {
  gridApi.value.stopEditing()
  gridApi.value.forEachNode((node, index) => {
    const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${node.id}`);
    detailGridInfo?.api.stopEditing()
  })
}



/* master 取得資料 */
export function getMasterData(gridApi) {
  stopEditing(gridApi);
  const gridData = [];

  gridApi.value.forEachNode((node) => {
    const masterData = { ...node.data };

    // 檢查是否有 Detail Grid
    const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${node.id}`);
    if (detailGridInfo) {
      const detailsData = [];
      detailGridInfo.api.forEachNode((detailNode) => {
        detailsData.push(detailNode.data); // 收集 Detail Grid 嘅數據
      });
      masterData.details = detailsData; // 將 Detail Grid 數據加入主表數據
    }

    gridData.push(masterData); // 添加主表數據
  });

  return gridData; // 返回包含 Master 和 Detail 嘅完整數據
}

/* master 取得行資料 */
export function getMasterRow(gridApi, masterRowIndex) {
  stopEditing(gridApi)
  const masterNode = gridApi.value.getDisplayedRowAtIndex(masterRowIndex);
  const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${masterRowIndex}`);
  const detailsData = [];
  detailGridInfo.api.forEachNode((detailNode) => {
    detailsData.push(detailNode.data); // 收集 Detail Grid 嘅數據
  });
  masterNode.data.details = detailsData; // 將 Detail Grid 數據加入主表數據
  return masterNode.data
}

/* master 新增行  */
export function addMaseterRow(gridApi, params, columns = {}) {
  const rowIndex = getNewRowIndex(params);
  const rowNumber = getNewRowIndex(params) + 1;
  const newRecord = {
    ...columns,
    ...{
      masterRowIndex: rowIndex,
      masterRowNumber: rowNumber,
      newRow: true,
    }
  }
  gridApi.value.applyTransaction({ add: [newRecord] });
}

/* master 刪除行  */
export function deletemasterRow(gridApi, data) {
  gridApi.value.applyTransaction({ remove: [data] });
  const updatedNodes:any[] = [];
  gridApi.value.forEachNode((node, index) => {
    node.data.masterRowIndex = index;
    node.data.masterRowNumber = index + 1;
    updatedNodes.push(node);
  });
  gridApi.value.refreshCells({
    rowNodes: updatedNodes, // 刷新這些行
    columns: ['masterRowIndex', 'masterRowNumber'], // 刷新指定列
    force: true, // 強制刷新
  });

}




/* detail 取得行資料 */
export function getDetailData(gridApi) {
  const gridData: any[] = []
  gridApi.value.stopEditing()
  gridApi.value.forEachNode((node, index) => {
    const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${node.id}`);
    detailGridInfo?.api.stopEditing()
    gridData.push(node.data)
  })
  return gridData
}

/* detail 取得行的資料 */
export function getDetailRow(gridApi, masterRowIndex, detailRowIndex) {
  const masterNode = gridApi.value.getDisplayedRowAtIndex(masterRowIndex);
  return masterNode.data.details[detailRowIndex]
}

/* detail 新增行 */
export function addDetailrRow(gridApi, params, columns = {}) {
  const detailRowIndex = getNewRowIndex(params);
  const detailRowNumber = detailRowIndex + 1;
  const data = params.api.getDisplayedRowAtIndex(0).data
  const newRecord = {
    ...columns,
    ...{
      masterRowIndex: data.masterRowIndex,
      masterRowNumber: data.masterRowNumber,
      detailRowIndex: detailRowIndex,
      detailRowNumber: detailRowNumber,
      newRow: true,
    }
  }
  const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${data.masterRowIndex}`);
  detailGridInfo.api.applyTransaction({ add: [newRecord] });
}

/* detail 刪除行 */
export function deleteDetailRow(gridApi, data) {
  gridApi.value.applyTransaction({ remove: [data] });
}

