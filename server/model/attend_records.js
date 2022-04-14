const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const TeainfoModel = require('./teainfo')
const Usermodel = require('./users')
const Tea_StuModel = require('./teaandstu')
const tools = require('../utils/tools')
const UsersRolesModel = require("./usersandroles");
const RolesModel = require("./rolesmodel");



// 定义表的模型
const AttendModel = sequelize.define('attend_records', {
  attend_record_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  stu_id: {
    type: Sequelize.INTEGER,
  },



  stu_name: {
    type: Sequelize.STRING(255)
  },
  stu_nick_name: {
    type: Sequelize.STRING(255)
  },

  actualLoctaion: {
    type: Sequelize.STRING(255)
  },


    attend_type: {
    type: Sequelize.STRING(255)
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

AttendModel.addRecord = async function (stu_id,picName) {
  const t = await sequelize.transaction()
  try {
    const attedstu = await AttendModel.create(stu_id,picName)
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}

AttendModel.updateStu = async function (data) {
  const t = await sequelize.transaction()
  try {
    data.update_time = new Date()
    // let stu_id=data.stu_id
    await AttendModel.update(data, {
      where: {
        stu_id: data.stu_id
      }
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}
module.exports = AttendModel

