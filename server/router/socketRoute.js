const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const Allmodel = require('../model/Allmodel')
const cors = require("cors")

const path = require("path");
const fs = require("fs");
const sqlQuery = require("../model/config");
//
// const http = require('http');
// const app = express()
// app.use(cors());
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server
//   , {
//   cors: {
//     origin: "http://localhost:10086",
//     methods: ["GET", "POST"],
//   }
// }
// )
//
// io.on("connection", (socket) => {
//   console.log(`User Connected: ID - ${socket.id}`);
//
//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined into room ${data}`);
//   });
//
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });
//
//
// const port = 7002
// const hostname = '127.0.0.1'
// server.listen(port,hostname,()=>{
//   console.log(`socket服务已经启动 running at http://${hostname}:${port}/`)
// });

const expressWs = require("express-ws");
const app = express();
expressWs(app);  //将 express 实例上绑定 websock 的一些方法
app.ws("/socketTest", function (ws, req) {
  ws.send("你连接成功了");
  ws.on("message", function (msg) {
    console.log(`receive message from client ${msg}`)

    ws.send('response a  response')
  });

  // close 事件表示客户端断开连接时执行的回调函数
  ws.on('close', function (e) {
    console.log('close connection')
  })
});
app.listen(7002);
console.log("Listening expressWs on port http://127.0.0.1:7002/...");

//通过post方式stu_id获取单个的api
router.post('/info', (req, res, next) => {
  const tea_id = req.body.tea_id
  let project = TeainfoModel.findOne({
    attributes: {exclude: ['password']},
    include: [
      {model: StuinfoModel}
    ],
    where: {
      tea_id: tea_id

    }
  });
  project.then(function (tea_stu) {
    if (tea_stu !== null) {


      let stuarr = [tea_stu]
      return res.json({
        code: 20000,
        message: '获取单个教师信息成功',
        data: stuarr
      })
    } else {
      return res.json({
        code: 400,
        message: '获取单个学生信息失败',
        data: '该学生id不存在'
      })
    }
  })
})

//获取全部学教师的apui
router.post('/list', (req, res, next) => {
  TeainfoModel.findAll({
    attributes: {exclude: ['password']},
    include: [
      {model: StuinfoModel}
    ],
    where: req.query
  }).then(function (tea_stu) {
    return res.json({
      code: 20000,
      message: '获取全部教师信息成功',
      data: tea_stu
    })
  })
})






router.post('/uploadimage', (req, res, next) => {


  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8' // 编码
  form.keepExtensions = true // 保留扩展名
  form.uploadDir = path.join(__dirname, '../public/images/face') //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.parse(req, (err, fileds, files) => { // 解析 formData 数据
    console.log(fileds) //{ name: 'stua' }
    console.log(files)
    if (err) return next(err)
    modiuid = fileds.mystu_id
    username = fileds.name //用户名 用于修改用户头像路径
    console.log(username)  //stua
    let oldPath = files.file.filepath //获取文件路径 ~/public/images/<随机生成的文件名>.<扩展名>
    console.log(oldPath)   /*D:\Develop\face_recog\1219express\vue-element-admin-express\server\public\images\face\cbfd9c53d3071f2d3cfaddc00
n.jpg*/
    let imgname = files.file.originalFilename //前台上传时的文件名 也就是文件原本的名字
    console.log(imgname)   //D:\Develop\face_recog\1219express\vue-element-admin-express\server\public\images\face\cbfd9c53d3071f2d3cfaddc00
// n.jpg
    let userImgname = imgname.replace(/[^.]+/, username) //把扩展名前的文件名给替换掉
    console.log(userImgname)  //stua.jpg
    sinaname = "http://127.0.0.1:8002/public/images/face/" + userImgname
    console.log(sinaname)
    //我这里为了方便存储 统一将文件名改为 <用户名>.jpg
    let newPath = path.join(path.dirname(oldPath), userImgname)
    console.log(newPath) //D:\Develop\face_recog\1219express\vue-element-admin-express\server\public\images\face\stua.jpg
    fs.rename(oldPath, newPath, async (err) => {
      if (err) return next(err)


    })

  })
  const sturesult = TeainfoModel.updateImage(sinaname, modiuid)
  sturesult.then(function (student) {
    if (student !== true) {
      return res.json({
        code: 40000,
        message: '教师图片上传失败',
        data: student
      })
    }
    return res.json({
      code: 20000,
      message: '教师上传图片成功',
      data: student
    })
  }).catch(e => {
    return e
  })
})

module.exports = router
