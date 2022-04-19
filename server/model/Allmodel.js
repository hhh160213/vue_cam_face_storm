const Sequelize = require('sequelize')
const moment = require('moment')
const sequelize = require('./init')



var fs = require('fs');
const RolesModel = require("./rolesmodel");
const UsersRolesModel = require("./usersandroles");

const Allmodel = {}
fs.readdirSync(__dirname).filter((value)=>{
    return value !== 'Allmodel.js'; //过滤自身

}).map(value => Allmodel[value.split('.')[0]] = require('./' + value));

// console.log(Allmodel)


Allmodel.teainfo.belongsToMany(Allmodel.stuinfo, {
  through: Allmodel.teaandstu,
 foreignKey: 'tea_id',
  // otherKey:'stu_id',
  constraints: false,
})



Allmodel.stuinfo.belongsToMany(Allmodel.teainfo, {
  through: Allmodel.teaandstu,
  foreignKey: 'stu_id',
    // otherKey:'tea_id',
  constraints: false
})


Allmodel.req_sendattend.hasMany(Allmodel.attend_records, {
  foreignKey: 'sendattends_id',
    // otherKey:'stu_id',
  constraints: false
})


Allmodel.attend_records.belongsTo(Allmodel.req_sendattend, {
  foreignKey: 'sendattends_id',
    // otherKey:'stu_id',
  constraints: false
})




Allmodel.req_sendattend.belongsToMany(Allmodel.stuinfo, {
  through: Allmodel.reqandstu,
 foreignKey: 'tea_id',
  // otherKey:'stu_id',
  constraints: false,
})



Allmodel.stuinfo.belongsToMany(Allmodel.req_sendattend, {
  through: Allmodel.reqandstu,
  foreignKey: 'stu_id',
    // otherKey:'sendattends_id',
  constraints: false
})





Allmodel.users.belongsToMany(Allmodel.rolesmodel, {
  through: Allmodel.usersandroles,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  constraints: false
})

Allmodel.rolesmodel.belongsToMany(Allmodel.users, {
  through: Allmodel.usersandroles,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  constraints: false
})



// UsersModel.belongsToMany(RolesModel, {
//   through: {
//     model: UsersRolesModel
//   },
//   foreignKey: 'user_id',
//   otherKey: 'role_id'
// })



// Allmodel.users.hasOne(Allmodel.teainfo, {
//   foreignKey: 'user_id',
// })
//
// Allmodel.users.hasOne(Allmodel.stuinfo, {
//   foreignKey: 'user_id',
// })
//
// Allmodel.stuinfo.belongsTo(Allmodel.users)
// Allmodel.teainfo.belongsTo(Allmodel.users)
//




module.exports = Allmodel
