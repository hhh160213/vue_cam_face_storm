const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const StuinfoModel = require('./stuinfo')
const tools = require('../utils/tools')
const Tea_StuModel = require("./teaandstu");
const Usermodel = require('./users')

// 定义表的模型
const TeainfoModel = sequelize.define('teainfos', {
  tea_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },

  tea_age: {
    type: Sequelize.INTEGER,
  },


  tea_name: {
    type: Sequelize.STRING(255)
  },
    tea_nick_name: {
    type: Sequelize.STRING(255)
  },


  tea_pic: {
    type: Sequelize.STRING(255)
  },

  tea_sex: {
    type: Sequelize.STRING(255)
  },

    tea_email: {
    type: Sequelize.STRING(255)
  },




  tea_mobile: {
    type: Sequelize.STRING(255)
  },
  tea_idcard: {
    type: Sequelize.STRING(255)
  },
  tea_oriplace  : {
    type: Sequelize.STRING(255)
  },

  tea_dormitory  : {
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



TeainfoModel.updateTea = async function( data) {
  const t = await sequelize.transaction()
  try {
    // console.log(data)
    await TeainfoModel.update(data, {
      where: {
        tea_id: data.tea_id
      }
    })






    t.commit()
    return true
  }

  catch (e) {
    t.rollback()
    return e.message
  }
}
TeainfoModel.addTeainfo = async function(data) {
const t = await sequelize.transaction()
  try {
    const teach = await TeainfoModel.create(data)
    const tea_stu = teach.stu_id.map(function(stu_id) {
      return {
        tea_id: teach.tea_id,
        stu_id: stu_id
      }
    })
    await Tea_StuModel.bulkCreate(tea_stu)
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}

TeainfoModel.updateImage = async function(stu_pic,stu_id) {
  const t = await sequelize.transaction()
  try {
     await TeainfoModel.update({
       tea_pic:stu_pic
     }, {
      where: {
        tea_id: stu_id
      }
    })
    t.commit()
    return true
  }

  catch (e) {
    t.rollback()
    return e.message
  }
}




TeainfoModel.delTea = async function(tea_id) {
  const t = await sequelize.transaction()
  try {
    await TeainfoModel.destroy({

      where: { tea_id: tea_id }

    })
    await Tea_StuModel.destroy({
      where: { tea_id: tea_id }
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return false
  }
}
// TeainfoModel.belongsTo(Usermodel)
/*TeainfoModel.belongsToMany(StuinfoModel, {
  through: {
    model: Tea_StuModel
  },
  foreignKey: 'tea_id',
  otherKey:'stu_id',
  constraints: false,

})*/

module.exports = TeainfoModel

