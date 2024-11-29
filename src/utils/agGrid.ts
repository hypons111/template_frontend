export function getMasterRowLength(params) {
  let masterRowLength = 0;
  params.api.forEachNode(node => {
    if (!node.detail) {
      masterRowLength++;
    }
  });
  return masterRowLength
}

export function addMaseterRow(params, columns = {}) {
  const rowIndex = getMasterRowLength(params);
  const rowNumber = getMasterRowLength(params) + 1;
  const newRecord = {
    ...columns, 
    ...{
      masterRowIndex: rowIndex,
      masterRowNumber: rowNumber,
      newRow: true,
    }
  }
  params.api.applyTransaction({ add: [newRecord] });
}

export function getGridData(gridApi) {
  const gridData: any[] = []
  gridApi.value.stopEditing()
  gridApi.value.forEachNode((node, index) => {
    const detailGridInfo = gridApi.value.getDetailGridInfo(`detail_${node}`);
    detailGridInfo?.api.stopEditing()
    gridData.push({
      master: node.data,
      detail: {}
    })
  })
  return gridData
}
