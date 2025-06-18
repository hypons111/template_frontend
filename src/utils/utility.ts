import { ElMessageBox } from "element-plus";

export function showMessageBox(string: string) {
  if (document.querySelector(".is-message-box")) return
  ElMessageBox.alert(string, {
    confirmButtonText: "關閉"
  });
}

/* 加千分位逗號
*  value : "1000" / 1000
*  return : "1,000"
*/
export function addTousandsSeparator(value: string | number) {
  if (value === "") return value;
  const num = Number(value);
  if (isNaN(num)) return value;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function downloadBase64File(Base64File: { filename: string; data: string; }) {
  const { data, filename } = Base64File;

  // Base64 解碼
  const byteCharacters = atob(data);
  const byteNumbers: number[] = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // 創建 Blob
  const blob = new Blob([byteArray], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;

  // 點擊鏈接並觸發下載
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* 產生不重覆的編號
*  isAffixed : true / false
*  return : {date: '2025-03-28', time: '16:30:36', id: '20250328163036638'} / {date: '20250328', time: '163036', id: '20250328163036638'}
*/
export function getTimestampkey(isAffixed: boolean) {
  const date = new Date();
  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');  // 月份 0-based 要 +1
  const D = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0');
  const hyphen = isAffixed ? "-" : ""
  const colon = isAffixed ? ":" : ""
  return {
    date: `${Y}${hyphen}${M}${hyphen}${D}`,
    time: `${h}${colon}${m}${colon}${s}`,
    id: `${Y}${M}${D}${h}${m}${s}${ms}`
  };
}

/* 取得現在日期和時間
*  isAffixed : true / false
*  return : {date: '2025-03-28', time: '16:29:33'} / {date: '20250328', time: '162933'}
*/
export function getDateTime(isAffixed: boolean) {
  const date = new Date();
  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');  // 月份 0-based 要 +1
  const D = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  const ms = String(date.getMilliseconds()).padStart(3, '0');
  const hyphen = isAffixed ? "-" : ""
  const colon = isAffixed ? ":" : ""
  return {
    date: `${Y}${hyphen}${M}${hyphen}${D}`,
    time: `${h}${colon}${m}${colon}${s}`,
  };
}

/* 選擇器 date 格式化
*  dateObject : Date | string
*  isAffixed : true / false
*  return : 2025-03-28 16:28:10 / 20250328 162810
*/
export function parseToDateTime(dateObject: string, infix: string, ) {
  return `${parseToDate(dateObject, true)}${infix}${parseToTime(dateObject, true)}`
}

/* 選擇器 date 格式化
*  dateObject : Date | string
*  isAffixed : true / false
*  return : 2025-03-28 / 20250328
*/
export function parseToDate(dateObject: string, isAffixed: boolean) {
  if (!dateObject || dateObject === "") return "";
  const date = new Date(dateObject);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return isAffixed 
    ? `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    : `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`
}

/* 選擇器 time 格式化
*  dateObject : Date | string
*  isAffixed : true / false
*  return : 16:28:10 / 162810
*/
export function parseToTime(dateObject: string, isAffixed: boolean) {
  if (!dateObject || dateObject === "") return "";
  const date = new Date(dateObject);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return isAffixed 
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    : `${hours}${minutes.toString().padStart(2, "0")}${seconds.toString().padStart(2, "0")}`
}

/* 計算 dateObject 是一年中第幾日
*  dateObject : Date | string
*  return : string
*/
export function parseToDayOfYear(dateObject: Date | string) {
  // 將日期字符串轉化為 Date 對象
  const date = dateObject ? new Date(dateObject) : new Date();

  // 取得當年第一天嘅 Date 對象
  const startOfYear = new Date(date.getFullYear(), 0, 1);

  // 計算差距（以毫秒為單位），再轉化為天數
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

  return dayOfYear;
}


/* CUSTOMIZE */ /* CUSTOMIZE */ /* CUSTOMIZE */
// export function parseNumberToString(number: number, affix: string = "-"): string {
//   if (!number && number !== 0) return ""
//   const string = number.toString();
//   const a = string.slice(0, 2);
//   const b = string.slice(2, 5);
//   const c = string.slice(5);
//   return `${a}${affix}${b}${affix}${c}`;
// }

// export function parseStringToNumber(id: string, affix: string): number {
//   return Number(id.replaceAll(affix, ""));
// }



//   // 取得當年第一天嘅 Date 對象
//   const startOfYear = new Date(date.getFullYear(), 0, 1);

//   // 計算差距（以毫秒為單位），再轉化為天數
//   const diff = date - startOfYear;
//   const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

//   return dayOfYear;
// }
/* CUSTOMIZE */ /* CUSTOMIZE */ /* CUSTOMIZE */



