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
export function getGridData(gridApi) {
  stopEditing(gridApi);
  const gridData: any[] = []
  gridApi.value.forEachNode((node) => {
    const masterData = { ...node.data };
    const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${node.id}`);
    if (detailGridInfo) {
      const detailsData = [];
      detailGridInfo.api.forEachNode((detailNode) => {
        detailsData.push(detailNode.data);
      });
      masterData.details = detailsData;
    }

    gridData.push(masterData);
  });

  return gridData;
}

/* master 取得行資料 */
export function getMasterRow(gridApi, masterRowIndex) {
  stopEditing(gridApi)
  const masterNode = gridApi.value.getDisplayedRowAtIndex(masterRowIndex);
  const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${masterRowIndex}`);
  if (detailGridInfo) {
    const detailsData = [];
    detailGridInfo.api.forEachNode((detailNode) => {
      detailsData.push(detailNode.data);
    });
    masterNode.data.details = detailsData;
    return masterNode.data
  } else {
    return masterNode.data
  }
}

/* master 新增行  */
export function addMaseterRow(gridApi, params, columns = {}) {
  const masterRowIndex = getNewRowIndex(params);
  const masterRowNumber = getNewRowIndex(params) + 1;
  const newRecord = {
    ...columns,
    ...{
      masterRowIndex: masterRowIndex,
      masterRowNumber: masterRowNumber,
      newRow: true,
    }
  }
  gridApi.value.applyTransaction({ add: [newRecord] });
}

/* master 刪除行  */
export function deleteMasterRow(gridApi, paramsData) {
  gridApi.value.applyTransaction({ remove: [paramsData] });
  const updatedNodes: any[] = [];
  gridApi.value.forEachNode((node, index) => {
    node.data.masterRowIndex = index;
    node.data.masterRowNumber = index + 1;
    updatedNodes.push(node);
  });
  gridApi.value.refreshCells({
    rowNodes: updatedNodes,
    columns: ['masterRowIndex', 'masterRowNumber'],
    force: true,
  });
}

/* detail 取得行的資料 */
export function getDetailRow(gridApi, masterRowIndex, detailRowIndex) {
  stopEditing(gridApi)
  const masterNode = gridApi.value.getDisplayedRowAtIndex(masterRowIndex);
  const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${masterRowIndex}`);
  const detailsData = [];
  detailGridInfo.api.forEachNode((detailNode) => {
    detailsData.push(detailNode.data);
  });
  masterNode.data.details = detailsData;
  return masterNode.data.details[detailRowIndex]
}

/* detail 新增行 */
export function addDetailrRow(gridApi, params, columns = {}) {

  const detailRowIndex = getNewRowIndex(params);
  const detailRowNumber = detailRowIndex + 1;
  const displayedRow = params.api.getDisplayedRowAtIndex(0)
  let data: any = {};

  if (params.data) {
    data = params.data
  } else if(displayedRow) {
    data = displayedRow.data
  } else {
    gridApi.value.forEachNode(node => {
      if (node.expanded) data = node.data
      return
    })
  }

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

  const masterNode = gridApi.value.getDisplayedRowAtIndex(data.masterRowIndex);
  if (masterNode && masterNode.data.details) {
    masterNode.data.details.push(newRecord); // 添加新 Detail Row 到 Master Row 的數據中
  } else if (masterNode) {
    masterNode.data.details = [newRecord]; // 如果 `details` 不存在，初始化
  }
}

/* detail 刪除行 */
export function deleteDetailRow(gridApi, paramsData) {
  const masterRowIndex = paramsData.masterRowIndex
  const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${masterRowIndex}`);

  detailGridInfo.api.applyTransaction({ remove: [paramsData] });
  const masterNode = gridApi.value.getDisplayedRowAtIndex(masterRowIndex);
  if (masterNode && masterNode.data.details) {
    masterNode.data.details = masterNode.data.details.filter((detail) => detail !== paramsData);
  }

  const updatedNodes: any[] = [];
  detailGridInfo.api.forEachNode((node, index) => {
    node.data.detailRowIndex = index;
    node.data.detailRowNumber = index + 1;
    updatedNodes.push(node);
  });

  detailGridInfo.api.refreshCells({
    rowNodes: updatedNodes,
    columns: ['detailRowIndex', 'detailRowNumber'],
    force: true,
  });
}

