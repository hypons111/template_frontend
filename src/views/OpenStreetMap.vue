<template>
  <div class="container">
    <div class="panel">
      <el-form :model="form" :rules="rules" ref="ruleFormRef" label-position="top">
        <el-row :gutter="35">
          <Input :label="'Tag名稱'" :inputType="''" :prop="'label'" v-model="form.label" />
        </el-row>
        <el-row :gutter="35">
          <Input :label="'緯度'" :inputType="'decimal'" v-model="form.latitude" :prop="'latitude'" />
        </el-row>
        <el-row :gutter="35">
          <Input :label="'經度'" :inputType="'decimal'" v-model="form.longitude" :prop="'longitude'" />
        </el-row>
      </el-form>

      <el-row :gutter="35">
        <ButtonGroup
          :verticalAlign="'right'"
          :buttons="[
            { label: 'primary', type: 'primary', plain: false, round: false, show: true, disabled: false, func: () => addTag() },
            { label: 'danger', type: 'danger', plain: false, round: false, show: true, disabled: false, func: () => addSquare() },
          ]"
        />
      </el-row>
    </div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

const form = reactive({
  label: "",
  latitude: 25.0478,
  longitude: 0, // 121.5319
});
const ruleFormRef = ref();
const rules = reactive({
    normal: [{ required: true, message: "請輸入", trigger: "change" }],
});

const map = ref(null) // map dom
const mapEntity = ref(null) // map 實體，控制地圖行為（視角、縮放、拖動）

const geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

function initialMap() {
  mapEntity.value = leaflet.map(map.value).setView([25.0478, 121.5319], 16)
  leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 20,
  }).addTo(mapEntity.value)

  /* mouse left click event listener */
  mapEntity.value.on('click', (e) => {
    console.log(`${e.latlng.lng}, ${e.latlng.lat}`);
  });
}

function addSquare() {
  const states = [
    {
      "type": "Feature",
      "properties": {
        "name": "台北車站"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [121.51424718424458, 25.048460351468478]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "捷運信義線"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [121.51424718424458, 25.048460351468478],
          [121.51338667403061, 25.04866203692835],
          [121.51340543905087, 25.049096996007677],
          [121.51340811976806, 25.04917475389279],
          [121.51339739689935, 25.0493885878225],
          [121.52065153882974, 25.047969501131583],
          [121.52228292331726, 25.047891742482044],
          [121.52421482599989, 25.047813983783218],
          [121.52537396760947, 25.047600147107087],
          [121.5267906962434, 25.047250231741714],
          [121.53069743277936, 25.046103279931742],
          [121.53082622629152, 25.046725356821185],
          [121.53082622629152, 25.046939195023015],
          [121.52996760287701, 25.047716785340292],
          [121.52887285802355, 25.049116435483565],
          [121.52820742487728, 25.050205041214355],
          [121.52782104434075, 25.05123531987718],
          [121.52749906056036, 25.052615490931288],
          [121.52788336782713, 25.070731224801893],
          [121.52784043665638, 25.07098389313455],
          [121.52764724638813, 25.07137261262852],
          [121.52730379702234, 25.071780766769326],
          [121.52573680929089, 25.073724339254895],
          [121.52544258996085, 25.07412276780458],
          [121.52532459465259, 25.074443453256652],
          [121.52543186311463, 25.074832161769617],
          [121.52547477049947, 25.07532776333413],
          [121.52537822888358, 25.075648445630527],
          [121.52504569665126, 25.076639640146002],
          [121.52519587249813, 25.076833991070902],
          [121.52541040942224, 25.0769700365348],
          [121.52556058526912, 25.077174104447163]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "大安森林公園"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [121.52543019263184, 25.07718868071363],
          [121.5253604681315, 25.07756766303203],
          [121.52546237317041, 25.077781447412082],
          [121.52551600740146, 25.0781215581565],
          [121.52551064397838, 25.078539407206254],
          [121.52523710940015, 25.07924877558329],
          [121.52502793589915, 25.079506285004694],
          [121.52524783624632, 25.07961317554887],
          [121.52512984093806, 25.080385699888755],
          [121.52529610705426, 25.080492589665095],
          [121.52559645874797, 25.08008446456247],
          [121.52585390305693, 25.07997271578519],
          [121.52620252555862, 25.079705490034595],
          [121.52620252555862, 25.079574306270864],
          [121.5268300460616, 25.079345949013497],
          [121.52688368029263, 25.079496567677875],
          [121.52698022190843, 25.079462557027924],
          [121.52709821721672, 25.07978322849494],
          [121.52716794171705, 25.079773511190083],
          [121.52737711521806, 25.080259375487326],
          [121.52752192764183, 25.08019621323775],
          [121.52679786552298, 25.07824302605054],
          [121.52691586083121, 25.07829647188574],
          [121.52699094875464, 25.07824302605054],
          [121.52676568498437, 25.078014666310075],
          [121.52639024536718, 25.07771342514984],
          [121.52630443059753, 25.077601674208356],
          [121.52624006952028, 25.07753851058765],
          [121.52625615978961, 25.077499640651013],
          [121.5260416228655, 25.07695060147777],
          [121.52539801209319, 25.077169245691305]
        ]]
      }
    }
  ];
  L.geoJSON(states, {
    style: function(feature) {
      switch (feature.properties.party) {
        case 'Republican': return {color: "#ff0000"};
        case 'Democrat':   return {color: "#0000ff"};
      }
    }
  }).addTo(mapEntity.value);
}

function addTag() {
  leaflet.marker([form.latitude, form.longitude])
    .addTo(mapEntity.value)
    .bindPopup(form.label)
    .openPopup()
  mapEntity.value.panTo([form.latitude, form.longitude], 16)
}

onMounted(() => {
  initialMap()
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}

.panel {
  width: 20%;
  height: 100%;
  padding: 0 1rem;
}

.map {
  width: 80%;
  height: 100%
}
</style>