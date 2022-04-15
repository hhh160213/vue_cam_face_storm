const express = require('express')
const {Op} = require("sequelize");

const router = express.Router()
const ReqAttendModel = require('../model/req_sendattend')
const RolesModel = require('../model/rolesmodel')
const UserLogsModel = require('../model/user-logs')
const MenusModel = require('../model/menus')
const StuinfoModel = require("../model/stuinfo");
const TeainfoModel = require("../model/teainfo");
const checkemail = {} //声明一个对象缓存邮箱和验证码，留着
let sendmail = require('../utils/sendMail')


const moment = require('moment')
const AttendModel = require("../model/attend_records");

router.post('/taroteadelAttend', (req, res, next) => {

  console.log(req.body)
  let {sendattends_id} = req.body

  ReqAttendModel.findOne({
    attributes: ['sendattends_id'],
    where: {
      sendattends_id: sendattends_id
    },
  }).then(therr=>{
    console.log(therr)
    if (therr)
    {
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


    }
    else {
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
router.post('/tarojudgeAttendType', (req, res, next) => {

  console.log(req.body)
  let {dead_time,} = req.body

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
  let start_time = dateSel + " " + timeSel + ":00"
  let dead_time = enddateSel + " " + endtimeSel + ":00"
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
router.post('/tarostulocation', (req, res, next) => {

  console.log(req.body)
  let sucStuNumArr = []
  let orirespNumber
  let updatereq
  const {stu_name, stu_nick_name, stu_id, actualLoctaion, actualDistance, ATTENDID} = req.body || {};
  if (actualDistance < 1001) {


    ReqAttendModel.findOne({
      attributes: ['suc_stuname', 'resp_number'],
      where: {
        sendattends_id: Number(ATTENDID)
      },
      // transaction: t
    }).then(findall => {
      if (findall.dataValues.suc_stuname.includes(stu_nick_name)) {
        console.log('into if false')
        return res.json({
          code: 40000,
          message: `签到失败，可能已经签到过`,
          data: findall
        })

      } else {
        orirespNumber = findall.dataValues.resp_number
        sucStuNumArr.push(findall.dataValues.suc_stuname,stu_nick_name)
        let stringarr = sucStuNumArr.join(',')
        console.log(stringarr)
        orirespNumber++
        updatereq = ReqAttendModel.update({suc_stuname: stringarr, resp_number: orirespNumber},
          // { transaction: t },
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
          actualLoctaion: actualLoctaion

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
router.post('/tarosearch', (req, res, next) => {

  console.log(req.body)
  const tea_id = req.body.tea_id

  let project = ReqAttendModel.findAll({

    where: {
      tea_id: tea_id
    },

  });

  project.then(function (ReqAttend) {
    if (ReqAttend) {
      return res.send({
        code: 20000,
        message: '获取指定教师签到请求成功',
        data: ReqAttend
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
router.post('/tarosearchstu', (req, res, next) => {

  const stu_id = req.body.stu_id

  let project = ReqAttendModel.findAll({
    include: [
      {model: StuinfoModel}
    ],
    where: {
      tea_id: stu_id
    },

  });

  project.then(function (ReqAttend) {
    if (ReqAttend) {
      return res.send({
        code: 20000,
        message: '获取指定教师签到请求成功',
        data: ReqAttend
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
router.post('/tarodeloutdate',  (req, res, next) => {

  console.log(req.body)
  const tea_id = req.body.tea_id
  // await ReqAttendModel.destroy({
  //   where: {
  //     tea_id: tea_id,
  //     dead_time:{
  //       [Op.lt]: new Date(),
  //       // [Op.lt]: nowdate,
  //     }
  //   }
  // }).then(function (succ) {
  //   if (succ) {
  //     return res.send({
  //       code: 20000,
  //       message: '删除成功',
  //       data: succ
  //     })
  //   } else {
  //     return res.send({
  //       code: 40000,
  //       message: '没有签到请求可以删除',
  //       data: succ
  //     })
  //   }
  // })


  /*  let project = ReqAttendModel.findAll({
      where: {
        user_id: user_id
      },
      attributes: ['start_time', 'dead_time']

    });*/

  /*
    project.then( function (ReqAttend) {
      if (ReqAttend) {
        let fend_time
        let fend_time_unix
        let now_time_unix
          ReqAttend.map( async  (reqitem)=>{
            /!*从数据库中拿到的格式化后的截止时间*!/
            fend_time=moment(reqitem.dataValues.dead_time).format('YYYY-MM-DD HH:mm:ss')
            console.log(fend_time)
            now_time_unix=moment().unix()
            if (Number(now_time_unix)>Number(fend_time_unix))
            {





            }
          })

     /!*   return res.send({
          code: 20000,
          message: '获取指定教师签到请求成功',
          data: ReqAttend
        })*!/
      }
    })
  */

})

module.exports = router
