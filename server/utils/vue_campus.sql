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
  PRIMARY KEY (`attend_record_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2511 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `attend_records` */

insert  into `attend_records`(`attend_record_id`,`stu_id`,`stu_name`,`update_time`,`create_time`,`attend_type`) values 
(2504,71,'hsq',NULL,'2022-01-04 10:56:54','人脸识别签到'),
(2505,71,'hsq',NULL,'2022-01-04 10:57:10','人脸识别签到'),
(2506,71,'hsq',NULL,'2022-01-04 20:51:21','人脸识别签到'),
(2507,51,'zlk0987',NULL,'2022-01-05 13:30:24','人脸识别签到'),
(2508,5001,'wyp',NULL,'2022-01-05 13:44:31','人脸识别签到'),
(2509,5001,'wyp',NULL,'2022-01-05 16:29:17','人脸识别签到'),
(2510,5001,'wyp',NULL,'2022-01-05 16:29:44','人脸识别签到');

/*Table structure for table `entrance_records` */

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
) ENGINE=InnoDB AUTO_INCREMENT=2500 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `entrance_records` */

/*Table structure for table `menus` */

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `menus` */

insert  into `menus`(`menu_id`,`parent_id`,`title`,`sort`,`type`,`icon`,`name`,`component`,`path`,`redirect`,`permission`,`hidden`,`update_time`,`create_time`) values 
(7,0,'信息管理',0,'M','component','System','Layout','/system','/system/user',NULL,0,NULL,'2020-05-24 18:51:21'),
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
(1,'管理员','拥有全部权限',1,'[7,10,9]','[{\"menu_id\":10,\"btns\":[\"system:user:query\",\"system:user:add\",\"system:user:edit\",\"system:user:look\"]},{\"menu_id\":8,\"btns\":[\"system:menu:edit\",\"system:menu:add\",\"system:menu:query\",\"system:menu:look\"]},{\"menu_id\":9,\"btns\":[\"system:role:query\",\"system:role:add\",\"system:role:edit\",\"system:role:look\"]},{\"menu_id\":11,\"btns\":[\"system:log:query\",\"system:log:add\",\"system:log:edit\",\"system:log:look\"]},{\"menu_id\":21,\"btns\":[\"present:face:query\",\"present:face:add\",\"present:face:edit\",\"present:face:del\",\"present:face:look\"]},{\"menu_id\":22,\"btns\":[\"present:location:query\",\"present:location:add\",\"present:location:del\",\"present:location:edit\",\"present:location:look\"]},{\"menu_id\":23,\"btns\":[\"present:random:query\",\"present:random:add\",\"present:random:del\",\"present:random:edit\",\"present:random:look\"]},{\"menu_id\":24,\"btns\":[\"system:stuinfo:query\",\"system:stuinfo:add\",\"system:stuinfo:edit\",\"system:stuinfo:look\"]},{\"menu_id\":25,\"btns\":[\"system:teainfo:query\",\"system:teainfo:add\",\"system:teainfo:edit\",\"system:teainfo:look\"]}]','2022-01-03 08:42:29','2020-05-16 21:14:50'),
(3,'学生',NULL,1,'[7,24,20,21,22,23]','[{\"menu_id\":10,\"btns\":[]},{\"menu_id\":8,\"btns\":[]},{\"menu_id\":11,\"btns\":[]},{\"menu_id\":9,\"btns\":[\"system:role:query\"]},{\"menu_id\":24,\"btns\":[\"system:stuinfo:edit\",\"system:stuinfo:look\",\"system:stuinfo:forget\"]},{\"menu_id\":25,\"btns\":[\"system:teainfo:query\"]},{\"menu_id\":21,\"btns\":[\"present:face:query\",\"present:face:add\",\"present:face:edit\",\"present:face:del\",\"present:face:look\"]},{\"menu_id\":22,\"btns\":[\"present:location:query\",\"present:location:add\",\"present:location:edit\",\"present:location:del\",\"present:location:look\"]},{\"menu_id\":23,\"btns\":[\"present:random:query\",\"present:random:add\",\"present:random:edit\",\"present:random:del\",\"present:random:look\"]}]','2021-12-30 19:54:20','2020-05-22 18:50:23'),
(4,'教师',NULL,1,'[25,7]','[{\"menu_id\":9,\"btns\":[]},{\"menu_id\":24,\"btns\":[\"system:stuinfo:add\",\"system:stuinfo:edit\",\"system:stuinfo:look\",\"system:stuinfo:forget\"]},{\"menu_id\":25,\"btns\":[\"system:teainfo:edit\",\"system:teainfo:look\",\"system:teainfo:add\",\"system:teainfo:forget\"]},{\"menu_id\":21,\"btns\":[\"present:face:query\",\"present:face:add\",\"present:face:edit\",\"present:face:del\",\"present:face:look\"]},{\"menu_id\":22,\"btns\":[\"present:location:query\",\"present:location:look\",\"present:location:del\",\"present:location:edit\",\"present:location:add\"]},{\"menu_id\":23,\"btns\":[\"present:random:query\",\"present:random:look\",\"present:random:add\",\"present:random:edit\",\"present:random:del\"]}]','2022-01-05 13:37:27','2021-12-21 21:15:38');

/*Table structure for table `stuinfos` */

DROP TABLE IF EXISTS `stuinfos`;

CREATE TABLE `stuinfos` (
  `stu_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(255) NOT NULL COMMENT '姓名',
  `stu_age` int(11) DEFAULT '18' COMMENT '年龄',
  `stu_pic` varchar(255) DEFAULT 'http://127.0.0.1:8002/public/images/face/default.jpg' COMMENT '照片地址',
  `stu_sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `password` char(32) DEFAULT '202cb962ac59075b964b07152d234b70' COMMENT '密码',
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

insert  into `stuinfos`(`stu_id`,`stu_name`,`stu_age`,`stu_pic`,`stu_sex`,`password`,`stu_mobile`,`stu_idcard`,`stu_oriplace`,`stu_dormitory`,`status`,`update_time`,`create_time`,`stu_email`,`ran_code`,`stu_nick_name`) values 
(51,'zlk0987',22,'http://127.0.0.1:8002/public/images/face/zlk0987.jpg','男性','5463d9b53b9f469ee180fbe607921a9d','13766198721','330582197501230091','中国','901',1,'2022-01-05 13:28:56','2022-01-05 13:12:52','919046999@qq.com',6055,'张开凯'),
(5000,'jkl',22,'http://127.0.0.1:8002/public/images/face/default.jpg','男性','699a474e923b8da5d7aefbfc54a8a2bd','1361831813','400682199816527651','甘肃','991',1,NULL,'2022-01-05 13:40:35','9812839@qq.com',0,'江开理'),
(5001,'wyp',21,'http://127.0.0.1:8002/public/images/face/wyp.jpg','男性','b5c6f781d7d66e27c4e2f5b5b8b14a0c','13758765412','330987199675410921','江南','203',1,'2022-01-05 13:42:30','2022-01-05 13:40:35','919046999@qq.com',8316,'吴垟坪');

/*Table structure for table `tea_stus` */

DROP TABLE IF EXISTS `tea_stus`;

CREATE TABLE `tea_stus` (
  `tea_stu_id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL COMMENT '学生ID',
  `tea_id` int(11) NOT NULL COMMENT '教师ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`tea_stu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1026 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `tea_stus` */

insert  into `tea_stus`(`tea_stu_id`,`stu_id`,`tea_id`,`create_time`) values 
(1024,5000,3003,'2022-01-05 13:40:35'),
(1025,5001,3003,'2022-01-05 13:40:35');

/*Table structure for table `teainfos` */

DROP TABLE IF EXISTS `teainfos`;

CREATE TABLE `teainfos` (
  `tea_id` int(200) unsigned NOT NULL AUTO_INCREMENT,
  `tea_name` varchar(255) NOT NULL COMMENT '姓名',
  `tea_age` int(11) DEFAULT '18' COMMENT '年龄',
  `tea_pic` varchar(255) DEFAULT 'http://127.0.0.1:8002/public/images/face/default.jpg' COMMENT '照片地址',
  `tea_sex` varchar(255) DEFAULT NULL COMMENT '性别',
  `password` char(32) DEFAULT NULL COMMENT '密码',
  `tea_mobile` varchar(255) DEFAULT NULL COMMENT '电话号码',
  `tea_idcard` varchar(255) DEFAULT NULL COMMENT '身份证',
  `tea_oriplace` varchar(255) DEFAULT '中国' COMMENT '生源',
  `tea_dormitory` varchar(255) DEFAULT NULL COMMENT '宿舍',
  `status` tinyint(4) DEFAULT '0' COMMENT '状态',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `tea_email` varchar(255) DEFAULT 'crknjv14235@chacuo.net',
  `tea_nick_name` varchar(255) DEFAULT '俞老师',
  `ran_code` int(200) DEFAULT '212121212',
  PRIMARY KEY (`tea_id`) USING BTREE,
  UNIQUE KEY `tea_name` (`tea_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3005 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `teainfos` */

insert  into `teainfos`(`tea_id`,`tea_name`,`tea_age`,`tea_pic`,`tea_sex`,`password`,`tea_mobile`,`tea_idcard`,`tea_oriplace`,`tea_dormitory`,`status`,`update_time`,`create_time`,`tea_email`,`tea_nick_name`,`ran_code`) values 
(50,'lnj1673',22,'http://127.0.0.1:8002/public/images/face/default.jpg','男','1db5edcf4818e5531ef9229146ec8ec0','13665519898','330327199811150234','浙江','987',1,'2022-01-05 13:24:30','2022-01-05 12:57:02','919046999@qq.com','李霖洁',6131),
(52,'lzp0019',36,'http://127.0.0.1:8002/public/images/face/default.jpg','男性','202cb962ac59075b964b07152d234b70','13516787651','330327197501230912','浙江','912',1,NULL,'2022-01-05 13:18:47','981222@qq.com','林张鹏',212121212),
(3002,'zpq1202',33,'http://127.0.0.1:8002/public/images/face/default.jpg','男性','202cb962ac59075b964b07152d234b70','13516765142','330327196510210231','浙江','976',1,NULL,'2022-01-05 13:34:40','919046999@qq.com','张平轻',212121212),
(3003,'lph1022',22,'http://127.0.0.1:8002/public/images/face/default.jpg','男性','2cfe9b347ad8873a05417933b3533be1','1361831813','400682199816527651','甘肃','991',1,'2022-01-05 13:38:20','2022-01-05 13:36:53','919046999@qq.com','刘鹏华',212121212),
(3004,'lzc3058',21,'http://127.0.0.1:8002/public/images/face/default.jpg','男性','9d0f18cf32b0a432031c68c5cae3d587','13758765412','330987199675410921','江南','203',1,NULL,'2022-01-05 13:36:53','783728@qq.com','林组超',212121212);

/*Table structure for table `user_logs` */

DROP TABLE IF EXISTS `user_logs`;

CREATE TABLE `user_logs` (
  `user_log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `ip` varchar(255) DEFAULT NULL COMMENT '登录IP',
  `ua` varchar(500) DEFAULT NULL COMMENT 'ua标识',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
  PRIMARY KEY (`user_log_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=508 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `user_logs` */

insert  into `user_logs`(`user_log_id`,`user_id`,`ip`,`ua`,`create_time`) values 
(446,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-02 16:42:36'),
(447,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-02 16:45:14'),
(448,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62','2022-01-02 18:22:10'),
(449,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62','2022-01-02 18:27:25'),
(450,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62','2022-01-02 18:28:01'),
(451,65,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62','2022-01-02 18:29:39'),
(452,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-02 18:30:51'),
(453,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 09:00:55'),
(454,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 09:02:29'),
(455,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 10:25:59'),
(456,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 10:29:13'),
(457,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 10:31:11'),
(458,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 13:25:23'),
(459,63,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62','2022-01-03 14:16:44'),
(460,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 14:38:05'),
(461,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 14:47:20'),
(462,63,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 15:05:57'),
(463,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 15:07:41'),
(464,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-03 15:31:11'),
(465,48,'127.0.0.1','Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Mobile Safari/537.36','2022-01-03 17:25:06'),
(466,63,'127.0.0.1','Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Mobile Safari/537.36','2022-01-03 17:25:30'),
(467,48,'127.0.0.1','Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Mobile Safari/537.36','2022-01-03 17:26:58'),
(468,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 09:46:56'),
(469,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 09:47:42'),
(470,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:05:21'),
(471,63,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:10:50'),
(472,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:13:07'),
(473,63,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:52:56'),
(474,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:54:04'),
(475,71,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:55:06'),
(476,71,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 10:56:03'),
(477,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 17:46:12'),
(478,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 17:46:38'),
(479,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 18:15:34'),
(480,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 19:06:59'),
(481,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 20:33:09'),
(482,48,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 20:37:14'),
(483,63,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 20:48:09'),
(484,71,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 20:48:39'),
(485,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-04 20:52:45'),
(486,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 12:33:53'),
(487,50,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 12:57:25'),
(488,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:17:14'),
(489,50,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:21:11'),
(490,50,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:22:03'),
(491,50,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:22:32'),
(492,50,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:23:16'),
(493,50,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:24:42'),
(494,51,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:27:20'),
(495,51,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:28:01'),
(496,51,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:28:35'),
(497,51,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:29:05'),
(498,1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:32:53'),
(499,3003,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:37:56'),
(500,3003,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:38:33'),
(501,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:41:08'),
(502,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:41:44'),
(503,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:42:05'),
(504,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 13:43:41'),
(505,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 15:07:11'),
(506,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 15:44:44'),
(507,5001,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.25 Safari/537.36 Core/1.70.3880.400 QQBrowser/10.8.4554.400','2022-01-05 16:21:44');

/*Table structure for table `users` */

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

insert  into `users`(`user_id`,`user_name`,`password`,`status`,`update_time`,`create_time`,`user_email`,`ran_code`,`user_nick_name`) values 
(1,'admin','202cb962ac59075b964b07152d234b70',1,'2021-12-29 15:01:31','2021-12-25 15:38:37','@qq.com',0,'foo'),
(50,'lnj1673','1db5edcf4818e5531ef9229146ec8ec0',1,'2022-01-05 13:33:17','2022-01-05 12:57:02','919046999@qq.com',0,'李霖洁'),
(51,'zlk0987','5463d9b53b9f469ee180fbe607921a9d',1,'2022-01-05 13:28:56','2022-01-05 13:12:52','919046999@qq.com',0,'张开凯'),
(52,'lzp0019','202cb962ac59075b964b07152d234b70',1,NULL,'2022-01-05 13:18:47','981222@qq.com',0,'林张鹏'),
(3002,'zpq1202','202cb962ac59075b964b07152d234b70',1,NULL,'2022-01-05 13:34:40','919046999@qq.com',0,'张平轻'),
(3003,'lph1022','2cfe9b347ad8873a05417933b3533be1',1,NULL,'2022-01-05 13:36:53','919046999@qq.com',0,'刘鹏华'),
(3004,'lzc3058','9d0f18cf32b0a432031c68c5cae3d587',1,NULL,'2022-01-05 13:36:53','783728@qq.com',0,'林组超'),
(5000,'jkl','699a474e923b8da5d7aefbfc54a8a2bd',1,NULL,'2022-01-05 13:40:35','9812839@qq.com',0,'江开理'),
(5001,'wyp','202cb962ac59075b964b07152d234b70',1,'2022-01-05 13:42:30','2022-01-05 13:40:35','919046999@qq.com',0,'吴垟坪');

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
(1,1,1,'2021-12-24 12:49:59'),
(273,4,48,'2022-01-02 17:03:18'),
(278,3,63,'2022-01-02 17:34:57'),
(279,3,64,'2022-01-02 17:34:57'),
(280,3,65,'2022-01-02 17:39:00'),
(281,3,66,'2022-01-02 17:39:00'),
(282,3,70,'2022-01-03 14:13:01'),
(283,3,71,'2022-01-04 10:54:43'),
(284,3,72,'2022-01-04 17:47:24'),
(285,4,200,'2022-01-04 20:09:32'),
(286,4,201,'2022-01-04 20:09:32'),
(287,4,50,'2022-01-05 12:57:02'),
(288,3,51,'2022-01-05 13:12:52'),
(289,4,52,'2022-01-05 13:18:47'),
(290,4,3000,'2022-01-05 13:19:58'),
(291,4,3001,'2022-01-05 13:19:58'),
(292,4,3002,'2022-01-05 13:34:40'),
(293,4,3003,'2022-01-05 13:36:53'),
(294,4,3004,'2022-01-05 13:36:54'),
(295,3,5000,'2022-01-05 13:40:35'),
(296,3,5001,'2022-01-05 13:40:35');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
