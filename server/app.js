const express = require('express')
const path = require('path')
const http = require('http');

const app = express()
const bodyParser = require('body-parser')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json({limit:'50mb'}));
const cors = require('cors');

app.use(bodyParser.json({
  limit: '50mb', //nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb,改为10M
  extended: true

}));
app.use(bodyParser.urlencoded({
  limit: '50mb', //nodejs 做为服务器，在传输内容或者上传文件时，系统默认大小为100kb,改为10M
  extended: true
}));



app.use(cors());
app.all('*', function(req, res, next) {
  //设为指定的域
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("X-Powered-By", ' 3.2.1');
  next();
});





const expressJwt = require('express-jwt')
const userRouter = require('./router/userRouter')
const ReqAttendRouyer = require('./router/ReqAttendRouyer')
const stuRouter = require('./router/stuRoyute')
const teaRouter = require('./router/teaRoute')
const socketRouter = require('./router/socketRoute')
const roleRouter = require('./router/roleRoutr')
const menuRouter = require('./router/menuRoute')
const locationRouter = require('./router/locaRouter')
const randomRouter = require('./router/randomRouyer')
const faceRouter = require('./router/faceRouter')
const indexrou = require('./router/index')
const logRouter = require('./router/user-logRouter')

const history = require('connect-history-api-fallback')
const bodyParse = require("express");
// app.use(express.static(path.join(__dirname, 'public')))
// app.use('public', express.static('./public'))
app.use('/public',express.static('public'));//将文件设置成静态

//解决跨域
/*app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');//允许的header类型
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //跨域允许的请求方式
  if (req.method == 'OPTIONS') {
    res.send(200);//让options尝试请求快速结束
  } else {
    next();
  }
});*/



app.get('/', (req, res) => {
  res.json({
    code: 20000,
    message: 'success into api',
  })
})

app.get('/oppt', (req, res) => {
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



app.use(history())




app.use(expressJwt({
  secret: 'express' // 签名的密钥 或 PublicKey
}).unless({
  path: [
    '/',
    '/user/login',
    '/user/infotaro',
    '/stu/uploadimage',
    '/stu/addbyxls',
    '/tea/uploadimage',
    '/tea/addteainfobyxls',
  ] // 指定路径不经过 Token 解析
}))

app.use(function(err, req, res, next) {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('401错误,token已失效')
  }

  else {
    res.status(500).send('500错误,服务器错误')

  }
})

//  使用路由 / 是路由指向名称
app.use('/user', userRouter)
app.use('/reqattend', ReqAttendRouyer)
app.use('/user-log', logRouter)
app.use('/role', roleRouter)
app.use('/menu', menuRouter)
app.use('/face', faceRouter)
app.use('/stu', stuRouter)
app.use('/tea', teaRouter)
app.use('/socketio', socketRouter)


app.use(bodyParse.json()) // 指定post请求的数据为json数据


// 配置服务端口
const port = 8002
const hostname = '127.0.0.1'
app.listen(port, hostname, () => {
  console.log(`服务器数据库已经在端口 at http://${hostname}:${port}/`)
})

