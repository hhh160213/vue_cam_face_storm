const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = express.Router()
const UsersModel = require('../model/users')
const RolesModel = require('../model/rolesmodel')
const UserLogsModel = require('../model/user-logs')
const MenusModel = require('../model/menus')
const StuinfoModel = require("../model/stuinfo");
const TeainfoModel = require("../model/teainfo");
const checkemail = {} //声明一个对象缓存邮箱和验证码，留着
let sendmail = require('../utils/sendMail')

const Sequelize = require('sequelize')
const Op = Sequelize.Op
/**
 * 登录接口
 */
router.post('/login', (req, res, next) => {

  console.log(req.body)

  const username = req.body.username
  const password = req.body.password
  const md5 = crypto.createHash('md5')
  const md5pwd = md5.update(password).digest('hex')
  UsersModel.findOne(
    {
      where: {
        user_name: username
      }
    }).then(function (user) {
    if (!user) {
      return res.json({
        code: 40000,
        message: '帐号不存在',

        data: ''
      })
    }
    if (!user.status) {
      return res.json({
        code: 40000,
        message: '帐号已停用',
        data: ''
      })
    }
    if (user.password === md5pwd) {
      const token = 'Bearer ' + jwt.sign(
        {
          _id: user.user_id,
          username: user.user_name,
          // user_email: user.user_email,
          // user_nick_name: user.user_nick_name,

        },
        'express',
        {
          expiresIn: 7200 * 2
        }
      )

      const logData = {
        user_id: user.user_id,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        ua: req.headers['user-agent']
      }
      UserLogsModel.create(logData)
      return res.json({
        code: 20000,
        message: '登录成功',
        data: {
          token: token,
          username: user.user_name,
          user_email: user.user_email,
          user_nick_name: user.user_nick_name,
          user_id: user.user_id,
          user_password: user.password,
        }
      })
    } else {
      return res.json({
        code: 40000,
        message: '密码错误',
        data: ''
      })
    }
  })
})

/*
* 获取个人信息
* */
router.get('/info', (req, res, next) => {


  const user_id = req.user._id
  UsersModel.findOne({
    attributes: {exclude: ['password']},
    include: [
      {model: RolesModel}
    ],
    where: {
      user_id: user_id
    }
  }).then(function (user_roles) {


    if (!user_roles) {
      return res.json({
        code: 40000,
        message: '帐号未分配角色',
        data: ''
      })
    }


    let menu_ids = []
    let buttons = []
    const role_names = []
    let user_email = user_roles.user_email;
    let user_nick_name = user_roles.user_nick_name;
    user_roles.roles.forEach(function (item) {
      if (item.status) {
        menu_ids = menu_ids.concat(item.menu_ids)
        role_names.push(item.role_name)
        item.buttons.forEach(function (button) {
          buttons = buttons.concat(button.btns)
        })
      }
    })


    MenusModel.getListTree({menu_id: menu_ids})
      .then(function (menus) {
        return res.json({
          code: 20000,
          message: '获取成功',
          data: {
            roles: role_names,
            user_id: user_id,
            user_email: user_email,
            user_nick_name: user_nick_name,
            name: user_roles.user_name,
            // avatar: 'https://s1.ax1x.com/2020/05/25/tp7UWF.gif',
            avatar: 'face/school.png',
            menus: menus,
            buttons: buttons
          }
        })


      })

  })


})

/*
* 获取个人信息小程序
* */
router.post('/infotaro', (req, res, next) => {

  console.log(req.body)
  const user_id = Number( req.body.user_id)
  UsersModel.findOne({
    attributes: {exclude: ['password']},
    include: [
      {model: RolesModel}
    ],
    where: {
      user_id: user_id
    }
  }).then(function (user_roles) {


    if (!user_roles) {
      return res.json({
        code: 40000,
        message: '帐号未分配角色',
        data: ''
      })
    }


    let menu_ids = []
    let buttons = []
    const role_names = []
    let user_email = user_roles.user_email;
    let user_nick_name = user_roles.user_nick_name;
    user_roles.roles.forEach(function (item) {
      if (item.status) {
        menu_ids = menu_ids.concat(item.menu_ids)
        role_names.push(item.role_name)
        item.buttons.forEach(function (button) {
          buttons = buttons.concat(button.btns)
        })
      }
    })

    let roleobj
    role_names.map(roleit=>{
      roleobj=roleit
    })
    MenusModel.getListTree({menu_id: menu_ids})
      .then(function (menusret) {
        if (menusret)
        {
          return res.json({
            code: 20000,
            message: '获取角色成功',
            data: {
              // roles: role_names,
              rolename: roleobj,
              // user_id: user_id,
              // user_email: user_email,
              // user_nick_name: user_nick_name,
              // name: user_roles.user_name,

            },
            alresponse:menusret

          })
        }
        else {
          return res.json({
            code: 40000,
            message: '角色获取失败!',
            data: ''
          })
        }





      })

  })


})

/*登出接口前端完成
*
* */
router.post('/logout', (req, res, next) => {
  return res.json({
    code: 20000,
    message: '登出操作成功执行',
    data: null
  })
})


