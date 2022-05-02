const express = require('express')
const { Op } = require('sequelize')

const router = express.Router()
const ReqAttendModel = require('../model/req_sendattend')
const RolesModel = require('../model/rolesmodel')
const UserLogsModel = require('../model/user-logs')
const MenusModel = require('../model/menus')
const StuinfoModel = require('../model/stuinfo')
const TeainfoModel = require('../model/teainfo')
const checkemail = {} //声明一个对象缓存邮箱和验证码，留着
let sendmail = require('../utils/sendMail')

const moment = require('moment')
const AttendModel = require('../model/attend_records')

/*
* 教师通过id删除一条固定的签到请求
* */
router.post('/taroteadelAttend', (req, res, next) => {

  console.log(req.body)
  let { sendattends_id } = req.body

  ReqAttendModel.findOne({
    attributes: ['sendattends_id'],
    where: {
      sendattends_id: sendattends_id
    }
  }).then(therr => {
    console.log(therr)
    if (therr) {
      ReqAttendModel.delSingleId(sendattends_id).then(ReqAttend => {
        console.log(ReqAttend)
        if (ReqAttend) {
        } else {
          return res.json({
            code: 20000,
            message: `成功删除签到请求`,
            data: ReqAttend
          })
        }
      })

    } else {
      return res.json({
        code: 40000,
        message: `删除失败，请重试,该签到Id不存在`,
        data: '----'
      })
    }

  })

  ReqAttendModel.delSingleId(sendattends_id).then(ReqAttend => {
    if (!ReqAttend) {
      return res.json({
        code: 40000,
        message: `删除失败，请重试`,
        data: ReqAttend
      })
    } else {
      return res.json({
        code: 20000,
        message: `成功删除签到请求`,
        data: ReqAttend
      })
    }
  })

})

/*
* 教师新增一条签到
* */
router.post('/taroadd', (req, res, next) => {
  //{
  //   tea_id: 3003,
  //   user_name: 'lph1022',
  //   user_nick_name: '刘鹏华',
  //   timeSel: '15:33',
  //   endtimeSel: '18:33',
  //   dateSel: '2022-01-01',
  //   attendTypeCheck: '人脸签到'
  // }
  console.log(req.body)
  let {
    tea_id,
    user_name,
    user_nick_name,
    timeSel,
    endtimeSel,
    dateSel,
    attendTypeCheck,
    enddateSel,
    reasonlocation,
    reasonLongTi,
    reasonLati
  } = req.body
  let start_time = dateSel + ' ' + timeSel + ':00'
  let dead_time = enddateSel + ' ' + endtimeSel + ':00'
  start_time = moment(start_time).format('YYYY-MM-DD HH:mm:ss')
  dead_time = moment(dead_time).format('YYYY-MM-DD HH:mm:ss')
  tea_id = Number(tea_id)
  let addparam = {
    tea_id, user_name, user_nick_name, start_time, dead_time, attendTypeCheck, reasonlocation, reasonLongTi, reasonLati
  }
  console.log(addparam)
  ReqAttendModel.create(addparam).then(ReqAttend => {
    if (!ReqAttend) {
      return res.json({
        code: 40000,
        message: `发布失败，请重试`,
        data: ReqAttend
      })

    } else {
      return res.json({
        code: 20000,
        message: `教师${user_nick_name}发布一条课堂签到请求`,
        data: ReqAttend
      })
    }

  })

  // let project = ReqAttendModel.findOne({
  //   where: {
  //     tea_id: addparam.tea_id
  //   },
  //
  // });
  // project.then( async function (ReqAttend) {
  //   if (ReqAttend===null)
  //   {
  //     await
  //   }
  //   else if(ReqAttend){
  //
  //     return res.json({
  //       code: 40000,
  //       message: '发布失败,当前只能存在一条签到，请先删除后重试！',
  //       data: ReqAttend
  //     })
  //   }
  // })

})

/*
* 学生响应教师发出的地理签到
* */

