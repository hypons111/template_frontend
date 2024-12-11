import { ElMessageBox } from "element-plus";

export function getToday(): string {
  const D = new Date();
  // return `${D.getFullYear()}-${D.getMonth() + 1}-${D.getDate()}`;
  return `${D.getFullYear()}-${(D.getMonth() + 1).toString().padStart(2, '0')}-${D.getDate().toString().padStart(2, '0')}`;
}

export function getNow(): string {
  const D = new Date();
  const hours = D.getHours().toString().padStart(2, '0');
  const minutes = D.getMinutes().toString().padStart(2, '0');
  const seconds = D.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function parseDate(dateString: string): string {
  if (!dateString || dateString === "") return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function parseNumberToString(number: number, affix: string = "-"): string {
  if (!number && number !== 0) return ""
  const string = number.toString();
  const a = string.slice(0, 2);
  const b = string.slice(2, 5);
  const c = string.slice(5);
  return `${a}${affix}${b}${affix}${c}`;
}

export function parseStringToNumber(id: string, affix: string): number {
  return Number(id.replaceAll(affix, ""));
}

export function messageBoxHandler(string: string) {
  if (document.querySelector(".is-message-box")) return
  ElMessageBox.alert(string, {
    confirmButtonText: "關閉"
  });
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
