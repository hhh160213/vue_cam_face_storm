const express = require('express')
const crypto = require('crypto')
const router = express.Router()

const UsersModel = require('../model/users')
const RolesModel = require('../model/rolesmodel')
const UserLogsModel = require('../model/user-logs')
const UsresRolesModel = require('../model/usersandroles')
const Allmodel = require('../model/Allmodel')
const StuinfoModel = require("../model/stuinfo");
const TeainfoModel = require("../model/teainfo");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const sqlQuery = require("../model/config");
let sendmail = require('../utils/sendMail')
const XLSX = require("xlsx");
const Tea_StuModel = require("../model/teaandstu");
const checkemail = {} //声明一个对象缓存邮箱和验证码，留着


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
        message: '获取单个教师信息以及其下学生成功info',
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
      message: '获取全部教师信息以及学生成功list',
      data: tea_stu
    })
  })
})


//教师发送邮箱验证码
router.post('/sendmailtea', async (req, res, next) => {
  console.log(req.body)
  let mail = req.body.email
  let tea_id = req.body.tea_id
  const senddata = {
    rst: true,
    data: "",
    msg: ""
  }
  if (!mail) {
    return res.send('参数错误')
  } //email出错时或者为空时
  const ran_code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
  checkemail[mail] = ran_code
  console.log(checkemail[mail])
  console.log(ran_code)
  let sqlStr = "update teainfos set ran_code=? where tea_id=?"
  let result = await sqlQuery(sqlStr, [ran_code, tea_id]);
  console.log(result)
  if (result.warningCount === 0) {
    {
      //发送邮件
      sendmail.sendMail(mail, ran_code, (state) => {
        if (state) {
          res.json({
            code: 20000,
            message: '发送邮件成功',
            data: state,

          })
        } else {
          res.json({
            code: 40000,
            message: '发送邮件失败',
            data: null
          })
        }

      })
    }
  }
})


//教师通过原密码修改密码
router.post('/editpwded', (req, res, next) => {
  console.log(req.body)
  if (req.body.password !== req.body.repassword) {
    return res.json({
      code: 40000,
      message: '两次密码输入不一致',
      data: null
    })
  }
  const user_id = req.body.tea_id
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

      const sturesult = TeainfoModel.update(data, {
        where: {
          tea_id: user_id
        }
      })


      result.then(function (ret) {
        if (ret) {
          return res.json({
            code: 20000,
            message: '通过原密码修改教师密码成功',
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
      let stu_id = req.body.tea_id
      TeainfoModel.findOne({
        attributes: ['ran_code'],
        where: {
          tea_id: stu_id
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
          const sturesult = TeainfoModel.update(data, {
            where: {
              tea_id: stu_id
            }
          })
          result.then(function (ret) {
            if (ret) {
              return res.json({
                code: 20000,
                message: '通过邮箱验证码修改教师密码成功',
                data: ret
              })
            } else {
              return res.json({
                code: 40000,
                message: '邮箱验证码修改密码失败',
                data: ret
              })
            }
          })
        }
      })
    }
  })
})


//高层批量上传教师信息
router.post('/addteainfobyxls', (req, res, next) => {
  console.log(req.body)
  var form = new formidable.IncomingForm();
  var xlsxJson;
  form.keepExtensions = true;         // 保存后缀名
  form.encoding = 'utf-8';            // 编码方式
  form.uploadDir = 'public/tmp';      // 临时上传路径
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
    //批量插入教师表的信息
    let sturesult = TeainfoModel.bulkCreate(xlsxJson)
    sturesult.then(stubulk => {
      //    打印刚刚插入的学生表的数据
      console.log('stubulk是个数组--------------------------------')
      console.log(stubulk)
      stubulk.map(stuitem => {
        console.log('stuitem-----------------------')
        console.log(stuitem)
        //刚刚插入的几个学生的Id
        console.log('stuitem.stu_id-------------------------')
        console.log(stuitem.tea_id)
        console.log(stuitem.dataValues)
        console.log(stuitem.teainfos)
        if (stuitem._options.isNewRecord === true) {
          //  如果教师表成功插入一条数据,需要在user也插入一条记录
          let bulkuser = UsersModel.create({
            user_id: stuitem.tea_id,
            password: stuitem.password,
            user_name: stuitem.tea_name,
            user_email: stuitem.tea_email,
            user_nick_name: stuitem.tea_nick_name,
            status: 1,
          })
          bulkuser.then(bulkuserdata => {
            console.log('bulkuserdata------------------')
            console.log(bulkuserdata)
            if (bulkuserdata._options.isNewRecord === true) {
              let user_role = UsresRolesModel.create({
                user_id: stuitem.tea_id,
                role_id: 4,
              })
              user_role.then(usro => {
                console.log('usro---------------------------')
                console.log(usro)
                if (usro._options.isNewRecord === true) {
                  return res.json({
                    code: 20000,
                    message: '所有教师信息批量导入成功',
                    data: null
                  })
                } else {
                  return res.json({
                    code: 40000,
                    message: '教师信息导入失败',
                    data: null
                  })
                }
              })
            } else {
              return res.json({
                code: 40000,
                message: '用户登录表批量插入数据失败,可能是教师账号与系统有重复！',
                data: null
              })
            }
          })


        } else {
          return res.json({
            code: 40000,
            message: '教师表批量插入数据失败',
            data: null
          })
        }
      })
    })
  })

})


