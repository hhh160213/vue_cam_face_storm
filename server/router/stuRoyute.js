const express = require('express')
var formidable = require('formidable')
var sqlQuery = require('../model/config')

const router = express.Router()

const moment = require("moment")

const StuinfoModel = require('../model/stuinfo')
const Tea_StuModel = require('../model/teaandstu')
const TeainfoModel = require('../model/teainfo')
const ReqAttendModel = require('../model/req_sendattend')

// const Stuinfoall = require('../model/all')
// const Teainfoall = require('../model/all')
const multer = require("multer");
const path = require("path")
const Allmodel = require('../model/Allmodel')

const sequelize = require("../model/init");
const UsersModel = require("../model/users");
const UsresRolesModel = require("../model/usersandroles");
const ReqMOdel = require("../model/req_sendattend");
const crypto = require("crypto");
var XLSX = require('xlsx');


const fs = require('fs');
const bodyParser = require('body-parser');
const AipFace = require('baidu-aip-sdk').face;
const {json} = require('body-parser');

//通过post方式stu_id获取单个学生的api
router.post('/info', (req, res, next) => {
  const stu_id = req.body.stu_id
  let project = StuinfoModel.findOne({
    attributes: {exclude: ['password']},
    include: [
      {model: TeainfoModel}

    ],
    where: {
      stu_id: stu_id
    }
  });
  project.then(function (tea_stu) {
    if (tea_stu !== null) {


      let stuarr = [tea_stu]
      return res.json({
        code: 20000,
        message: '获取单个学生信息成功',
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
//通过post方式stu_id获取单个学生的api
router.post('/inforeqattend', (req, res, next) => {
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
  let project = StuinfoModel.findOne({
    attributes: {exclude: ['password']},
    include: [
      {model: TeainfoModel}

    ],
    where: {
      stu_id: stu_id
    }
  });
  project.then(function (tea_stu) {
    if (tea_stu) {
      let teaidsmany
      let reqproject
      let teadidarr=[]
      let teainfoarr = (tea_stu.dataValues.teainfos)
      teainfoarr.map((teaitem) => {
        teaidsmany = teaitem.tea_id
        teadidarr.push(teaidsmany)
        console.log(teaidsmany)
        reqproject = ReqAttendModel.findAndCountAll({
          offset: offset || 1,
          limit: parseInt(req.body.limit) || 5,
          order: [['dead_time', 'DESC']],
          where: {
            tea_id: teaidsmany
          },
        });
        reqproject.then(function (ReqAttend) {
          if (ReqAttend) {
            return res.json({
              code: 20000,
              message: '学生获取绑定教师教师签到请求成功略略略taro',
              data: {
                total:ReqAttend.count,
                Arrdata:ReqAttend.rows


              },
              teaidsmany,
              teadidarr,
            })
          } else {
            return res.json({
              code: 40000,
              message: '获取教师签到请求失败',
              data: '该教师id不存在'
            })
          }
        })
      })

    }
  })
})

router.post('/testnew', (req, res, next) => {
  const stu_id = req.body.stu_id
  let project = StuinfoModel.findOne({
    attributes: ['ran_code'],
    include: [
      {model: TeainfoModel}
    ],
    where: {
      stu_id: stu_id
    }
  });
  project.then(function (tea_stu) {
    console.log(tea_stu)
    console.log(tea_stu.dataValues)
    console.log(tea_stu.dataValues.ran_code)
    if (tea_stu !== null) {


      let stuarr = [tea_stu]
      return res.json({
        code: 20000,
        message: '获取单个学生信息成功',
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


//获取全部学学生的apui
router.post('/list', (req, res, next) => {

  // console.log(moment().format('YYYY-MM-DD '))
  console.log(moment().format(' HH:mm:ss'))

  StuinfoModel.findAll({
    attributes: {exclude: ['password']},
    include: [
      {model: TeainfoModel}
    ],
    where: req.query
  }).then(function (tea_stu) {
    return res.json({
      code: 20000,
      message: '获取全部学生信息成功',
      data: tea_stu
    })
  })
})
//获取全部学生的签到请求
router.post('/listreqattend', (req, res, next) => {

  StuinfoModel.findAll({
    attributes: {exclude: ['password']},
    include: [
      {model: ReqMOdel}
    ],
    where: req.query
  }).then(function (tea_stu) {
    return res.json({
      code: 20000,
      message: '获取全部学生信息成功',
      data: tea_stu
    })
  })
})


router.post('/tests', async (req, res, next) => {
  let sql2 = "SELECT MAX(stu_id) FROM stuinfos"
  let sqlre2 = await sqlQuery(sql2)
  console.log(sqlre2)
  // console.log(sqlre2[0].MAX(stu_id))

  let sql3 = "    SELECT PASSWORD FROM stuinfos WHERE stu_id=  (SELECT MAX(stu_id) FROM stuinfos)"
  let sqlre3 = await sqlQuery(sql3)
  console.log(sqlre3[0])
  console.log(sqlre3[0].PASSWORD)

  let sql4 = "           SELECT stu_name FROM stuinfos WHERE stu_id=    (SELECT MAX(stu_id) FROM stuinfos)"
  let sqlre4 = await sqlQuery(sql4)
  console.log((sqlre4))
  console.log((sqlre4)[0].stu_name)
})


//添加学生的api
router.post('/add', (req, res, next) => {
  console.log(req.body)
  let {
    tea_id,
    stu_name,
    stu_age,
    stu_sex,
    stu_mobile,
    stu_idcard,
    stu_oriplace,
    stu_dormitory,
    stu_email,
    stu_nick_name,
    password,
  } = req.body
  const md5 = crypto.createHash('md5')
  password = md5.update(password).digest('hex')
  console.log(password)
  //先在users表中插入一条数据
  let userresult = UsersModel.create({
    user_name: stu_name,
    user_email: stu_email,
    user_nick_name: stu_nick_name,
    password: password,
    status: 1
  })
  //user表成功插入一条数据进入promise
  userresult.then(userret => {
    // console.log(userret)
    console.log(userret.isNewRecord)
    console.log(userret._options)
    console.log(userret._options.isNewRecord)
    //如果user表插入成功被证明是一条新的记录
    if (userret._options.isNewRecord === true) {
      //user一条新的记录成功后在teainfo表插入一条新记录
      let tearesult = StuinfoModel.create({
        //teainfo表的主键通过user刚刚插入的user自动生成的user_id来动态共享
        stu_id: userret.dataValues.user_id,
        stu_name: stu_name,
        stu_email: stu_email,
        stu_nick_name: stu_nick_name,
        stu_age: stu_age,
        stu_sex: stu_sex,
        stu_mobile: stu_mobile,
        stu_idcard: stu_idcard,
        stu_oriplace: stu_oriplace,
        stu_dormitory: stu_dormitory,
        password: password,
        status: 1
      })
      tearesult.then(teare => {
        console.log(teare)
        //如果taeinfo表插入的是一条新记录而且插入成功
        if (teare._options.isNewRecord === true) {
          //把教师分配给教师角色，在user_role表中插入一条教师的id和role角色的id
          let roleresult = UsresRolesModel.create({
            role_id: 3,
            user_id: userret.dataValues.user_id,
          })
          //如果教师分配角色role_id成功
          roleresult.then(rolere => {
            //如果role插入一条新记录成功
            if (rolere._options.isNewRecord === true) {
              let tea_stuesult = Tea_StuModel.create({
                tea_id: tea_id,
                stu_id: userret.dataValues.user_id,
              })
              tea_stuesult.then(tea_stu => {
                if (tea_stu._options.isNewRecord === true) {
                  return res.json({
                    code: 20000,
                    message: '学生信息添加成功',
                    data: rolere
                  })
                } else {
                  return res.json({
                    code: 40000,
                    message: '学生信息插入失败',
                    data: null
                  })
                }
              })
            } else {
              return res.json({
                code: 40000,
                message: 'user-role表信息插入失败',
                data: null
              })
            }
          })
        } else {
          //教师表插入失败
          return res.json({
            code: 20000,
            message: '教师表插入信息失败',
            data: teare
          })
        }
      })
    } else {
      //用户表第一步就插入失败
      return res.json({
        code: 20000,
        message: '用户表插入信息失败',
        data: userret
      })
    }
  })
})

/*
* 批量添加学生  通过xls表格进行导入
* */
router.post('/addbyxls', (req, res, next) => {
  var form = new formidable.IncomingForm();
  var xlsxJson;
  form.keepExtensions = true;         // 保存后缀名
  form.encoding = 'utf-8';            // 编码方式
  form.uploadDir = 'public/tmp';      // 临时上传路径
  // fashion.js
  form.parse(req, function (err, fields, files) {
    // 重命名并修改上传文件的路径
    var sourceFileName = files.file.newFilename;
    var tempPath = files.file.filepath;
    var targetPath = 'public/xlsexcel/' + sourceFileName;
    fs.renameSync(tempPath, targetPath);
    let workbook = XLSX.readFile(targetPath)
    let sheetna = workbook.SheetNames
    let workshhet = workbook.Sheets[sheetna[0]]

    xlsxJson = XLSX.utils.sheet_to_json(workshhet)
    xlsxJson.map(xlsitem => {
      console.log('xlsitem------------------------------------')
      console.log(xlsitem)
      const md5 = crypto.createHash('md5')
      const password = xlsitem.password
      xlsitem.password = md5.update(password).digest('hex')
    })
    console.log('xlsxJson---------------------------------')
    console.log(xlsxJson)
    //批量插入学生表的信息
    let sturesult = StuinfoModel.bulkCreate(xlsxJson)
    sturesult.then(stubulk => {
      //    打印刚刚插入的学生表的数据
      console.log('stubulk是个数组--------------------------------')
      console.log(stubulk)
      stubulk.map(stuitem => {
        console.log('stuitem-----------------------')
        console.log(stuitem)
        //刚刚插入的几个学生的Id
        console.log('stuitem.stu_id-------------------------')
        console.log(stuitem.stu_id)
        if (stuitem._options.isNewRecord === true) {
          //  如果学生表成功插入一条数据
          //    通过教师名字找到Id
          let teaoneid = TeainfoModel.findOne({
            //       通过教师上传的账号找到teaid
            attributes: ['tea_id'],
            where: {
              tea_name: xlsxJson[0].tea_name
            }
          })
          teaoneid.then(teaid => {
            console.log('teaid------------------------')

            console.log(teaid)
            console.log('teaid.dataValues.tea_id-----------------------')
            console.log(teaid.dataValues.tea_id)
            let bulktea_stu = Tea_StuModel.create(
              {
                stu_id: stuitem.stu_id,
                tea_id: teaid.dataValues.tea_id
              })
            bulktea_stu.then(tea_stu => {
              console.log('tea_stu------------------------')
              console.log(tea_stu)
              if (tea_stu._options.isNewRecord === true) {
                let bulkuser = UsersModel.create({
                  user_id: stuitem.stu_id,
                  password: stuitem.password,
                  user_name: stuitem.stu_name,
                  user_email: stuitem.stu_email,
                  user_nick_name: stuitem.stu_nick_name,
                  status: 1,
                })
                bulkuser.then(bulkuserdata => {
                  console.log('bulkuserdata------------------')
                  console.log(bulkuserdata)
                  if (bulkuserdata._options.isNewRecord === true) {
                    let user_role = UsresRolesModel.create({
                      user_id: stuitem.stu_id,
                      role_id: 3,
                    })
                    user_role.then(usro => {
                      console.log('usro---------------------------')
                      console.log(usro)
                      if (usro._options.isNewRecord === true) {
                        return res.json({
                          code: 20000,
                          message: '所有学生信息批量导入成功',
                          data: null
                        })
                      } else {
                        return res.json({
                          code: 40000,
                          message: '学生信息导入失败',
                          data: null
                        })
                      }
                    })
                  } else {
                    return res.json({
                      code: 40000,
                      message: '用户登录表批量插入数据失败',
                      data: null
                    })
                  }
                })
              } else {
                return res.json({
                  code: 40000,
                  message: '学生-教师关系表插入失败',
                  data: null
                })
              }
            })
          })
        } else {
          return res.json({
            code: 40000,
            message: '学生表批量插入数据失败',
            data: null
          })
        }
      })
    })
  })

})

/*
* 编辑学生信息
* */
router.post('/edit', async (req, res, next) => {
  // const stu_id = req.body.stu_id
  // console.log(stu_id)
  console.log(req.body)
  const result = StuinfoModel.updateStu(req.body)
  let stu_id = req.body.stu_id
  let stu_email = req.body.stu_email
  const userresult = UsersModel.update({
    user_email: stu_email

  }, {
    where: {
      user_id: stu_id
    }
  })


  result.then(function (ret) {
    // if (ret === true && sqlre1.warningCount === 0)
    if (ret === true) {
      return res.json({
        code: 20000,
        message: '修改学生个人信息成功',
        data: ret
      })
    } else {
      return res.json({
        code: 40000,
        message: ret,
        data: '修改失败'
      })
    }
  })
})

/*
* 删除学生信息
* */
router.post('/del', (req, res, next) => {
  const stu_ids = req.body.stu_id
  let result = StuinfoModel.delStu(stu_ids || [])


  result.then(function (student) {
    if (student !== true) {
      return res.json({
        code: 40000,
        message: '删除失败',
        data: null
      })
    }
    return res.json({
      code: 20000,
      message: '删除成功',
      data: student
    })
  }).catch(e => {
    return e
  })


})


//学生通过原密码修改密码
router.post('/editpwded', (req, res, next) => {
  console.log(req.body)
  if (req.body.password !== req.body.repassword) {
    return res.json({
      code: 40000,
      message: '两次密码输入不一致',
      data: null
    })
  }
  const user_id = req.body.stu_id
  const old_password = req.body.old_password
  UsersModel.findOne({where: {user_id: user_id}}).then(function (user) {
    if (!user) {
      return res.json({
        code: 40000,
        message: '用户不存在',
        data: null
      })
    }

    if (req.body.action === 'edit-pwd') {
      const md5 = crypto.createHash('md5')
      if (user.password !== md5.update(old_password).digest('hex')) {
        return res.json({
          code: 40000,
          message: '原密码不正确',
          data: null
        })
      }
      const _md5 = crypto.createHash('md5')
      const data = {
        password: _md5.update(req.body.password).digest('hex'),
        update_time: new Date()
      }
      const result = UsersModel.update(data, {
        where: {
          user_id: user_id
        }
      })

      const sturesult = StuinfoModel.update(data, {
        where: {
          stu_id: user_id
        }
      })


      result.then(function (ret) {
        if (ret) {
          return res.json({
            code: 20000,
            message: '通过原密码修改学生密码成功',
            data: ret
          })
        } else {
          return res.json({
            code: 40000,
            message: ret,
            data: null
          })
        }
      })
    } else if (req.body.action === 'email-pwd') {
      console.log(req.body)
      let email_pwd = req.body.email_pwd
      let stu_id = req.body.stu_id
      StuinfoModel.findOne({
        attributes: ['ran_code'],
        where: {
          stu_id: stu_id
        }
      }).then(function (sture) {
        console.log(sture.dataValues.ran_code)
        if (sture.dataValues.ran_code == email_pwd) {

          const _md5 = crypto.createHash('md5')
          const data = {
            password: _md5.update(req.body.password).digest('hex'),
            update_time: new Date()
          }
          const result = UsersModel.update(data, {
            where: {
              user_id: stu_id
            }
          })
          const sturesult = StuinfoModel.update(data, {
            where: {
              stu_id: stu_id
            }
          })
          result.then(function (ret) {
            if (ret) {
              return res.json({
                code: 20000,
                message: '通过邮箱验证码修改学生密码成功',
                data: ret
              })
            } else {
              return res.json({
                code: 40000,
                message: ret,
                data: null
              })
            }
          })
        }
      })
    }
  })
})


/*
* 上传图片，修改图片
* */
router.post('/uploadimage', (req, res, next) => {

  console.log(req.body)
  let form = new formidable.IncomingForm()
  // console.log('form',form)
  form.encoding = 'utf-8' // 编码
  form.keepExtensions = true // 保留扩展名
  form.uploadDir = path.join(__dirname, '../public/images/face') //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.parse(req, (err, fileds, files) => { // 解析 formData 数据
    console.log(fileds,'fileds') //{ name: 'stua' }
    // console.log(files,'files')
    // if (err) return next(err)
    modiuid = fileds.mystu_id
    username = fileds.name //用户名 用于修改用户头像路径
    console.log(username,'username')  //stua
    let oldPath = files.file.filepath //获取文件路径 ~/public/images/<随机生成的文件名>.<扩展名>
    console.log(oldPath,'oldPath')   /*D:\Develop\face_recog\1219express\vue-element-admin-express\server\public\images\face\cbfd9c53d3071f2d3cfaddc00
n.jpg*/
    let imgname = files.file.originalFilename //前台上传时的文件名 也就是文件原本的名字
    console.log(imgname,'imgname')   //D:\Develop\face_recog\1219express\vue-element-admin-express\server\public\images\face\cbfd9c53d3071f2d3cfaddc00
// n.jpg
    let userImgname = imgname.replace(/[^.]+/, username) //把扩展名前的文件名给替换掉
    console.log(userImgname,'userImgname')  //stua.jpg
    if (userImgname.includes('jpg') || userImgname.includes('png')) {
      sinaname = "http://4365285ek9.zicp.vip/public/images/face/" + userImgname
      newPath = path.join(path.dirname(oldPath), userImgname)


    } else {
      userImgname = userImgname + ".jpg"
      sinaname = "http://4365285ek9.zicp.vip/public/images/face/" + userImgname
      newPath = path.join(path.dirname(oldPath), userImgname)


    }
    console.log(sinaname,'sinaname')
    //我这里为了方便存储 统一将文件名改为 <用户名>.jpg
    //  newPath = path.join(path.dirname(oldPath), userImgname)
    console.log(newPath,'newPath') //D:\Develop\face_recog\1219express\vue-element-admin-express\server\public\images\face\stua.jpg
    fs.rename(oldPath, newPath, async (err) => {
      if (err) return next(err)


    })

  })
  const sturesult = StuinfoModel.updateImage(sinaname, modiuid)
  sturesult.then(function (student) {
    if (student !== true) {
      return res.json({
        code: 40000,
        message: '上传图片失败',
        data: student
      })
    }
    return res.json({
      code: 20000,
      message: '上传图片成功',
      data: student
    })
  }).catch(e => {
    return e
  })
})


module.exports = router
