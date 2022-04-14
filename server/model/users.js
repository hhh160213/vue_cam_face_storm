const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const RolesModel = require('./rolesmodel')
const TeainfoModel = require('./teainfo')
const StuinfoModel = require('./stuinfo')
const UsersRolesModel = require('./usersandroles')
const UsersLogsModel = require('./user-logs')
const tools = require('../utils/tools')

// 定义表的模型
const UsersModel = sequelize.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },

  ran_code: {
    type: Sequelize.INTEGER,
  },


  user_name: {
    type: Sequelize.STRING(255)
  },
  user_email: {
    type: Sequelize.STRING(255)
  },

  user_nick_name: {
    type: Sequelize.STRING(255)
  },


  password: {
    type: Sequelize.CHAR(32)
  },
  status: {
    type: Sequelize.TINYINT(4),
    defaultValue: 0
  },


  update_time: {
    type: Sequelize.DATE,
    get() {
      return this.getDataValue('update_time') ? moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm:ss') : null
    }
  },
  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})

UsersModel.updateUser = async function (user_id, data) {
  const t = await sequelize.transaction()
  try {


    data.update_time = new Date()
    await UsersModel.update(data, {
      where: {
        user_id: user_id
      }
    })


    const users_roles = await UsersRolesModel.findAll({
      where: {user_id: user_id}
    })
    const role_ids = users_roles.map(function (item) {
      return item.role_id
    })
    // 新加的角色
    const add_role_ids = tools.minustArr(data.role_ids, role_ids)
    const add_users_roles = add_role_ids.map(function (role_id) {
      return {user_id: user_id, role_id: role_id}
    })


    await TeainfoModel.update(
      {tea_email: data.user_email},
      {
        where: {
          tea_id: user_id
        }
      })

    await StuinfoModel.update(
      {stu_email: data.user_email},
      {
        where: {
          stu_id: user_id
        }
      })


    await UsersRolesModel.bulkCreate(add_users_roles)
    // 删除的角色
    const del_role_ids = tools.minustArr(role_ids, data.role_ids)
    if (del_role_ids && del_role_ids.length > 0) {
      await UsersRolesModel.destroy({
        where: {
          user_id: user_id,
          role_id: del_role_ids
        }
      })
    }


    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}

UsersModel.addUser = async function (data) {
  const t = await sequelize.transaction()
  let user

  try {
    if (data.role_ids[0] === 1) {
      user = await UsersModel.create(data)
    }
    // user = await UsersModel.create(data)
    console.log(user)
    const users_roles = data.role_ids.map(function (role_id) {
      console.log(data)
      console.log(data.role_ids)
      // console.log(users_roles)
      return {
        user_id: user.user_id,
        role_id: role_id
      }
    })
    await UsersRolesModel.bulkCreate(users_roles)

    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}


// UsersModel.addUser = async function(data) {
//   const t = await sequelize.transaction()
//   try {
//     const user = await UsersModel.create(data)
//     const users_roles = data.role_ids.map(function(role_id) {
//       console.log(role_id)
//       if (role_id===1)
//       return {
//         user_id: user.user_id,
//         role_id: role_id
//       }
//     })
//      const t_roles = data.role_ids.map(function(role_id) {
//        console.log(role_id)
//        if (role_id===4)
//        {
//               return {
//         tea_id: user.user_id,
//         tea_name: user.user_name,
//         // role_id: role_id
//       }
//        }
//        else {
//             return {
//         stu_id: user.user_id,
//         stu_name: user.user_name,
//         // role_id: role_id
//       }
//        }
//
//     })
//
// /*       const s_roles = data.role_ids.map(function(role_id) {
//          console.log(role_id)
//        if (role_id===3)
//
//     })*/
//
//
//
//
//     // await UsersRolesModel.bulkCreate(users_roles)
//     await TeainfoModel.bulkCreate(t_roles)
//     await StuinfoModel.bulkCreate(t_roles)
//     t.commit()
//     return true
//   } catch (e) {
//     t.rollback()
//     return e.message
//   }
// }

UsersModel.addTeach = async function (data) {
  const t = await sequelize.transaction()
  let user

  try {
    if (data.role_ids[0] === 4) {
      user = await UsersModel.create(data)
    }
    const tea_roles = data.role_ids.map(function (role_id) {
      return {
        tea_id: user.user_id,
        tea_name: user.user_name,
        password: user.password
      }
    })
    const users_roles = data.role_ids.map(function (role_id) {
      console.log(data)
      console.log(data.role_ids)
      // console.log(users_roles)
      return {
        user_id: user.user_id,
        role_id: role_id
      }
    })
    await UsersRolesModel.bulkCreate(users_roles)

    await TeainfoModel.bulkCreate(tea_roles)

    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}

UsersModel.addStu = async function (data) {
  const t = await sequelize.transaction()
  let user

  try {
    console.log(data)
    if (data.role_ids[0] === 3) {
      user = await UsersModel.create(data)
    }
    const stu_roles = data.role_ids.map(function () {
      return {
        stu_id: user.user_id,
        stu_name: user.user_name,
        password: user.password
      }
    })
    const users_roles = data.role_ids.map(function (role_id) {
      console.log(data)
      console.log(data.role_ids)
      // console.log(users_roles)
      return {
        user_id: user.user_id,
        role_id: role_id
      }
    })
    await UsersRolesModel.bulkCreate(users_roles)

    await StuinfoModel.bulkCreate(stu_roles)

    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}


UsersModel.delUser = async function (user_ids) {
  const t = await sequelize.transaction()
  try {
    await UsersModel.destroy({
      where: {user_id: user_ids}
    })
    await UsersRolesModel.destroy({
      where: {user_id: user_ids}
    })
    await UsersLogsModel.destroy({
      where: {user_id: user_ids}
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return false
  }
}

// UsersModel.belongsToMany(RolesModel, {
//   through: {
//     model: UsersRolesModel
//   },
//   foreignKey: 'user_id',
//   otherKey: 'role_id'
// })
//


// UsersModel.hasOne(StuinfoModel,{
//   foreignKey:'user_id'
// })
//
// UsersModel.hasOne(TeainfoModel,{
//   foreignKey:'user_id'
// })


module.exports = UsersModel

