/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.7.34-log : Database - flask_fa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`flask_fa` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `flask_fa`;

/*Table structure for table `attend_records` */

DROP TABLE IF EXISTS `attend_records`;

CREATE TABLE `attend_records` (
  `attend_record_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_id` int(255) unsigned NOT NULL,
  `stu_name` varchar(255) NOT NULL COMMENT '姓名',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `attend_type` varchar(255) DEFAULT '考勤方式',
  `stu_nick_name` varchar(255) DEFAULT NULL,
  `actualLoctaion` varchar(255) DEFAULT '暂无位置',
  `sendattends_id` int(255) DEFAULT NULL,
  PRIMARY KEY (`attend_record_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2706 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `attend_records` */


DROP TABLE IF EXISTS `entrance_records`;

CREATE TABLE `entrance_records` (
  `entrance_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_id` int(255) unsigned NOT NULL,
  `stu_name` varchar(255) NOT NULL COMMENT '学生姓名',
  `tea_id` int(255) unsigned NOT NULL,
  `tea_name` varchar(255) NOT NULL COMMENT '教师姓名',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`entrance_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;



DROP TABLE IF EXISTS `menus`;

CREATE TABLE `menus` (
  `menu_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL COMMENT '上级ID',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `type` char(1) NOT NULL COMMENT '类型',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `name` varchar(255) DEFAULT NULL COMMENT '路由名称',
  `component` varchar(255) DEFAULT NULL COMMENT '路由组件',
  `path` varchar(255) DEFAULT NULL COMMENT '路由地址',
  `redirect` varchar(255) DEFAULT NULL COMMENT '跳转地址',
  `permission` varchar(255) DEFAULT NULL COMMENT '权限标识',
  `hidden` tinyint(1) DEFAULT NULL COMMENT '隐藏',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;



insert  into `menus`(`menu_id`,`parent_id`,`title`,`sort`,`type`,`icon`,`name`,`component`,`path`,`redirect`,`permission`,`hidden`,`update_time`,`create_time`) values 
(7,0,'系统管理',0,'M','component','System','Layout','/system','/system/user',NULL,0,NULL,'2020-05-24 18:51:21'),
(8,7,'菜单管理',0,'C','list','Menu','/system/menu','/system/menu','','system:menu',0,NULL,'2020-05-24 18:52:26'),
(9,7,'权限管理',0,'C','peoples','Role','/system/role','/system/role','','system:role',0,NULL,'2020-05-24 18:53:31'),
(10,7,'用户管理',1,'C','user','User','/system/user','/system/user','','system:user',0,'2020-05-24 18:58:01','2020-05-24 18:54:26'),
(11,7,'登录日志',0,'C','log','Log','/system/log','/system/log','','system:log',0,NULL,'2020-05-24 18:55:20'),
(20,0,'签到管理',0,'M','date','Present','Layout','/present','/present/face',NULL,0,'2021-12-21 21:05:44','2021-12-21 21:04:59'),
(21,20,'人脸签到',0,'C','people','face','/present/face','/present/face','','present:face',0,NULL,'2021-12-21 21:07:31'),
(22,20,'位置签到',0,'C','guide','loca','/present/location','/present/location',NULL,'present:location',0,'2021-12-21 21:12:50','2021-12-21 21:10:15'),
(23,20,'随机码签到',0,'C','code','random','/present/random','/present/random',NULL,'present:random',0,NULL,'2021-12-21 21:11:13'),
(24,7,'学生信息',0,'C','education','stuinfo','/system/stuinfo','/system/stuinfo','','system:stuinfo',0,'2021-12-22 10:07:37','2021-12-22 10:01:17'),
(25,7,'教师信息',0,'C','monitor','teainfo','/system/teainfo','/system/teainfo','','system:teainfo',0,NULL,'2021-12-22 10:02:32');

/*Table structure for table `roles` */

/*Data for the table `menus` */


DROP TABLE IF EXISTS `req_sendattends`;

CREATE TABLE `req_sendattends` (
  `tea_id` int(100) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_nick_name` varchar(255) DEFAULT NULL,
  `start_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `dead_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `attendTypeCheck` varchar(255) DEFAULT NULL,
  `sendattends_id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `resp_number` int(200) DEFAULT '0',
  `unresp_number` int(200) DEFAULT '0',
  `suc_stuname` varchar(255) DEFAULT NULL,
  `undo_stuname` varchar(255) DEFAULT NULL,
  `reasonlocation` varchar(255) DEFAULT '暂无位置',
  `reasonLongTi` varchar(255) DEFAULT NULL,
  `reasonLati` varchar(255) DEFAULT NULL,
  `suc_stuid` varchar(255) DEFAULT '0',
  PRIMARY KEY (`sendattends_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

/*Data for the table `req_sendattends` */

DROP TABLE IF EXISTS `req_stus`;

CREATE TABLE `req_stus` (
  `req_stu_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL COMMENT '学生ID',
  `tea_id` int(11) NOT NULL COMMENT '教师ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `sendattends_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`req_stu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1026 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `req_stus` */



DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL COMMENT '角色名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `menu_ids` text COMMENT '菜单ID',
  `buttons` text COMMENT '权限标识',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`role_id`,`role_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `roles` */

insert  into `roles`(`role_id`,`role_name`,`remark`,`status`,`menu_ids`,`buttons`,`update_time`,`create_time`) values 
(1,'管理员','拥有全部权限',1,'[7,10,8,9,11,24,25,20,21,22,23]','[{\"menu_id\":10,\"btns\":[\"system:user:query\",\"system:user:add\",\"system:user:edit\",\"system:user:del\"]},{\"menu_id\":8,\"btns\":[\"system:menu:del\",\"system:menu:edit\",\"system:menu:add\",\"system:menu:query\"]},{\"menu_id\":9,\"btns\":[\"system:role:query\",\"system:role:add\",\"system:role:del\",\"system:role:edit\"]},{\"menu_id\":11,\"btns\":[\"system:log:query\",\"system:log:del\",\"system:log:add\",\"system:log:edit\"]},{\"menu_id\":21,\"btns\":[\"present:face:query\",\"present:face:add\",\"present:face:edit\",\"present:face:del\"]},{\"menu_id\":22,\"btns\":[\"present:location:query\",\"present:location:add\",\"present:location:del\",\"present:location:edit\"]},{\"menu_id\":23,\"btns\":[\"present:random:query\",\"present:random:add\",\"present:random:del\",\"present:random:edit\"]},{\"menu_id\":24,\"btns\":[\"system:stuinfo:query\",\"system:stuinfo:add\",\"system:stuinfo:edit\",\"system:stuinfo:del\"]},{\"menu_id\":25,\"btns\":[\"system:teainfo:query\",\"system:teainfo:add\",\"system:teainfo:edit\",\"system:teainfo:del\"]}]','2021-12-22 10:07:47','2020-05-16 21:14:50'),
(3,'学生',NULL,1,'[7,10,8,9,11,20,21,22,23]','[{\"menu_id\":10,\"btns\":[\"system:user:query\"]},{\"menu_id\":8,\"btns\":[\"system:menu:query\"]},{\"menu_id\":11,\"btns\":[\"system:log:query\"]},{\"menu_id\":9,\"btns\":[\"system:role:query\"]}]','2021-12-21 21:16:04','2020-05-22 18:50:23'),
(4,'教师',NULL,1,'[7,10,8,9,11,20,21,22,23]','[]',NULL,'2021-12-21 21:15:38');

/*Table structure for table `stuinfos` */

DROP TABLE IF EXISTS `socket_message`;

CREATE TABLE `socket_message` (
  `user_id` int(20) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_nick_name` varchar(255) DEFAULT NULL,
  `content` mediumtext,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `socket_message` */

/*Table structure for table `stuinfos` */

DROP TABLE IF EXISTS `stuinfos`;

CREATE TABLE `stuinfos` (
  `stu_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(255) NOT NULL COMMENT '姓名',
  `stu_age` int(11) DEFAULT '18' COMMENT '年龄',
  `stu_pic` varchar(255)  COMMENT '照片地址',
  `stu_sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `password` char(32)  COMMENT '密码',
  `stu_mobile` varchar(255) DEFAULT NULL COMMENT '电话号码',
  `stu_idcard` varchar(255) DEFAULT NULL COMMENT '身份证',
  `stu_oriplace` varchar(255) DEFAULT '中国' COMMENT '生源',
  `stu_dormitory` varchar(255) DEFAULT NULL COMMENT '宿舍',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `stu_email` varchar(255) DEFAULT 'crknjv14235@chacuo.net',
  `ran_code` int(11) DEFAULT '0',
  `stu_nick_name` varchar(255) DEFAULT '林同学',
  PRIMARY KEY (`stu_id`) USING BTREE,
  UNIQUE KEY `stu_name` (`stu_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5002 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `stuinfos` */


/*Table structure for table `tea_stus` */

DROP TABLE IF EXISTS `tea_stus`;

CREATE TABLE `tea_stus` (
  `tea_stu_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL COMMENT '学生ID',
  `tea_id` int(11) NOT NULL COMMENT '教师ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`tea_stu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1028 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `tea_stus` */
insert  into `tea_stus`(`tea_stu_id`,`stu_id`,`tea_id`,`create_time`) values 
(500,50,200,'2021-12-23 08:52:52'),
(501,51,201,'2021-12-23 08:52:58');


/*Table structure for table `teainfos` */

DROP TABLE IF EXISTS `teainfos`;

CREATE TABLE `teainfos` (
  `tea_id` int(200) unsigned NOT NULL AUTO_INCREMENT,
  `tea_name` varchar(255) NOT NULL COMMENT '姓名',
  `tea_age` int(11) DEFAULT '18' COMMENT '年龄',
  `tea_pic` varchar(255)  COMMENT '照片地址',
  `tea_sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `password` char(32) DEFAULT NULL COMMENT '密码',
  `tea_mobile` varchar(255) DEFAULT NULL COMMENT '电话号码',
  `tea_idcard` varchar(255) DEFAULT NULL COMMENT '身份证',
  `tea_oriplace` varchar(255) DEFAULT '中国' COMMENT '生源',
  `tea_dormitory` varchar(255) DEFAULT NULL COMMENT '宿舍',
  `status` tinyint(4) DEFAULT '0' COMMENT '状态',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `tea_email` varchar(255) ,
  `tea_nick_name` varchar(255) DEFAULT '俞老师',
  `ran_code` int(200) DEFAULT '0',
  PRIMARY KEY (`tea_id`) USING BTREE,
  UNIQUE KEY `tea_name` (`tea_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3005 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `teainfos` */


/*Table structure for table `user_logs` */

DROP TABLE IF EXISTS `user_logs`;

CREATE TABLE `user_logs` (
  `user_log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `ip` varchar(255) DEFAULT NULL COMMENT '登录IP',
  `ua` varchar(500) DEFAULT NULL COMMENT 'ua标识',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
  PRIMARY KEY (`user_log_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1614 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL COMMENT '帐号',
  `password` char(32) NOT NULL COMMENT '密码',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `user_email` varchar(255) DEFAULT '@qq.com',
  `ran_code` int(200) DEFAULT '0',
  `user_nick_name` varchar(255) DEFAULT '甲丁乙',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5002 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `users` */
insert  into `users`(`user_id`,`user_name`,`password`,`status`,`update_time`,`create_time`) values 
(1,'admin','21232f297a57a5a743894a0e4a801fc3',1,'2021-12-21 21:03:51','2020-05-16 21:15:43'),
(3,'dzz','7491e82795267307ad3c1810ca303f16',1,'2021-12-21 21:17:42','2020-05-23 19:43:54'),
(4,'zhang','d0cd2693b3506677e4c55e91d6365bff',1,NULL,'2021-12-21 21:18:23');


/*Table structure for table `users_roles` */

DROP TABLE IF EXISTS `users_roles`;

CREATE TABLE `users_roles` (
  `user_role_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`user_role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=297 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `users_roles` */
insert  into `users_roles`(`user_role_id`,`role_id`,`user_id`,`create_time`) values 
(1,1,1,'2020-05-16 21:15:03'),
(14,3,3,'2020-05-24 11:19:35'),
(16,4,4,'2021-12-21 21:18:23');
