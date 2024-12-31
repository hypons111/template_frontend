export const agGrid = {
  /* 取得新 master rorIndex , rowNumber */
  getMasterLength: (params) => {
    let length = 0; // 初始化行數
    params.api.forEachNode(node => {
      if (!node.detail) { // 如果是 Master 行
        length++; // 行數加 1
      }
    });
    return {
      masterRowIndex: length, // 返回 Master index
      masterRowNumber: length + 1// 返回 Master number
    }
  },

  /* 停止編輯 */
  stopEditAll: (gridApi) => {
    gridApi.stopEditing(); // 停止 Master Grid 編輯模式
    gridApi.forEachNode((node, index) => {
      const detailGridInfo = gridApi.getDetailGridInfo(`detail_${node.id}`); // 取得 Detail node
      detailGridInfo?.api.stopEditing(); // 停止 Detail Grid 編輯模式
    });
  },

  /* 確保只有一個 detail 展開 */
  ensureSingleNodeExpended: (gridApi, event) => {
    if (event.node && event.node.master && event.node.expanded) {
      const rowId = event.node.id;
      gridApi.forEachNode(node => {
        if (node.id === rowId) {
          node.setExpanded(true);
        } else {
          node.setExpanded(false);
        }
      })
    }
  },

  /* grid 取得資料 */
  getGridData: (gridApi) => {
    agGrid.stopEditAll(gridApi); // 停止編輯
    const gridData: any[] = []; // 初始化 grid 資料陣列
    gridApi.forEachNode((node) => {
      const masterData = { ...node.data }; // 收集 Master 行資料
      const detailGridInfo = gridApi.getDetailGridInfo(`detail_${node.id}`); // 取得 detailGridInfo
      if (detailGridInfo) { // 如果有 detailGridInfo
        const detailsData: any[] = []; // 初始化 Detail 資料陣列
        detailGridInfo.api.forEachNode((detailNode) => {
          detailsData.push(detailNode.data); // 收集 Detail 行資料
        });
        masterData.details = detailsData; // 將 Detail 資料加到 Master 資料
      }
      gridData.push(masterData); // 將 Master 資料添加到 grid 資料
    });
    return gridData; // 返回全部 Master + Detail 資料
  },

  /* master 取得行資料 */
  getMasterRowData: (gridApi, masterRowIndex) => {
    agGrid.stopEditAll(gridApi); // 停止編輯
    const masterRowData = { ...gridApi.getDisplayedRowAtIndex(masterRowIndex).data }; // 取得指定 Master 行
    const detailGridInfo = gridApi.getDetailGridInfo(`detail_${masterRowIndex}`); // 取得指定 Detail 資料
    if (detailGridInfo) { // 如果有 detailGridInfo
      const detailsData: any[] = []; // 初始化 Detail 資料
      detailGridInfo.api.forEachNode((detailNode) => {
        detailsData.push(detailNode.data); // 收集 Detail 行資料
      });
      masterRowData.details = detailsData; // 將 Detail 資料附加到 Master 行資料
      return masterRowData; // 返回完整行資料
    } else {
      return masterRowData; // 如果無 Detail Grid，直接返回 Master 行資料
    }
  },

  /* master 新增行  */
  addMaseterRow: (gridApi, params, columns = {}) => {
    const { masterRowIndex, masterRowNumber } = agGrid.getMasterLength(params)
    const newRecord = {
      ...columns, // 合併自定義資料
      ...{
        originalIndex: masterRowIndex,
        masterRowIndex: masterRowIndex, // 設置行 index
        masterRowNumber: masterRowNumber, // 設置行 number
        newRow: true, // 標記為新行
      }
    };
    gridApi.applyTransaction({ add: [newRecord] }); // 添加新行到 Master Grid
  },

  /* master 刪除行  */
  deleteMasterRow: (gridApi, paramsData) => {
    /* 刪除指定行 */
    gridApi.applyTransaction({ remove: [paramsData] });

    /* 更新行 index 和 number */
    const updatedNodes: any[] = []; // 初始化更新行陣列
    gridApi.forEachNode((node, index) => {
      node.data.masterRowIndex = index; // 更新行 index
      node.data.masterRowNumber = index + 1; // 更新行 number
      updatedNodes.push(node); // 收集更新後嘅行
    });
    gridApi.refreshCells({
      rowNodes: updatedNodes, // 更新後的資料
      columns: ['masterRowIndex', 'masterRowNumber'], // 刷新指定列
      force: true, // 強制刷新
    });
  },

  /* detail 取得行資料 */
  getDetailRowData: (gridApi, paramsData) => {
    agGrid.stopEditAll(gridApi); // 停止編輯
    return paramsData
  },

  /* detail 新增行 */
  addDetailrRow: (gridApi, params, columns = {}) => {
    if (params.node && !params.node.expanded) { // 如果 Detail Grid 未展開
      params.node.setExpanded(true); // 展開 Detail Grid
      setTimeout(() => {
        agGrid.addDetailrRow(gridApi, params, columns); // 延遲遞歸調用
      }, 250);
      return;
    }

    let data: any = {};
    if (params.data) { // cell button
      data = params.data;
    } else if (params.displayName) { // header button (記得使用 onRowGroupOpened 關閉其他 node)
      gridApi.forEachNode(node => {
        if (node.expanded) data = node.data; // 取得展開的行的嘅資料 
        return;
      });
    }

    const detailRowIndex = data.details.length; // 取得新 Detail 行 index
    const detailRowNumber = data.details.length + 1; // 取得新 Detail 行 number
    const newRecord = {
      ...columns, // 合併自定義資料
      ...{
        masterRowIndex: data.masterRowIndex, // 關聯 Master 行 index
        masterRowNumber: data.masterRowNumber, // 關聯 Master 行 number
        detailRowIndex: detailRowIndex, // 設置 Detail 行 index
        detailRowNumber: detailRowNumber, // 設置 Detail 行 number
        newRow: true, // 標記為新行
      }
    };

    // const detailGridInfo = gridApi.getDetailGridInfo(`detail_${data.masterRowIndex}`); // 取得指定 Detail 資料

    let i = 0
    let detailGridInfo = gridApi.getDetailGridInfo(`detail_${i}`)
    while(!detailGridInfo) {
      i ++
      detailGridInfo = gridApi.getDetailGridInfo(`detail_${i}`)
    }

    detailGridInfo.api.applyTransaction({ add: [newRecord] }); // 添加新行到 Detail Grid
    const masterNode = gridApi.getRowNode(data.masterRowIndex); // 取得指定 Master 行
    if (masterNode && masterNode.data.details) {
      masterNode.data.details.push(newRecord); // 添加新 Detail 行到 Master 行資料
    } else if (masterNode) {
      masterNode.data.details = [newRecord]; // 初始化 Detail 資料
    }
  },

  /* detail 刪除行 */
  deleteDetailRow: (gridApi, paramsData) => {
    const masterRowIndex = paramsData.masterRowIndex; // 取得 Master 行索引
    const detailGridInfo = gridApi.getDetailGridInfo(`detail_${masterRowIndex}`); // 取得對應 Detail Grid 信息
    detailGridInfo.api.applyTransaction({ remove: [paramsData] }); // 刪除 Detail 行
    const masterNode = gridApi.getDisplayedRowAtIndex(masterRowIndex); // 取得對應 Master 行

    if (masterNode && masterNode.data.details) {
      masterNode.data.details.splice(paramsData.detailRowIndex, 1); // 更新 Master 行 Detail 資料
    }

    const updatedNodes: any[] = [];
    detailGridInfo.api.forEachNode((node, index) => {
      node.data.detailRowIndex = index; // 更新 Detail 行索引
      node.data.detailRowNumber = index + 1; // 更新 Detail 行序號
      updatedNodes.push(node); // 收集更新後的行
    });

    detailGridInfo.api.refreshCells({
      rowNodes: updatedNodes, // 刷新更新後嘅行
      columns: ['detailRowIndex', 'detailRowNumber'], // 刷新指定列
      force: true, // 強制刷新
    });
  },
}