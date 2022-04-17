const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')
const StuinfoModel = require('./stuinfo')
const tools = require('../utils/tools')
const Tea_StuModel = require("./teaandstu");
const Usermodel = require('./users')


// 定义表的模型
const ReqAttendModel = sequelize.define('req_sendattends', {
  tea_id: {
    type: Sequelize.INTEGER,

  },
  resp_number: {
    type: Sequelize.INTEGER,
  },

  unresp_number: {
    type: Sequelize.INTEGER,
  },
  suc_stuid: {
    type: Sequelize.INTEGER,
  },


  sendattends_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },


  suc_stuname: {
    type: Sequelize.STRING(255)
  },

  undo_stuname: {
    type: Sequelize.STRING(255)
  },

  attendTypeCheck: {
    type: Sequelize.STRING(255)
  },

  reasonlocation: {
    type: Sequelize.STRING(255)
  },


  reasonLati: {
    type: Sequelize.STRING(255)
  },

  reasonLongTi: {
    type: Sequelize.STRING(255)
  },


  user_name: {
    type: Sequelize.STRING(255)
  },

  user_nick_name: {
    type: Sequelize.STRING(255)
  },

  dead_time: {
    type: Sequelize.DATE,
    get() {
      return this.getDataValue('dead_time') ? moment(this.getDataValue('dead_time')).format('YYYY-MM-DD HH:mm:ss') : null
    }
  },
  start_time: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('start_time')).format('YYYY-MM-DD HH:mm:ss')
    }
  }

})

ReqAttendModel.TaroAddAttend = async function (data) {


}


ReqAttendModel.delOutDated = async function (user_id) {
  const t = await sequelize.transaction()
  try {
    await ReqAttendModel.destroy({
      where: {tea_id: user_id}
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return false
  }
}


ReqAttendModel.delSingleId = async function (sendattends_id) {
  const t = await sequelize.transaction()
  try {
    await ReqAttendModel.destroy({
      where: {sendattends_id: sendattends_id}
    })

    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return false
  }
}

ReqAttendModel.updateSucNum = async function (ATTENDID, stu_nick_name) {
  const t = await sequelize.transaction()

  let sucStuNumArr = []
  let orirespNumber
  let updatereq


      await ReqAttendModel.findOne({
        attributes: ['suc_stuname', 'resp_number'],
        where: {
          sendattends_id: Number(ATTENDID)
        },
        // transaction: t
      }).then(async findall => {
        console.log(findall.dataValues)
        if (findall.dataValues.suc_stuname.includes(stu_nick_name)) {
          console.log('into if false')
          return false
        }
        if (!(findall.dataValues.suc_stuname.includes(stu_nick_name)))  {
          console.log('into else')
          console.log(findall.dataValues)
          orirespNumber=findall.dataValues.resp_number
          sucStuNumArr.push(stu_nick_name,findall.dataValues.suc_stuname)
          let stringarr=  sucStuNumArr.join(',')
          console.log(stringarr)
          orirespNumber++
        updatereq=   await ReqAttendModel.update({ suc_stuname: stringarr,resp_number:orirespNumber },
            // { transaction: t },
            {
              where: {
                sendattends_id: Number(ATTENDID)
              }
            })
          // await t.commit()
          return true
        }

      })

      console.log('updatereq',updatereq)
      // return  true





    // return true




}


module.exports = ReqAttendModel

