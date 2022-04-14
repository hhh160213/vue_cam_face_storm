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

const StuinfoModel = sequelize.define('stuinfos', {
  stu_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  ran_code: {
    type: Sequelize.INTEGER,
  },

  stu_age: {
    type: Sequelize.INTEGER,
  },


  stu_name: {
    type: Sequelize.STRING(255)
  },
  stu_nick_name: {
    type: Sequelize.STRING(255)
  },


  stu_pic: {
    type: Sequelize.STRING(255)
  },

  stu_sex: {
    type: Sequelize.STRING(255)
  },

  stu_mobile: {
    type: Sequelize.STRING(255)
  },
  stu_idcard: {
    type: Sequelize.STRING(255)
  },
  stu_oriplace: {
    type: Sequelize.STRING(255)
  },

  stu_dormitory: {
    type: Sequelize.STRING(255)
  },

   stu_email: {
    type: Sequelize.STRING(255)
  },





  // role_id: {
  //   type: Sequelize.INTEGER,
  // },
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

StuinfoModel.addStu = async function (data) {
  const t = await sequelize.transaction()
  try {
    const student = await StuinfoModel.create(data)
    /*    const student = await StuinfoModel.create({
          stu_name:data,
          stu_age:data,
          stu_pic:data,
          stu_sex:data,
          stu_mobile:data,
          stu_idcard:data,
          stu_oriplace:data,
          stu_dormitory:data,
          status:data,
        },
          { fields: ['stu_name','stu_age','stu_pic','stu_sex','stu_mobile','stu_idcard','stu_oriplace','stu_dormitory','status'] }
        )*/
    const tea_stu = student.tea_id.map(function (tea_id) {
      return {
        stu_id: student.stu_id,
        tea_id: tea_id
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

StuinfoModel.updateStu = async function (data) {
  const t = await sequelize.transaction()
  try {
    data.update_time = new Date()
    // let stu_id=data.stu_id
    await StuinfoModel.update(data, {
      where: {
        stu_id: data.stu_id
      }
    })

    // tea_stu users_roles
    /* const teaandstu = await Tea_StuModel.findAll({
       where: { stu_id: data.stu_id }
     })
     //role_ids   tea_ids
     const tea_ids = teaandstu.map(function(item) {
       return item.tea_id
     })
     // 新加的角色    tea_ids   role_ids
     const add_tea_ids = tools.minustArr(data.tea_id, tea_ids)
     //add_tea_stu   add_user_role
     const add_tea_stu = add_tea_ids.map(function(tea_id) {
       return { stu_id: data.stu_id, tea_id: tea_id }
     })
     await Tea_StuModel.bulkCreate(add_tea_stu)*/
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}
StuinfoModel.updateImage = async function (stu_pic, stu_id) {
  const t = await sequelize.transaction()
  try {
    await StuinfoModel.update({
      stu_pic: stu_pic
    }, {
      where: {
        stu_id: stu_id
      }
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}

StuinfoModel.addStuinfo = async function (data) {
  const t = await sequelize.transaction()
  try {
    console.log(data)



    //insert into 学生表
    const stu = await StuinfoModel.create(data)
    console.log(stu)
    //获取当前得到的tea_id
    const teaandstu = data.tea_id;
    console.log(teaandstu)
    const stu_id_tea = stu.stu_id;
    console.log(stu_id_tea)
    const stupassword = stu.password;
    console.log(stupassword)
    console.log(stu.stu_name)

    const users_roles ={
        user_id: stu.stu_id,
        role_id: 3
    }
       const users_stu ={
        user_id: stu.stu_id,
        user_name: stu.stu_name,
         password:stu.password,
         status:1
    }
       const users_tea ={
        tea_id: data.tea_id,
        stu_id:stu.stu_id
    }

    console.log(users_roles)
    console.log(users_stu)
    console.log(users_tea)
    //往学生——教师表多对多关系中插入tea_id和stu_id
    await Tea_StuModel.create(users_tea)
    await Usermodel.create(users_stu)
    await UsersRolesModel.create(users_roles)



    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return e.message
  }
}

StuinfoModel.delStu = async function (stu_id) {
  const t = await sequelize.transaction()
  try {


    await StuinfoModel.destroy({

      where: {stu_id: stu_id}

    })
    await Tea_StuModel.destroy({
      where: {stu_id: stu_id}
    })
    t.commit()
    return true
  } catch (e) {
    t.rollback()
    return false
  }
}


// StuinfoModel.belongsTo(Usermodel)


/*StuinfoModel.belongsToMany(TeainfoModel, {
  through: {
    model: Tea_StuModel,
      // as:'tea_stu'

  },
  foreignKey: 'stu_id',
  otherKey:'tea_id'
  // constraints: false,

})*/

module.exports = StuinfoModel

