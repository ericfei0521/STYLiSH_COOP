-- MySQL dump 10.13  Distrib 5.7.18, for macos10.12 (x86_64)
--
-- Host: localhost    Database: stylish_test
-- ------------------------------------------------------
-- Server version	5.7.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `picture` varchar(255) NOT NULL,
  `story` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product_id`),
  CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,1,'keyvisual.jpg','測試1'),(2,2,'keyvisual.jpg','測試2'),(3,3,'keyvisual.jpg','測試3');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot`
--

DROP TABLE IF EXISTS `hot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hot` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot`
--

LOCK TABLES `hot` WRITE;
/*!40000 ALTER TABLE `hot` DISABLE KEYS */;
INSERT INTO `hot` VALUES (1,'hot1'),(2,'hot2'),(3,'new hots'),(4,'new hots');
/*!40000 ALTER TABLE `hot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hot_product`
--

DROP TABLE IF EXISTS `hot_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hot_product` (
  `hot_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`hot_id`,`product_id`),
  KEY `product` (`product_id`),
  CONSTRAINT `hot_product_ibfk_1` FOREIGN KEY (`hot_id`) REFERENCES `hot` (`id`),
  CONSTRAINT `hot_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hot_product`
--

LOCK TABLES `hot_product` WRITE;
/*!40000 ALTER TABLE `hot_product` DISABLE KEYS */;
INSERT INTO `hot_product` VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(3,2),(4,2),(1,3),(3,3),(4,3),(2,4);
/*!40000 ALTER TABLE `hot_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_table` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `time` bigint(20) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL,
  `details` json NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`),
  CONSTRAINT `order_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table`
--

LOCK TABLES `order_table` WRITE;
/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;
INSERT INTO `order_table` VALUES (1,'54218103205',1591250610320,0,'{\"list\": [{\"id\": 1, \"qty\": 1, \"name\": \"前開衩扭結洋裝\", \"size\": \"S\", \"color\": {\"code\": \"FFFFFF\", \"name\": \"白色\"}, \"price\": 1000, \"stock\": 2, \"main_image\": \"https://test/1/main.jpg\"}], \"total\": 1060, \"freight\": 60, \"payment\": \"credit_card\", \"shipping\": \"delivery\", \"subtotal\": 1000, \"recipient\": {\"name\": \"test\", \"time\": \"anytime\", \"email\": \"test@gmail.com\", \"phone\": \"0912345678\", \"address\": \"testaddress\"}}',1,NULL),(2,'54218103269',1591250610326,0,'{\"list\": [{\"id\": 1, \"qty\": 1, \"name\": \"前開衩扭結洋裝\", \"size\": \"S\", \"color\": {\"code\": \"FFFFFF\", \"name\": \"白色\"}, \"price\": 1000, \"stock\": 2, \"main_image\": \"https://test/1/main.jpg\"}], \"total\": 1060, \"freight\": 60, \"payment\": \"credit_card\", \"shipping\": \"delivery\", \"subtotal\": 1000, \"recipient\": {\"name\": \"test\", \"time\": \"anytime\", \"email\": \"test@gmail.com\", \"phone\": \"0912345678\", \"address\": \"testaddress\"}}',1,NULL),(3,'54218103352',1591250610335,0,'{\"list\": [{\"id\": 1, \"qty\": 1, \"name\": \"前開衩扭結洋裝\", \"size\": \"S\", \"color\": {\"code\": \"FFFFFF\", \"name\": \"白色\"}, \"price\": 1000, \"stock\": 2, \"main_image\": \"https://test/1/main.jpg\"}], \"total\": 1060, \"freight\": 60, \"payment\": \"credit_card\", \"shipping\": \"delivery\", \"subtotal\": 1000, \"recipient\": {\"name\": \"test\", \"time\": \"anytime\", \"email\": \"test@gmail.com\", \"phone\": \"0912345678\", \"address\": \"testaddress\"}}',NULL,NULL);
/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `details` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_table` (`order_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,2,'{\"msg\": \"Success\", \"amount\": 8056, \"status\": 0, \"acquirer\": \"TW_CTBC\", \"currency\": \"TWD\", \"auth_code\": \"132481\", \"card_info\": {\"type\": 1, \"level\": \"\", \"issuer\": \"\", \"bank_id\": \"\", \"country\": \"UNITED KINGDOM\", \"funding\": 0, \"bin_code\": \"424242\", \"last_four\": \"4242\", \"country_code\": \"GB\", \"issuer_zh_tw\": \"\"}, \"merchant_id\": \"AppWorksSchool_CTBC\", \"order_number\": \"\", \"rec_trade_id\": \"D20200210eKvZyv\", \"bank_result_msg\": \"\", \"card_identifier\": \"dee921560b074be7a860a6b44a80c21b\", \"bank_result_code\": \"\", \"bank_transaction_id\": \"TP20200210eKvZyv\", \"bank_transaction_time\": {\"end_time_millis\": \"1581325720251\", \"start_time_millis\": \"1581325720251\"}, \"transaction_time_millis\": 1581325720207}'),(2,3,'{\"msg\": \"Success\", \"amount\": 8056, \"status\": 0, \"acquirer\": \"TW_CTBC\", \"currency\": \"TWD\", \"auth_code\": \"132481\", \"card_info\": {\"type\": 1, \"level\": \"\", \"issuer\": \"\", \"bank_id\": \"\", \"country\": \"UNITED KINGDOM\", \"funding\": 0, \"bin_code\": \"424242\", \"last_four\": \"4242\", \"country_code\": \"GB\", \"issuer_zh_tw\": \"\"}, \"merchant_id\": \"AppWorksSchool_CTBC\", \"order_number\": \"\", \"rec_trade_id\": \"D20200210eKvZyv\", \"bank_result_msg\": \"\", \"card_identifier\": \"dee921560b074be7a860a6b44a80c21b\", \"bank_result_code\": \"\", \"bank_transaction_id\": \"TP20200210eKvZyv\", \"bank_transaction_time\": {\"end_time_millis\": \"1581325720251\", \"start_time_millis\": \"1581325720251\"}, \"transaction_time_millis\": 1581325720207}');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(127) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `texture` varchar(127) NOT NULL,
  `wash` varchar(127) NOT NULL,
  `place` varchar(127) NOT NULL,
  `note` varchar(127) NOT NULL,
  `story` text NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'men','product1','Product 1',100,'pt1','pw1','pp1','pn1','ps1','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(2,'women','product2','Product 2',200,'pt2','pw2','pp2','pn2','ps2','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(3,'men','product3','Product 3',300,'pt3','pw3','pp3','pn3','ps3','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(4,'accessories','product4','Product 4',400,'pt4','pw4','pp4','pn4','ps4','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(5,'accessories','product5','Product 5',500,'pt5','pw5','pp5','pn5','ps5','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(6,'accessories','product6','Product 6',600,'pt6','pw6','pp6','pn6','ps6','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(7,'women','product7','Product 7',700,'pt7','pw7','pp7','pn7','ps7','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(8,'men','product8','Product 8',800,'pt8','pw8','pp8','pn8','ps8xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(9,'men','product9','Product 9',900,'pt9','pw9','pp9','pn9','ps9xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(10,'men','test searchkey product10','Product 10',1000,'pt10','pw10','pp10','pn10','ps10xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(11,'men','test searchkey product11','Product 11',1100,'pt11','pw11','pp11','pn11','ps11xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(12,'men','test searchkey product12','Product 12',1200,'pt12','pw12','pp12','pn12','ps12xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(13,'men','test searchkey product13','Product 13',1300,'pt13','pw13','pp13','pn13','ps13xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),(14,'men','test searchkey product14','Product 14',1400,'pt14','pw14','pp14','pn14','ps14xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(127) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) NOT NULL,
  `access_expired` bigint(20) unsigned NOT NULL,
  `login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`provider`,`email`,`password`),
  KEY `access_token` (`access_token`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'native','test1@gmail.com','$2b$10$xQIXLgeIpnFP4KGWSdA8jOqWuipfoBbiU16ThGpMtDbwtiG1wVasO','test1',NULL,'7b2dfc63af604278a796c946ee3f8f2ddafbf82669f0b8cee620849500fe1690',2592000,'2020-06-04 06:03:31'),(2,'facebook','test2@gmail.com',NULL,'test2','https://graph.facebook.com/1/picture?type=large','fbTokenLoginAgain',2592000,'2020-06-04 06:03:31'),(3,'native','test3@gmail.com','$2b$10$BHnLMkdhyb5zWNAowa6wheBwnpTWQr13AhYH0SDk092o1wsabl3VC','test3',NULL,'test3accesstoken',0,'2020-01-01 00:00:00'),(4,'native','arthur@gmail.com','$2b$10$JBuA1TBA7/1Wb7ImolwMt.5CMdIfzq0UUJ743oejniesD5/MhWefW','arthur',NULL,'2c4a2c1107d3f860b0f8bb7c5c4ad1f3173c5b0960b9885717933a3f5ef898ea',2592000,'2020-06-04 06:03:30'),(5,'facebook','fakefbuser@gmail.com',NULL,'fake fb user','https://graph.facebook.com/1111/picture?type=large','fbTokenFirstLogin',2592000,'2020-06-04 06:03:31');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variant` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `color_code` varchar(15) NOT NULL,
  `color_name` varchar(15) NOT NULL,
  `size` varchar(15) NOT NULL,
  `stock` int(10) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product_id`),
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (1,'FFFFFF','白色','S',2,1),(2,'FFFFFF','白色','M',5,1),(3,'DDFFBB','亮綠','S',2,1),(4,'FFFFFF','白色','S',2,2),(5,'DDFFBB','亮綠','L',2,2);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-22 16:33:21
