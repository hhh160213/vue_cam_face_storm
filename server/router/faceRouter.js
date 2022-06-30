const express = require('express')
const router = express.Router()
const UsersModel = require('../model/users')
const FacesModel = require('../model/faces')
const RolesModel = require('../model/rolesmodel')
const UserLogsModel = require('../model/user-logs')
const MenusModel = require('../model/menus')
const RoleModel = require('../model/rolesmodel')
const AttendModel = require('../model/attend_records')
const ReqAttendModel = require('../model/req_sendattend')

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const StuinfoModel = require('../model/stuinfo')
const TeainfoModel = require('../model/teainfo')
const AipFace = require('baidu-aip-sdk').face

// 百度人脸识别应用的APP_ID、API_KEY、SECRET_KEY
const APP_ID = ''
const API_KEY = ''
const SECRET_KEY = ''
const client = new AipFace(APP_ID, API_KEY, SECRET_KEY)

//人脸识别部分
router.post('/matched', (req, respp, next) => {
  console.log(req.body)
  let sucStuNumArr = []
  let sucStuNumArrID = []
  let orirespNumber
  let updatereq
  const { picName, imgUrl: imgData, stu_id, stu_nick_name, ATTENDID } = req.body || {}
  // let picName=req.body.picName
  // let imgData=req.body.imgData
  // const image = fs.readFileSync(`public/images/face/${picName}.jpg`);
  //   // const image = fs.readFileSync(`../public/images/face/${picName}.jpg`);
  //   // console.log(image)
  // console.log(base64Img)
  // console.log(base64Data)

  const image = fs.readFileSync(`文件路径${picName}.jpg`)

  const base64Img = Buffer.from(image).toString('base64')
  let base64Data = imgData.replace(/\s/g, '+')
  base64Data = base64Data.replace(/^data:image\/\w+;base64,/, '')
  client.match([{
    image: base64Img,
    image_type: 'BASE64'
  }, {
    image: base64Data,
    image_type: 'BASE64',
    liveness_control: 'NORMAL',
    quality_control: 'NORMAL'
  }]).then((res) => {
    console.log(res)
    // console.log(res.result.face_list)
    console.log(res.result)

    if (res.error_code === 0 && res.error_msg === 'SUCCESS') {
      let facve_score = res.result.score
      if (facve_score >= 85) {
        ReqAttendModel.findOne({
          where: {
            sendattends_id: Number(ATTENDID)
          }
        }).then(findall => {
          if (findall.dataValues.suc_stuid.includes(stu_id.toString())) {
            console.log('into if false')
            return respp.json({
              code: 40000,
              message: `签到失败，可能已经签到过`,
              data: findall
            })

          } else {
            orirespNumber = findall.dataValues.resp_number
            sucStuNumArr.push(findall.dataValues.suc_stuname, stu_nick_name)
            sucStuNumArrID.push(findall.dataValues.suc_stuid,stu_id)
            let stringarr = sucStuNumArr.join(',')
            let stringarrid = sucStuNumArrID.join(',')
            console.log(stringarr)
            console.log(stringarrid)
            orirespNumber++
            updatereq = ReqAttendModel.update({
                suc_stuname: stringarr,
                resp_number: orirespNumber,
                suc_stuid: stringarrid
              },
              {
                where: {
                  sendattends_id: Number(ATTENDID)
                }
              })
            let attresult = AttendModel.create({
              stu_id: stu_id,
              stu_name: picName,
              attend_type: '人脸识别签到',
              stu_nick_name: stu_nick_name,
              sendattends_id: Number(ATTENDID),
            })
            attresult.then(ret => {
              if (ret) {
                respp.json({
                  code: 20000,
                  message: '人脸识别通过，签到成功',
                  data: ret
                })
              }
            })

          }

        })

      } else {
        respp.json({
          code: 40000,
          message: '人脸识别阈值过低，请确认是否是本人',
          data: null
        })
      }
    } else if (res.error_code == 222207 || res.error_code == 223106) {
      respp.json({
        code: 40000,
        message: '识别失败，请确认人脸库中是否存在对应的图片！',
        data: null

      })
    } else if (res.error_code == 223120 || res.error_code == 223119) {
      respp.json({
        code: 40000,
        message: '活体检测没有通过，请确认本人进行签到',
        data: null

      })
    } else if (res.error_code == 223122 || res.error_code == 223123 || res.error_code == 223124 || res.error_code == 223125 || res.error_code == 223126 || res.error_code == 223127 || res.error_code == 223129 || res.error_code == 223113 || res.error_code == 223114 || res.error_code == 223115 || res.error_code == 223116 || res.error_code == 223121) {
      respp.json({
        code: 40000,
        message: '人脸不完整或光线不佳，请重试',
        data: null

      })
    } else if (res.error_code == 222202 || res.error_code == 222203 || res.error_code == 222204) {
      respp.json({
        code: 40000,
        message: '没有检测到人脸，请重试',
        data: null

      })
    } else if (res.error_code == 223123 || res.error_code == 223124) {
      respp.json({
        code: 40000,
        message: '人脸检测阈值过低！请重试',
        data: null

      })
    }

  })

})

router.post('/list', (req, res, next) => {
  AttendModel.findAll({
    where: req.query
  }).then(function(tea_stu) {
    return res.json({
      code: 20000,
      message: '获取全部学生信息签到信息成功',
      data: tea_stu
    })
  })
})

router.post('/detaildo', (req, res, next) => {

  const sendattends_id = req.body.sendattends_id

  console.log(req.body)
  let project = AttendModel.findAll({
    include: [
      {model: ReqAttendModel}
    ],
    where: {
      sendattends_id: Number(sendattends_id)
    },

  });

  project.then(function (ReqAttend) {
    if (ReqAttend) {
      return res.send({
        code: 20000,
        message: '获取签到请求消息详情成功face',
        data: ReqAttend
      })
    } else {
      return res.send({
        code: 40000,
        message: '获取签到请求失败',
        data: '签到id不存在'
      })
    }
  })

})



//通过post方式stu_id获取单个学生的api
router.post('/infoed', (req, res, next) => {
  console.log(req.body)
  if (req.body.page <= 0) {
    req.body.page = 1
  }
  if (req.body.limit > 50) {
    req.body.limit = 50

  }
  let create_time = {}
  if (req.body.date && req.body.date.length === 2) {
    create_time =
     {
        [Op.between]: req.body.date
      }

  }
  const offset = (req.body.page - 1) * req.body.limit

  const stu_id = req.body.stu_id
  let project = AttendModel.findAndCountAll({
    offset: offset || 0,
    limit: parseInt(req.body.limit) || 5,
    order: [['create_time', 'DESC']],

    where: {
      stu_id: stu_id,
      create_time
    },


  })
  project.then(function(tea_stu) {
    if (tea_stu !== null) {
      // let stuarr = [tea_stu]
      return res.json({
        code: 20000,
        message: '获取学生签到记录成功',
        data: {

          total: tea_stu.count,
          realArrdata: tea_stu.rows

        }
      })
    } else {
      return res.json({
        code: 40000,
        message: '获取单个学生信息失败',
        data: '该学生id不存在'
      })
    }
  })
})

module.exports = router
