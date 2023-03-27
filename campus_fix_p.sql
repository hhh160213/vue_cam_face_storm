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