router.post('/tarostulocation', (req, res, next) => {

  console.log(req.body)
  let orisucstuidarr = []
  let sucStuNumArr = []
  let sucStuIDArr = []
  let orirespNumber
  let updatereq
  const { stu_name, stu_nick_name, stu_id, actualLoctaion, actualDistance, ATTENDID } = req.body || {}
  if (actualDistance < 1001) {

    ReqAttendModel.findOne({
      where: {
        sendattends_id: Number(ATTENDID)
      }
      // transaction: t
    }).then(findall => {
      // console.log(findall.dataValues)
      // orisucstuidarr.push(findall.dataValues.suc_stuid)
      if (findall.dataValues.suc_stuid.includes( (stu_id.toString()))) {
        console.log('into if false')
        return res.json({
          code: 40000,
          message: `签到失败，可能已经签到过`,
          data: findall
        })

      } else {
        orirespNumber = findall.dataValues.resp_number
        sucStuNumArr.push(findall.dataValues.suc_stuname, stu_nick_name)
        sucStuIDArr.push( ( findall.dataValues.suc_stuid), (stu_id))
        // sucStuIDArr.push( {suc_stuid:Number(findall.dataValues.suc_stuid)},{suc_stuid: Number(stu_id)})
        console.log(sucStuIDArr)
        let stringarr = sucStuNumArr.join(',')
        let stringIdarr = sucStuIDArr.join(',')
        console.log(stringIdarr)
        // console.log(stringarr)
        orirespNumber++

        updatereq = ReqAttendModel.update({
            suc_stuname: stringarr,
            resp_number: orirespNumber,
            suc_stuid:stringIdarr
          },
          {
            where: {
              sendattends_id: Number(ATTENDID)
            }
          })
        let attresult = AttendModel.create({
          stu_id: stu_id,
          stu_name: stu_name,
          attend_type: '地理位置签到',
          stu_nick_name: stu_nick_name,
          actualLoctaion: actualLoctaion,
          sendattends_id: Number(ATTENDID)

        })

        return res.json({
          code: 20000,
          message: `签到成功`,
          updatereq,
          attresult
        })
      }
    })

  }
  if (actualDistance > 1002) {
    res.json({
      code: 40000,
      message: '签到失败,请在规定的范围内进行签到！',
      data: 'none'
    })
  }

})

/*
* 教师查询自己发布的签到请求
* */
router.post('/tarosearch', (req, res, next) => {

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
  const tea_id = req.body.tea_id

  let project = ReqAttendModel.findAndCountAll({
    offset: offset || 1,
    limit: parseInt(req.body.limit) || 5,
    order: [['dead_time', 'DESC']],
    where: {
      tea_id: tea_id
    }

  })

  project.then(function(ReqAttend) {
    if (ReqAttend) {
      return res.send({
        code: 20000,
        message: '获取指定教师签到请求成功',
        data: {
          total:ReqAttend.count,
          Arrdata:ReqAttend.rows,


        }
      })
    } else {
      return res.send({
        code: 40000,
        message: '获取教师签到请求失败',
        data: '该教师id不存在'
      })
    }
  })

})


/*
* 查看某条签到请求的详情学生签到记录
* */

router.post('/TeaGetStudetailAttendDo', (req, res, next) => {

  const sendattends_id = req.body.sendattends_id

  console.log(req.body)
  if (req.body.page <= 0) {
    req.body.page = 1
  }
  if (req.body.limit > 50) {
    req.body.limit = 50

  }

  const offset = Number( (req.body.page - 1) * req.body.limit)
  let project = ReqAttendModel.findAndCountAll({
    include: [
      { model: AttendModel ,
        offset: offset || 0,
        limit: parseInt(req.body.limit) || 3,
      },

    ],
    where: {
      sendattends_id: Number(sendattends_id)
    },


  })

  project.then(function(ReqAttend) {
    if (ReqAttend) {
      return res.send({
        code: 20000,
        message: '获取签到请求消息详情成功ReqAttend',
        data: {

          total: ReqAttend.rows[0].attend_records.length,
          rowsdatalength: ReqAttend.rows.length,
          // rowsgth: ReqAttend,
          detaildatarecord: ReqAttend.rows[0].attend_records,
          rowsdata: ReqAttend.rows,

        }
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

/*
* 得到所有total
* */

router.post('/TeaGetStudetailAttendDoTotal', (req, res, next) => {

  const sendattends_id = req.body.sendattends_id

  console.log(req.body)


  let project = ReqAttendModel.findAndCountAll({
    include: [
      { model: AttendModel
      },

    ],
    where: {
      sendattends_id: Number(sendattends_id)
    },


  })

  project.then(function(ReqAttend) {
    if (ReqAttend) {
      // ReqAttend.count===1?ReqAttend.count=0:ReqAttend.count
      return res.send({
        code: 20000,
        message: '获取签到请求消息详情成功ReqAttend',
        data: {
          total:ReqAttend.rows[0].attend_records.length,
          Attendtotal:ReqAttend.count,
          alldata:ReqAttend,

        }
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


/*
* 判断是否存在，已经签到，已经签到就直接拦截路由不做跳转
* */
router.post('/tarojudgeifexist', (req, res, next) => {

  console.log(req.body)
  const { stu_id, ATTENDID } = req.body

  ReqAttendModel.findOne({
    where: {
      sendattends_id: Number(ATTENDID)
    }
  }).then(findone => {
    console.log(findone)
    if (findone===''||findone===undefined||findone===null){
      return res.json({
        code: 40000,
        message: `系统出错,没有该条签到记录！`,
        data: findone
      })
    }
    if (findone.dataValues.suc_stuid.includes(stu_id.toString())) {
      return res.json({
        code: 40000,
        message: `已经签到过,无需进行签到`,
        data: findone
      })

    }



    else {
      return res.json({
        code: 20000,
        message: `即将进行签到操作`,
        data: findone
      })

    }
  })

})


module.exports = router
