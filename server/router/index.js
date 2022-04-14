const express = require('express')
const router = express.Router()



router.get('/', (req, res, next) => {
  res.json({
    status: 200,
    data: '请求成功'
  })
})

router.get('/data', (req, res, next) => {
  res.json({
    status: 200,
    data: [1, 2, 3, 4, 5, 6, 7]
  })
})


router.get('/oppt', (req, res) => {
  res.json({
    code: 20000,
    message: 'success into api',
    "status": 0,
    "msg": "ok",
    "result": {
      "start": "哈尔滨",
      "end": "北京",
      "date": "2021-10-15",
      "list": [
        {
          "trainno": "G922",
          "type": "G",
          "typename": "高铁",
          "station": "哈尔滨西",
          "endstation": "北京朝阳",
          "departuretime": "07:09",
          "arrivaltime": "13:14",
          "costtime": "6小时5分",
          "trainno12306": "",
          "distance": 0,
          "day": 1,
          "isend": 1,
          "sequenceno": 1,
          "priceed": 550.5,
          "priceyd": 878.5,
          "pricesw": "-",
          "pricetd": "-",
          "pricerz": "-",
          "priceyz": "-",
          "pricegr1": "-",
          "pricegr2": "-",
          "pricerw1": "-",
          "pricerw2": "-",
          "priceyw1": "-",
          "priceyw2": "-",
          "priceyw3": "-",
          "pricewz": "-",
          "priceqt": "-",
          "pricedw": "-",
          "pricedw1": "-"
        },
        {
          "trainno": "G924",
          "type": "G",
          "typename": "高铁",
          "station": "哈尔滨西",
          "endstation": "北京朝阳",
          "departuretime": "07:47",
          "arrivaltime": "13:22",
          "costtime": "5小时35分",
          "trainno12306": "",
          "distance": 0,
          "day": 1,
          "isend": 1,
          "sequenceno": 1,
          "priceed": 574.5,
          "priceyd": 917.5,
          "pricesw": 1801.5,
          "pricetd": "-",
          "pricerz": "-",
          "priceyz": "-",
          "pricegr1": "-",
          "pricegr2": "-",
          "pricerw1": "-",
          "pricerw2": "-",
          "priceyw1": "-",
          "priceyw2": "-",
          "priceyw3": "-",
          "pricewz": "-",
          "priceqt": "-",
          "pricedw": "-",
          "pricedw1": "-"
        },






      ]

    }
  })
})

module.exports = router
