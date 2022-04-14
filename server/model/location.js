const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')

// 定义表的模型
const locationmodel = sequelize.define('location', {
  location_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },
  location_name: {
    type: Sequelize.STRING(255)
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

module.exports = locationmodel
