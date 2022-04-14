const Sequelize = require('sequelize')
// const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'flask_fa', // 数据库名
  'root', // 用户名

  'root', // 密码
  {
    'dialect': 'mysql', // 数据库类型
    'host': '127.0.0.1', // ip
    'port': 3306, // 端口
    define: {
        // freezeTableName:true,    //自定义表名，不设置会自动将表名转为复数形式
        timestamps:false    //自动生成更新时间，创建时间字段，updatedAt,createdAt

    },
        dialectOptions:{
        charset:'utf8mb4',  //字符集
        collate:'utf8mb4_unicode_ci'
    },
    timezone: '+08:00' // 东八时区

  },

)
// sequelize.authenticate().then(()=>{
//     console.log("数据库已连接！")
// }).catch(err=>{
//     console.log(err)
//     console.log("连接失败")
// })
module.exports = sequelize
