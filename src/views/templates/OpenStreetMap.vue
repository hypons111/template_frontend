<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';

// 經緯度及標記內容
const latitude = ref(22.3964); // 預設香港中心
const longitude = ref(114.1095);
const popupText = ref('香港中心');

// 地圖對象
let map;

// 添加標記功能
const initialMap = () => {
  map = L.map('map').setView([25.054, 121.55], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const textMarker  = L.divIcon({
    className: 'text-marker', // 自定義樣式
    html: `<span>名稱: 地點 A <br> 地址:  台北市信義區</span>`, // 顯示的文字
    iconSize: [150, 0], // 彈出框尺寸
  });

  // 添加標記
  const marker = L.marker([25.054, 121.55], {icon: textMarker}).addTo(map);

  marker.options.info = { id: 1, name: '地點 A', address: '台北市信義區' };


  map.on('zoom', () => {
  const zoomLevel = map.getZoom(); // 獲取當前縮放級別
  const scale = zoomLevel / 13; // 基於初始縮放比例 (13 級)

  // 動態調整標記內容的縮放比例
  document.querySelectorAll('.text-marker span').forEach((el) => {
    console.log(el.style)
    el.style.transform = `scale(100)`; // 使用 CSS Transform 縮放
    // el.style.transform = `scale(${scale})`; // 使用 CSS Transform 縮放
    el.style.transformOrigin = 'center'; // 縮放原點設為中心
  });
});

  // 綁定點擊事件
  // marker.on('click', function (event) {
  //   const markerData = this.options.info
  //   alert(`名稱: ${marterData.name}\n地址:  ${marterData.address}`); // 彈出提示框（可替換為其他操作）
  //   console.log(this)
  //   console.log(marterData)
  // });

  // 綁定彈出框（選用）
  // marker.bindPopup('<b>台北市</b><br>點擊標記可以執行操作！').openPopup();
};

// 初始化地圖
onMounted(() => {
  initialMap()
});
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
  border: 2px solid var(--LIME);

  // :deep(.text-marker) {
  //   color: red;
  //   height:fit-content !important;
  //   background-color: white;
  //   border: 2px solid magenta;
  // }
}
</style>