//修改上传教师图片(可无)
router.post('/uploadimage', (req, res, next) => {




  let form = new formidable.IncomingForm()
  // console.log(form)
  form.encoding = 'utf-8' // 编码
  form.keepExtensions = true // 保留扩展名
  form.uploadDir = path.join(__dirname, '../public/images/face') //文件存储路径 最后要注意加 '/' 否则会被存在public下
  form.parse(req, (err, fileds, files) => { // 解析 formData 数据
    console.log(fileds) //{ name: 'stua' }
    // console.log(files)
    // if (err) return next(err)
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
    if (userImgname.includes('jpg')||userImgname.includes('png'))
    {
      sinaname = "http://127.0.0.1:8002/public/images/face/" + userImgname
      newPath = path.join(path.dirname(oldPath), userImgname)


    }
    else {
      userImgname=userImgname+".jpg"
      sinaname = "http://127.0.0.1:8002/public/images/face/" + userImgname
      newPath = path.join(path.dirname(oldPath), userImgname)


    }
    console.log(sinaname)
    //我这里为了方便存储 统一将文件名改为 <用户名>.jpg
    //  newPath = path.join(path.dirname(oldPath), userImgname)
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


//高层单个添加教师信息
router.post('/addteabyuser', async (req, res, next) => {
  console.log(req.body)
  let {
    user_name,
    user_email,
    user_nick_name,
    tea_age,
    tea_sex,
    tea_mobile,
    tea_idcard,
    tea_oriplace,
    tea_dormitory,
    password,
    repassword,
    role_name,
    action,
    status,
    role_id
  } = req.body

  const md5 = crypto.createHash('md5')
  password = md5.update(password).digest('hex')
  console.log(password)
  // const result = UsersModel.addUser(req.body)


  //先在users表中插入一条数据
  let userresult = UsersModel.create({
    user_name: user_name,
    user_email: user_email,
    user_nick_name: user_nick_name,
    password: password,
    status: status
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
      let tearesult = TeainfoModel.create({
        //teainfo表的主键通过user刚刚插入的user自动生成的user_id来动态共享
        tea_id: userret.dataValues.user_id,
        tea_name: user_name,
        tea_email: user_email,
        tea_nick_name: user_nick_name,
        tea_age: tea_age,
        tea_sex: tea_sex,
        tea_mobile: tea_mobile,
        tea_idcard: tea_idcard,
        tea_oriplace: tea_oriplace,
        tea_dormitory: tea_dormitory,
        password: password,
        status: status
      })
      tearesult.then(teare => {
        console.log(teare)
        //如果taeinfo表插入的是一条新记录而且插入成功
        if (teare._options.isNewRecord === true) {
          //把教师分配给教师角色，在user_role表中插入一条教师的id和role角色的id
          let roleresult = UsresRolesModel.create({
            role_id: 4,
            user_id: userret.dataValues.user_id,
          })

          //如果教师分配角色role_id成功
          roleresult.then(rolere => {
            //如果role插入一条新记录成功
            if (rolere._options.isNewRecord === true) {
              return res.json({
                code: 20000,
                message: '教师信息添加成功',
                data: rolere
              })


            } else {

              return res.json({
                code: 40000,
                message: '教师信息插入失败',
                data: null
              })
            }

          })


        } else {
          //教师表插入失败
          return res.json({
            code: 20000,
            message: 'teainfos表插入信息失败',
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

/*教师
* 修改个人信息
* */
router.post('/edit', async (req, res, next) => {
  console.log(req.body)
  const result = TeainfoModel.updateTea(req.body)
  let tea_id = req.body.tea_id
  let tea_email = req.body.tea_email
  let sql1 = 'UPDATE users SET user_email=? WHERE user_id=? '
  let sqlre1 = await sqlQuery(sql1, [tea_email, tea_id])
  // console.log(sqlre1)


  result.then(function (ret) {
    if (ret === true && sqlre1.warningCount === 0) {
      return res.json({
        code: 20000,
        message: '修改教师信息成功',
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
})


/*删除教师信息，根据id*/
router.post('/del', (req, res, next) => {
  const tea_id = req.body.tea_id
  let result = TeainfoModel.delTea(tea_id || [])


  result.then(function (teach) {
    if (teach !== true) {
      return res.json({
        code: 40000,
        message: '删除失败',
        data: null
      })
    }
    return res.json({
      code: 20000,
      message: '删除成功',
      data: teach
    })
  }).catch(e => {
    return e
  })


})



module.exports = router
