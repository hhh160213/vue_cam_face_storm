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
console.log("Websockt服务已经启动在端口port http://127.0.0.1:7002/...");







module.exports = router
