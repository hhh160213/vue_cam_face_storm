const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')

// 定义表的模型
const Req_StuModel = sequelize.define('req_stus', {
  req_stu_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  stu_id: {
    type: Sequelize.INTEGER

  },
  tea_id: {
    type: Sequelize.INTEGER
  },

  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})

module.exports = Req_StuModel
