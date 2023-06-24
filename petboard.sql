/*
 Navicat Premium Data Transfer

 Source Server         : petboard
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : petboard

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `aid` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '地址ID',
  `uid` int NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货地址',
  PRIMARY KEY (`aid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (1, 84, '15329613584', '陈小小', '杭州市下城区延安路121号');
INSERT INTO `address` VALUES (2, 84, '15329619584', '陈小小', '北京市朝阳区酒仙桥路10号院');
INSERT INTO `address` VALUES (3, 84, '15329612584', '陈小小', '武汉市洪山区珞喻路1037号');
INSERT INTO `address` VALUES (4, 88, '15329613234', '陈书', '成都市高新区天府大道北段666号');
INSERT INTO `address` VALUES (5, 88, '15329613984', '陈书', '深圳市南山区科技园高新南区中区10栋');
INSERT INTO `address` VALUES (23, 84, '15632200046', '黄秋杰', '广州市天河区珠江新城华夏路1号');
INSERT INTO `address` VALUES (24, 88, '13366645165', '黄麦麦', '广东省肇庆市理工学院');
INSERT INTO `address` VALUES (25, 88, '12345678910', 'admin', '广东省肇庆市');

-- ----------------------------
-- Table structure for business
-- ----------------------------
DROP TABLE IF EXISTS `business`;
CREATE TABLE `business`  (
  `b_id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商家ID',
  `b_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家图片',
  `b_price` decimal(10, 2) UNSIGNED NOT NULL COMMENT '寄养价格',
  `b_JS` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家房屋 特点(多少平米，封闭阳台，)',
  `b_socre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家评分',
  `b_feature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家标签（特点， 几年经验，靠谱商家）',
  `b_city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家所在城市',
  `b_city_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家所在详细地址',
  `b_offer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家提供条件',
  `b_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商家 名',
  PRIMARY KEY (`b_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of business
-- ----------------------------
INSERT INTO `business` VALUES (27, 'http://localhost:9000/7fc20667-79c0-4b9c-b87d-b0401a45edec.jpeg', 60.00, '100', '4.8', '暖男老板', '南京市', '江苏省南京市阿萨德', '消毒猫砂盆,玩具,干净饮用水', '向日葵的家');
INSERT INTO `business` VALUES (26, 'http://localhost:9000/1ddaf348-2fa9-4502-9c4a-f6ec11072f6e.jpeg', 80.00, '140', '4.9', '五年宠物店经验', '商丘市', '河南省商丘市八一路', '干净饮用水,消毒猫砂盆,玩具', '温馨小家');
INSERT INTO `business` VALUES (25, 'http://localhost:9000/a957de95-c424-457d-af47-f434b4e68291.jpeg', 70.00, '120', '5.0', '细心呵护', '石家庄市', '江苏省华淮安市阿萨', '干净饮用水,消毒猫砂盆,玩具', '傻狗呆猫的移动城堡');
INSERT INTO `business` VALUES (28, 'http://localhost:9000/69d14785-f97c-45f7-8e7f-ae765b2b182f.jpeg', 90.00, '160', '5.0', '优质宠粮', '灵宝市', '河南省灵宝市', '干净饮用水,消毒猫砂盆,玩具', '小可爱的小窝');
INSERT INTO `business` VALUES (29, 'http://localhost:9000/d9e1ebad-2e4b-470f-92c0-ca0bb3433f90.jpeg', 70.00, '130', '4.7', '专业伴宠', '柘城县', '河南省商丘市柘城县安平镇', '干净饮用水,消毒猫砂盆,玩具', '向左之家');
INSERT INTO `business` VALUES (30, 'http://localhost:9000/eebda628-5a72-4be9-8b80-1b405ab10868.jpeg', 100.00, '150', '5.0', '舒适环境', '上海市', '上海市嘉定区', '干净饮用水,消毒猫砂盆,玩具', '夏日美好');

-- ----------------------------
-- Table structure for pet
-- ----------------------------
DROP TABLE IF EXISTS `pet`;
CREATE TABLE `pet`  (
  `pid` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '宠物id',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物图片',
  `petname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物名字',
  `p_year` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物年龄',
  `bkid` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '宠物类型（1 猫，2 狗,3 其他）',
  `skid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '宠物品种(加菲猫，金毛)',
  `bkindname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物类型',
  `skindname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物品种',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主人名字',
  `pk` int NOT NULL DEFAULT 0,
  `p_price` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uid` int NOT NULL COMMENT '宠物拥有者id',
  PRIMARY KEY (`pid`) USING BTREE,
  INDEX `username`(`username`) USING BTREE,
  INDEX `bkid`(`bkid`) USING BTREE,
  INDEX `uid`(`uid`) USING BTREE,
  INDEX `p_price`(`p_price`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 74 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet
-- ----------------------------
INSERT INTO `pet` VALUES (37, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '金毛1', '2', '2', '6', '狗', '金毛', '韩冬梅', 0, 1000.00, '2023-04-05 00:00:00', 10);
INSERT INTO `pet` VALUES (38, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧1', '1', '2', '9', '狗', '边牧', '刘星', 0, 1500.00, '2023-04-06 00:00:00', 11);
INSERT INTO `pet` VALUES (39, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪1', '3', '2', '7', '狗', '泰迪', '康哲', 0, 2000.00, '2023-04-03 00:00:00', 12);
INSERT INTO `pet` VALUES (40, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多1', '2', '2', '8', '狗', '拉布拉多', '陈点', 0, 1000.00, '2023-04-05 00:00:00', 13);
INSERT INTO `pet` VALUES (41, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '德牧1', '1', '2', '10', '狗', '德牧', '刘咯', 0, 1500.00, '2023-04-06 00:00:00', 14);
INSERT INTO `pet` VALUES (42, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '金毛2', '2', '2', '6', '狗', '金毛', '韩冬梅', 0, 2000.00, '2023-04-05 00:00:00', 15);
INSERT INTO `pet` VALUES (43, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧2', '1', '2', '9', '狗', '边牧', '刘星', 0, 1500.00, '2023-04-06 00:00:00', 16);
INSERT INTO `pet` VALUES (44, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪2', '3', '2', '7', '狗', '泰迪', '康哲', 0, 2000.00, '2023-04-03 00:00:00', 17);
INSERT INTO `pet` VALUES (45, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多2', '2', '2', '8', '狗', '拉布拉多', '陈点', 0, 1000.00, '2023-04-05 00:00:00', 18);
INSERT INTO `pet` VALUES (46, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '德牧2', '1', '2', '10', '狗', '德牧', '刘咯', 0, 1500.00, '2023-04-06 00:00:00', 19);
INSERT INTO `pet` VALUES (47, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '金毛3', '2', '2', '6', '狗', '金毛', '韩冬梅', 0, 1500.00, '2023-04-05 00:00:00', 20);
INSERT INTO `pet` VALUES (48, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧3', '1', '2', '9', '狗', '边牧', '刘星', 0, 1500.00, '2023-04-06 00:00:00', 21);
INSERT INTO `pet` VALUES (49, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪3', '3', '2', '7', '狗', '泰迪', '康哲', 0, 2000.00, '2023-04-03 00:00:00', 22);
INSERT INTO `pet` VALUES (50, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多3', '2', '2', '8', '狗', '拉布拉多', '陈点', 0, 1000.00, '2023-04-05 00:00:00', 23);
INSERT INTO `pet` VALUES (67, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧4', '1', '2', '9', '狗', '边牧', '刘星', 3, 1500.00, '2023-04-06 00:00:00', 24);
INSERT INTO `pet` VALUES (52, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '金毛1', '2', '2', '6', '狗', '金毛', '韩冬梅', 1, 1000.00, '2023-04-05 00:00:00', 25);
INSERT INTO `pet` VALUES (53, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧1', '1', '2', '9', '狗', '边牧', '刘星', 1, 1500.00, '2023-04-06 00:00:00', 26);
INSERT INTO `pet` VALUES (54, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪1', '3', '2', '7', '狗', '泰迪', '康哲', 1, 2000.00, '2023-04-03 00:00:00', 27);
INSERT INTO `pet` VALUES (55, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多1', '2', '2', '8', '狗', '拉布拉多', '陈点', 1, 1000.00, '2023-04-05 00:00:00', 28);
INSERT INTO `pet` VALUES (56, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '德牧1', '1', '2', '10', '狗', '德牧', '刘咯', 1, 1500.00, '2023-04-06 00:00:00', 29);
INSERT INTO `pet` VALUES (57, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '金毛2', '2', '2', '6', '狗', '金毛', '韩冬梅', 1, 1000.00, '2023-04-05 00:00:00', 30);
INSERT INTO `pet` VALUES (58, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧2', '1', '2', '9', '狗', '边牧', '刘星', 1, 1500.00, '2023-04-06 00:00:00', 31);
INSERT INTO `pet` VALUES (59, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪2', '3', '2', '7', '狗', '泰迪', '康哲', 1, 2000.00, '2023-04-03 00:00:00', 32);
INSERT INTO `pet` VALUES (60, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多2', '2', '2', '8', '狗', '拉布拉多', '陈点', 1, 1000.00, '2023-04-05 00:00:00', 33);
INSERT INTO `pet` VALUES (61, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '德牧2', '1', '2', '10', '狗', '德牧', '刘咯', 1, 1500.00, '2023-04-06 00:00:00', 34);
INSERT INTO `pet` VALUES (62, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '金毛3', '2', '2', '6', '狗', '金毛', '韩冬梅', 1, 1000.00, '2023-04-05 00:00:00', 35);
INSERT INTO `pet` VALUES (63, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '边牧3', '1', '2', '9', '狗', '边牧', '刘星', 1, 1500.00, '2023-04-06 00:00:00', 36);
INSERT INTO `pet` VALUES (64, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪3', '3', '2', '7', '狗', '泰迪', '康哲', 1, 2000.00, '2023-04-03 00:00:00', 37);
INSERT INTO `pet` VALUES (65, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多3', '2', '2', '8', '狗', '拉布拉多', '陈点', 1, 1000.00, '2023-04-05 00:00:00', 38);
INSERT INTO `pet` VALUES (68, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '泰迪4', '3', '2', '7', '狗', '泰迪', '康哲', 3, 2000.00, '2023-04-03 00:00:00', 39);
INSERT INTO `pet` VALUES (69, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '拉布拉多4', '2', '2', '8', '狗', '拉布拉多', '陈点', 3, 1000.00, '2023-04-05 00:00:00', 40);
INSERT INTO `pet` VALUES (70, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '德牧4', '1', '2', '10', '狗', '德牧', '刘咯', 3, 1500.00, '2023-04-06 00:00:00', 41);
INSERT INTO `pet` VALUES (71, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '大金毛', '2', '2', '6', '狗', '金毛', 'luohai', 0, 2222.00, '2023-06-21 17:26:52', 88);
INSERT INTO `pet` VALUES (72, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '小金毛', '2', '2', '6', '狗', '金毛', 'luohai', 0, 2244.00, '2023-06-21 18:32:10', 88);
INSERT INTO `pet` VALUES (73, '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg', '大大大金毛', '2', '2', '6', '狗', '金毛', 'luohai', 0, 500.00, '2023-06-21 18:35:30', 88);

-- ----------------------------
-- Table structure for pet_admin
-- ----------------------------
DROP TABLE IF EXISTS `pet_admin`;
CREATE TABLE `pet_admin`  (
  `d_id` int NOT NULL,
  `d_admin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `d_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`d_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet_admin
-- ----------------------------
INSERT INTO `pet_admin` VALUES (1, 'admin', '123456');

-- ----------------------------
-- Table structure for pet_bkind
-- ----------------------------
DROP TABLE IF EXISTS `pet_bkind`;
CREATE TABLE `pet_bkind`  (
  `bkid` int NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `bkindname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型名称',
  PRIMARY KEY (`bkid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet_bkind
-- ----------------------------
INSERT INTO `pet_bkind` VALUES (1, '猫咪');
INSERT INTO `pet_bkind` VALUES (2, '狗狗');
INSERT INTO `pet_bkind` VALUES (3, '其他');

-- ----------------------------
-- Table structure for pet_breed
-- ----------------------------
DROP TABLE IF EXISTS `pet_breed`;
CREATE TABLE `pet_breed`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增 id',
  `bkind` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物类型（1 猫，2 狗）',
  `bkindname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `bkid` int NOT NULL,
  `skind` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物品种',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bkind`(`bkind`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '宠物品种表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet_breed
-- ----------------------------
INSERT INTO `pet_breed` VALUES (1, '1', '猫', 1, '蓝猫');
INSERT INTO `pet_breed` VALUES (2, '1', '猫', 1, '金渐层');
INSERT INTO `pet_breed` VALUES (3, '1', '猫', 1, '银渐层');
INSERT INTO `pet_breed` VALUES (4, '1', '猫', 1, '布偶猫');
INSERT INTO `pet_breed` VALUES (5, '1', '猫', 1, '波斯猫');
INSERT INTO `pet_breed` VALUES (6, '2', '狗', 2, '金毛');
INSERT INTO `pet_breed` VALUES (7, '2', '狗', 2, '泰迪');
INSERT INTO `pet_breed` VALUES (8, '2', '狗', 2, '拉布拉多');
INSERT INTO `pet_breed` VALUES (9, '2', '狗', 2, '边牧');
INSERT INTO `pet_breed` VALUES (10, '2', '狗', 2, '德牧');

-- ----------------------------
-- Table structure for pet_po
-- ----------------------------
DROP TABLE IF EXISTS `pet_po`;
CREATE TABLE `pet_po`  (
  `poid` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `uid` int NOT NULL COMMENT '购买用户id  外键',
  `pid` int NOT NULL COMMENT '宠物ID 外键',
  `puid` int NOT NULL COMMENT '宠物提供者id',
  `price` decimal(10, 2) NOT NULL COMMENT '订单价格',
  `petname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `postatu` enum('0','1','2','3','4') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT ' 0 进行中  1  已完成 2已取消 3修改中 4取消中',
  `recipientname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货人',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '收货地址',
  `date` date NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物图片',
  PRIMARY KEY (`poid`) USING BTREE,
  INDEX `FK-name`(`recipientname`) USING BTREE,
  INDEX `FK-uid`(`uid`) USING BTREE,
  INDEX `FK-puid`(`puid`) USING BTREE,
  INDEX `FK-price`(`price`) USING BTREE,
  INDEX `FK-phone`(`phone`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet_po
-- ----------------------------
INSERT INTO `pet_po` VALUES (1, 84, 38, 11, 1500.00, '边牧1', '15768810056', '0', 'luohai', '北京市海淀区西三旗街道华严里10号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (2, 84, 39, 12, 2000.00, '泰迪1', '15090610092', '1', '黄九', '上海市浦东新区陆家嘴街道浦建路88号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (3, 84, 40, 13, 1000.00, '拉布拉多1', '17754521384', '1', '张山', '广州市天河区珠江新城街道花城汇11号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (4, 88, 41, 14, 1500.00, '德牧1', '13748810416', '1', '刘玉', '深圳市南山区科技园街道科兴科学院12号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (5, 88, 42, 15, 2000.00, '金毛2', '15780039412', '2', '王明明', '杭州市西湖区文三路街道西溪湿地公园13号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (6, 88, 43, 16, 1500.00, '边牧2', '17714056964', '2', '秦笑', '成都市武侯区高新南区街道天府软件园14号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (7, 88, 44, 17, 2000.00, '泰迪2', '157800559412', '3', '林国化', '武汉市洪山区关山街道光谷广场15号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (8, 88, 45, 18, 1000.00, '拉布拉多2', '17714055964', '4', '高明', '南京市江宁区秣陵街道江苏软件园16号', '2023-04-15', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (24, 88, 44, 17, 2000.00, '泰迪2', '15329613234', '0', '陈书', '成都市高新区天府大道北段666号', '2023-06-20', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (25, 88, 44, 17, 2000.00, '泰迪2', '15329613234', '0', '陈书', '成都市高新区天府大道北段666号', '2023-06-20', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (26, 88, 37, 10, 1000.00, '金毛1', '15329613234', '0', '陈书', '成都市高新区天府大道北段666号', '2023-06-21', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');
INSERT INTO `pet_po` VALUES (27, 88, 39, 12, 2000.00, '泰迪1', '15329613234', '0', '陈书', '成都市高新区天府大道北段666号', '2023-06-22', '0b3cd2ff-4b5d-416d-8c3a-fd42c2288cf1.jpeg');

-- ----------------------------
-- Table structure for pet_skind
-- ----------------------------
DROP TABLE IF EXISTS `pet_skind`;
CREATE TABLE `pet_skind`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增 id',
  `bkid` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物类型id（1 猫，2 狗, 3 其他）',
  `bkindname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物类型',
  `skindname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物品种',
  `skid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '宠物品种id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `bkid`(`bkid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '宠物品种表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet_skind
-- ----------------------------
INSERT INTO `pet_skind` VALUES (14, '1', '猫', '蓝猫', '1');
INSERT INTO `pet_skind` VALUES (15, '1', '猫', '金渐层', '2');
INSERT INTO `pet_skind` VALUES (16, '1', '猫', '银渐层', '3');
INSERT INTO `pet_skind` VALUES (17, '1', '猫', '布偶猫', '4');
INSERT INTO `pet_skind` VALUES (18, '1', '猫', '波斯猫', '5');
INSERT INTO `pet_skind` VALUES (19, '2', '狗', '金毛', '6');
INSERT INTO `pet_skind` VALUES (20, '2', '狗', '泰迪', '7');
INSERT INTO `pet_skind` VALUES (21, '2', '狗', '拉布拉多', '8');
INSERT INTO `pet_skind` VALUES (22, '2', '狗', '边牧', '9');
INSERT INTO `pet_skind` VALUES (23, '2', '狗', '德牧', '10');
INSERT INTO `pet_skind` VALUES (24, '3', '其它', '其他', '11');
INSERT INTO `pet_skind` VALUES (25, '3', '其它', '其他', '12');
INSERT INTO `pet_skind` VALUES (26, '3', '其它', '其他', '13');

-- ----------------------------
-- Table structure for pet_type
-- ----------------------------
DROP TABLE IF EXISTS `pet_type`;
CREATE TABLE `pet_type`  (
  `p_type_id` int NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `p_type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型名称',
  PRIMARY KEY (`p_type_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pet_type
-- ----------------------------
INSERT INTO `pet_type` VALUES (1, '猫咪');
INSERT INTO `pet_type` VALUES (2, '狗狗');
INSERT INTO `pet_type` VALUES (3, '其他');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uid` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `telphone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `idcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '身份证号码',
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '真实姓名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`uid`) USING BTREE,
  INDEX `realname`(`realname`) USING BTREE,
  INDEX `telphone`(`telphone`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 89 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (84, '测试', '15768810056', '440882199001011234', 'luohai', '123456', 'e7495cb7-85a3-4e80-90da-c8373640a8fa.jpg');
INSERT INTO `user` VALUES (85, 'qiujie', '17754521384', '44652001040601011131', '黄秋杰', '123321', 'e7495cb7-85a3-4e80-90da-c8373640a8fa.jpg');
INSERT INTO `user` VALUES (87, 'sz', '13325280332', '445233200302023396', '刘军', '123456', 'e7495cb7-85a3-4e80-90da-c8373640a8fa.jpg');
INSERT INTO `user` VALUES (88, 'luohai', '13322035123', '445520200003021147', 'lll', 'admin', 'c9c9c704-e4df-4ed2-9ce9-273b2d4dcc73.jpg');

SET FOREIGN_KEY_CHECKS = 1;
