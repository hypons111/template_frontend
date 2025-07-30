const selectStaticOptions = {
  "labelOptions" : {
    "isOn": "開關",
    "has": "有無",
    "dragonball": "Static Select"
  },
  "isOn": [
    { "label": "啟用", "value": true },
    { "label": "停用", "value": false }
  ],
  "has": [
    { "label": "有", "value": true },
    { "label": "無", "value": false }
  ],
  "dragonball": [
    { "label": "Goku [Saiyan]", "value": 1 },
    {"label": "Vegeta [Saiyan]", "value": 2 },
    {"label": "Piccolo [Namekian]", "value": 3 },
    {"label": "Bulma [Human]", "value": 5 },
    {"label": "Freezer [Frieza Race]", "value": 5 },
    {"label": "Zarbon [Frieza Race]", "value": 6 },
    {"label": "Dodoria [Frieza Race]", "value": 7 },
    {"label": "Ginyu [Frieza Race]", "value": 8 },
    {"label": "Celula [Android]", "value": 9 },
    {"label": "Gohan [Saiyan]", "value": 10 }
  ]
} as any

export default selectStaticOptions