/*
* 学生发送邮箱验证码
* */
router.post('/sendmail', (req, res, next) => {
  console.log(req.body)
  let mail = req.body.email
  let stu_id = req.body.stu_id

  if (!mail) {
    return res.send('参数错误')
  } //email出错时或者为空时
  const ran_code = parseInt(Math.random(0, 1) * 10000) //生成随机验证码
  checkemail[mail] = ran_code

    const sturesult = StuinfoModel.update(
      {
        ran_code:ran_code
      }, {
        where: {
          stu_id: stu_id
        }
      })
    sturesult.then((resuyt)=>{
      //更新成功的话发送邮件
      if (resuyt){
        console.log(resuyt)
        //发送邮件
        sendmail.sendMail(mail, ran_code, (state) => {
          if (state) {
            res.json({
              code: 20000,
              message: '发送邮件成功',
              data: state,
              ran_code:ran_code

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
    })




})



/*
* 获取所有的用户
* */
router.get('/list', (req, res, next) => {
  if (req.query.page <= 0) {
    req.query.page = 1
  }
  if (req.query.limit > 50) {
    req.query.limit = 50

  }
  let where = {}
  if (req.query.date && req.query.date.length === 2) {
    where = {
      create_time: {
        [Op.between]: req.query.date
      }
    }
  }
  const offset = (req.query.page - 1) * req.query.limit


  UsersModel.findAndCountAll({
    attributes: {exclude: ['password']},
    offset: offset || 0,
    limit: parseInt(req.query.limit) || 5,
    include: [
      {model: RolesModel}
    ],
    where: req.query
  }).then(function (user_roles) {
    return res.json({
      code: 20000,
      message: '获取成功',
      data: {
        user_roles: user_roles.rows,
        total: user_roles.count
      }
      // length:
    })
  })
})
/*
* 获取用户post版本，使用分页*/
router.post('/listdo', (req, res, next) => {

  console.log(req.body)

  if (req.body.page <= 0) {
    req.body.page = 1
  }
  if (req.body.limit > 50) {
    req.body.limit = 50

  }

  const offset = (req.body.page - 1) * req.body.limit


  UsersModel.findAndCountAll({
    attributes: {exclude: ['password']},
    offset: offset || 0,
    limit: parseInt(req.body.limit) || 5,
    include: [
      {model: RolesModel}
    ],
    // where: {
    //   user_name: req.body.user_name||'',
    //   status: req.body.status||1,
    // },
  }).then(function (user_roles) {
    return res.json({
      code: 20000,
      message: '获取成功',
      data: {
        total: user_roles.count,
        user_roles: user_roles.rows,
      }
    })
  })
})

/*添加角色，授权，分配*/
router.post('/add', (req, res, next) => {
  if (req.body.password !== req.body.repassword) {
    return res.json({
      code: 40000,
      message: '两次密码输入不一致',
      data: null
    })
  }

  console.log(req.body)
  const password = req.body.password
  const md5 = crypto.createHash('md5')
  req.body.password = md5.update(password).digest('hex')
  const result = UsersModel.addUser(req.body)
  //新建老师
  const tearesult = UsersModel.addTeach(req.body)
  const sturesult = UsersModel.addStu(req.body)
  console.log(result)
  console.log(tearesult)
  console.log(sturesult)
  sturesult.then(function (ret) {
    console.log(ret)
    if (ret === true) {
      return res.json({
        code: 20000,
        message: '新增学生成功',
        data: ret
      })
    } else {
      console.log(ret)

      return res.json({
        code: 20000,
        message: '新增学生成功',
        data: ret
      })
    }
  })
  tearesult.then(function (ret) {

    if (ret === true) {
      console.log(ret)

      return res.json({
        code: 20000,
        message: '新增老师成功',
        data: ret
      })
    } else {
      console.log(ret)

      return res.json({
        code: 20000,
        message: '新增老师成功',
        data: ret
      })
    }
  })
  result.then(function (ret) {
    if (ret === true) {
      console.log(ret)

      return res.json({
        code: 20000,
        message: '新增用户成功',
        data: ret
      })
    } else {
      console.log(ret)

      return res.json({
        code: 20000,
        message: '新增用户成功',
        data: ret
      })
    }
  })
})

/*
* 编辑用户信息
* */
router.post('/edit', (req, res, next) => {
  const user_id = req.query.user_id
  req.body.password = undefined
  const result = UsersModel.updateUser(user_id, req.body)
  result.then(function (ret) {
    if (ret === true) {
      return res.json({
        code: 20000,
        message: '修改成功',
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

/*删除用户信息*/
router.post('/del', (req, res, next) => {
  const user_ids = req.body
  UsersModel.delUser(user_ids || []).then(function (user) {
    if (user !== true) {
      return res.json({
        code: 40000,
        message: '删除失败',
        data: null
      })
    }
    return res.json({
      code: 20000,
      message: '删除成功',
      data: user
    })
  })
})

/*修改密码
* 通过验证原来密码
*
* */
router.post('/edit-pwd', (req, res, next) => {
  if (req.body.password !== req.body.repassword) {
    return res.json({
      code: 40000,
      message: '两次密码输入不一致',
      data: null
    })
  }
  const user_id = req.query.user_id
  const old_password = req.body.old_password
  UsersModel.findOne({where: {user_id: user_id}}).then(function (user) {
    if (!user) {
      return res.json({
        code: 40000,
        message: '用户不存在',
        data: null
      })
    }
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
    result.then(function (ret) {
      if (ret) {
        return res.json({
          code: 20000,
          message: '修改成功',
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
})

module.exports = router
