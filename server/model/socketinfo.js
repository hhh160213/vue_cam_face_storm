const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const StuinfoModel = require('./stuinfo')
const tools = require('../utils/tools')
const Tea_StuModel = require("./teaandstu");
const Usermodel = require('./users')




// 定义表的模型
const SocketModel = sequelize.define('socket_message', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },



  user_name: {
    type: Sequelize.STRING(255)
  },

  user_nick_name: {
    type: Sequelize.STRING(255)
  },


})



SocketModel.updateTea = async function( data) {
  const t = await sequelize.transaction()
  try {
    // console.log(data)
    data.update_time = new Date()
    await SocketModel.update(data, {
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
SocketModel.addTeainfo = async function(data) {
const t = await sequelize.transaction()
  try {
    const teach = await SocketModel.create(data)
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

SocketModel.updateImage = async function(stu_pic,stu_id) {
  const t = await sequelize.transaction()
  try {
     await SocketModel.update({
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




SocketModel.delTea = async function(tea_id) {
  const t = await sequelize.transaction()
  try {
    await SocketModel.destroy({

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
// SocketModel.belongsTo(Usermodel)
/*SocketModel.belongsToMany(StuinfoModel, {
  through: {
    model: Tea_StuModel
  },
  foreignKey: 'tea_id',
  otherKey:'stu_id',
  constraints: false,

})*/

module.exports = SocketModel

