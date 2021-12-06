/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `bills` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `table_id` int NOT NULL,
  `uid` varchar(36) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `checkout_at` bigint NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`bill_id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `table_id` (`table_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`table_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `custom_ramens` (
  `ramen_id` int NOT NULL AUTO_INCREMENT,
  `price` decimal(12,2) NOT NULL,
  `soup_type` int NOT NULL,
  `noodle` int NOT NULL,
  `spring_onion` int NOT NULL,
  `garlic` int NOT NULL,
  `spice` int NOT NULL,
  `chashu` int NOT NULL,
  `richness` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`ramen_id`),
  UNIQUE KEY `soup_type` (`soup_type`,`noodle`,`spring_onion`,`garlic`,`spice`,`chashu`,`richness`),
  KEY `noodle` (`noodle`),
  KEY `spring_onion` (`spring_onion`),
  KEY `garlic` (`garlic`),
  KEY `spice` (`spice`),
  KEY `chashu` (`chashu`),
  KEY `richness` (`richness`),
  CONSTRAINT `custom_ramens_ibfk_1` FOREIGN KEY (`soup_type`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_ramens_ibfk_2` FOREIGN KEY (`noodle`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_ramens_ibfk_3` FOREIGN KEY (`spring_onion`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_ramens_ibfk_4` FOREIGN KEY (`garlic`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_ramens_ibfk_5` FOREIGN KEY (`spice`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_ramens_ibfk_6` FOREIGN KEY (`chashu`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `custom_ramens_ibfk_7` FOREIGN KEY (`richness`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `info_main_menus` (
  `product_id` int NOT NULL,
  `language` varchar(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`product_id`,`language`),
  CONSTRAINT `info_main_menus_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `main_menus` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `info_ramen_choices` (
  `choice_id` int NOT NULL,
  `language` varchar(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`choice_id`,`language`),
  CONSTRAINT `info_ramen_choices_ibfk_1` FOREIGN KEY (`choice_id`) REFERENCES `ramen_choices` (`choice_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `main_menus` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_menus` (
  `order_menu_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `ramen_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`order_menu_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `ramen_id` (`ramen_id`),
  CONSTRAINT `order_menus_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_menus_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `main_menus` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_menus_ibfk_3` FOREIGN KEY (`ramen_id`) REFERENCES `custom_ramens` (`ramen_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int NOT NULL,
  `status` varchar(10) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `bill_id` (`bill_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`bill_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ramen_choices` (
  `choice_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`choice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tables` (
  `table_id` int NOT NULL AUTO_INCREMENT,
  `guest_uid` varchar(36) NOT NULL,
  `reserve` tinyint(1) NOT NULL,
  `call_waiter` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` bigint NOT NULL,
  `updated_at` bigint NOT NULL,
  PRIMARY KEY (`table_id`),
  UNIQUE KEY `guest_uid` (`guest_uid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `bills` (`bill_id`, `table_id`, `uid`, `subtotal`, `status`, `checkout_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'cdaed734-1468-4017-8635-50e933ae1999', 880.00, 1, 0, 1638544869956, 1638546094904);
INSERT INTO `bills` (`bill_id`, `table_id`, `uid`, `subtotal`, `status`, `checkout_at`, `created_at`, `updated_at`) VALUES
(2, 2, '3f76f6b3-3b85-4c5f-a654-2bfba52eb63d', 455.00, 1, 0, 1638545303293, 1638545397427);
INSERT INTO `bills` (`bill_id`, `table_id`, `uid`, `subtotal`, `status`, `checkout_at`, `created_at`, `updated_at`) VALUES
(3, 3, '17854676-dde0-412e-89a9-133306f8b09f', 327.00, 1, 0, 1638546690011, 1638546754425);

INSERT INTO `custom_ramens` (`ramen_id`, `price`, `soup_type`, `noodle`, `spring_onion`, `garlic`, `spice`, `chashu`, `richness`, `status`, `created_at`, `updated_at`) VALUES
(1, 169.00, 2, 24, 5, 9, 14, 18, 21, 1, 1638545111457, 1638545111457);
INSERT INTO `custom_ramens` (`ramen_id`, `price`, `soup_type`, `noodle`, `spring_onion`, `garlic`, `spice`, `chashu`, `richness`, `status`, `created_at`, `updated_at`) VALUES
(2, 169.00, 3, 25, 6, 7, 11, 16, 19, 1, 1638545162422, 1638545162422);
INSERT INTO `custom_ramens` (`ramen_id`, `price`, `soup_type`, `noodle`, `spring_onion`, `garlic`, `spice`, `chashu`, `richness`, `status`, `created_at`, `updated_at`) VALUES
(3, 169.00, 3, 22, 5, 10, 15, 18, 21, 1, 1638546733925, 1638546733925);
INSERT INTO `custom_ramens` (`ramen_id`, `price`, `soup_type`, `noodle`, `spring_onion`, `garlic`, `spice`, `chashu`, `richness`, `status`, `created_at`, `updated_at`) VALUES
(4, 169.00, 2, 25, 6, 10, 13, 18, 21, 1, 1638546754405, 1638546754405);

INSERT INTO `info_main_menus` (`product_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'en', 'Karaage chicken', 'Appetizer', 'Chicken karaage essentially bite-size chicken thigh dusted with flour and deep-fried in hot oil.', 1, 1637853454084, 1637853454084);
INSERT INTO `info_main_menus` (`product_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'jp', 'チキンから揚げ', '前菜', '鶏のから揚げは、鶏の太ももを衣で揚げ、ラー油で揚げたものです。鶏肉のマリネとジューシーな味わい', 1, 1637853454084, 1637853454084);
INSERT INTO `info_main_menus` (`product_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'th', 'ไก่คาราเกะ', 'อาหารเรียกน้ำย่อย', 'ไก่คาราเกะ เป็นไก่ทอดส่วนต้นขาชุบแป้งทอดด้วยน้ำมันร้อนจัดด้วยรสชาติของไก่ที่หมักและชุ่มฉ่ำ', 1, 1637853454084, 1637853454084);
INSERT INTO `info_main_menus` (`product_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(2, 'en', 'Spicy chashu salad', 'Appetizer', 'Juicy chashu brasied with our secret sauce. With spring onion mix with spicy sesame oil.', 1, 1637853559578, 1637853559578),
(2, 'jp', 'スパイシーなチャーシューサラダ', '前菜', 'シークレットソースで煮込んだジューシーなチャーシュー。 ねぎ入り辛いごま油と混ぜる。', 1, 1637853559578, 1637853559578),
(2, 'th', 'สลัดหมูชาชูรสเผ็ด', 'อาหารเรียกน้ำย่อย', 'ชาชูที่ชุ่มฉ่ำนำไปตุ๋นกับ ซอสสุดพิเศษ ด้วยต้นหอมญี่ปุ่น คลุกเคล้าด้วยน้ำมันงารสเผ็ด', 1, 1637853559578, 1637853559578),
(3, 'en', 'Seaweed salad', 'Appetizer', 'Seaweed salad or wakame one of the best starter on our resturant.', 1, 1637853680348, 1637853680348),
(3, 'jp', '海藻サラダ', '前菜', '海苔サラダまたはわかめは、日本人の最高のスターターの1つです レストラン。', 1, 1637853680349, 1637853680349),
(3, 'th', 'สลัดสาหร่าย', 'อาหารเรียกน้ำย่อย', 'สลัดสาหร่ายหรือวากาเมะ หนึ่งในอาหารเรียกน้ำย่อยที่ดีที่สุดในร้านของเรา', 1, 1637853680348, 1637853680349),
(4, 'en', 'Gyoza', 'Appetizer', 'Gyoza or Japanese pan-fried dumplings has juicy inside and brown crispy outside.', 1, 1637853801319, 1637853801319),
(4, 'jp', '餃子', '前菜', 'ぎょうざは外はサクサク、中は柔らかくジューシー。', 1, 1637853801319, 1637853801319),
(4, 'th', 'เกี๊ยวซ่า', 'อาหารเรียกน้ำย่อย', 'เกี๊ยวซ่า หรือเกี๊ยวทอดสไตล์ญี่ปุ่น มีความกรอบนอกนุ่มชุ่มฉ่ำข้างใน', 1, 1637853801319, 1637853801319),
(5, 'en', 'Edamame', 'Appetizer', 'Fresh edamame steam served with salt.', 1, 1637853875476, 1637853875476),
(5, 'jp', '枝豆 ', '前菜', '新鮮な枝豆の塩漬け 。', 1, 1637853875476, 1637853875476),
(5, 'th', 'ถั่วแระญี่ปุ่น', 'อาหารเรียกน้ำย่อย', 'ถั่วแระญี่ปุ่นสดๆนึ่ง เสิร์ฟกับเกลือ', 1, 1637853875476, 1637853875476),
(6, 'en', 'Ebi roll', 'Appetizer', 'Deep fried shrimp spring rolls serve with mayonnaise.', 1, 1637854061861, 1637854061861),
(6, 'jp', 'エビフライの春巻き', '前菜', 'エビフライの春巻きにマヨネーズを添えて 。', 1, 1637854061861, 1637854061861),
(6, 'th', 'ปอเปี๊ยะกุ้ง', 'อาหารเรียกน้ำย่อย', 'ปอเปี๊ยะกุ้งทอดกรอบ เสิร์ฟพร้อมกับมายองเนส', 1, 1637854061861, 1637854061861),
(7, 'en', 'Takoyaki', 'Appetizer', 'Takoyaki is a round-shape of batter filled with octopus and other ingredients topped with sauce and dried fish.', 1, 1637854230588, 1637854230588),
(7, 'jp', 'たこ焼き', '前菜', 'たこ焼きは、タコなどを詰めた丸い生地です。ソースと干物をトッピングした具材。', 1, 1637854230588, 1637854230588),
(7, 'th', 'ทาโกะยากิ', 'อาหารเรียกน้ำย่อย', 'ทาโกะยากิเป็นอาหารที่เป็นแป้งกรอบรูปร่างกลม เติมเต็มด้วยปลาหมึกและวัตถุดิบอื่นๆ ท๊อปด้วยซอสและปลาแห้ง', 1, 1637854230588, 1637854230588),
(8, 'en', 'Teriyaki Chicken', 'Appetizer', 'Boneless chicken thigh that marinade over night and fried with teriyaki sauce.', 1, 1637854311034, 1637854311034),
(8, 'jp', '照り焼きチキン', '前菜', '一晩マリネして揚げた骨なし鶏もも肉テリヤキソース 。', 1, 1637854311034, 1637854311034),
(8, 'th', 'ไก่เทอริยากิ', 'อาหารเรียกน้ำย่อย', 'ไก่ไม่มีกระดูกส่วนต้นขาที่ทำการหมักข้ามคืน นำมาทอดกับซอสเทอริยากิ', 1, 1637854311034, 1637854311034),
(9, 'en', 'Pudding', 'Dessert', 'Soft custard served with caramel sauce on top.', 1, 1637854805364, 1637854805364),
(9, 'jp', 'プリン', 'デザート ', 'キャラメルソースをのせたソフトカスタード 。', 1, 1637854805364, 1637854805364),
(9, 'th', 'พุดดิ้ง', 'ของหวาน', 'คัสตาร์ดนุ่มลิ้น เสิร์ฟพร้อมกับซอสคาราเมลส่วนบน', 1, 1637854805364, 1637854805364),
(10, 'en', 'Matcha mochi', 'Dessert', 'Home-made chewy mochi with matcha flavour.', 1, 1637854904803, 1637854904803),
(10, 'jp', '抹茶大福', 'デザート ', '抹茶風味の自家製もちもち  。', 1, 1637854904803, 1637854904803),
(10, 'th', 'โมจิชาเขียว', 'ของหวาน', 'โมจิชาเขียวเหนียวนุ่มแบบโฮมเมด', 1, 1637854904803, 1637854904803),
(11, 'en', 'Matcha icecream', 'Dessert', 'Home-made matcha icecream. Leaves imported from Shizuoka.', 1, 1637855126735, 1637855126735),
(11, 'jp', '抹茶アイス ', 'デザート ', '自家製抹茶アイス。 静岡から輸入した葉 。', 1, 1637855126735, 1637855126735),
(11, 'th', 'ไอศกรีมมัทฉะ', 'ของหวาน', 'ไอศกรีมมัทฉะโฮมเมด ใบชานำเข้าจากชิสุโอกะ', 1, 1637855126735, 1637855126735),
(12, 'en', 'Vanilla icecream', 'Dessert', 'Home-made vanilla icecream. Milk imported from Hokkaido.', 1, 1637855236787, 1637855236787),
(12, 'jp', 'バニラアイスクリーム ', 'デザート ', 'バニラアイスクリーム 。', 1, 1637855236787, 1637855236787),
(12, 'th', 'ไอศกรีมวานิลา', 'ของหวาน', 'ไอศกรีมวานิลาโฮมเมด นมนำเข้าจากฮกไกโด', 1, 1637855236787, 1637855236787),
(13, 'en', 'Panna Cotta', 'Dessert', 'Home-made Panna cotta on top with strawberry compote.', 1, 1637855309819, 1637855309819),
(13, 'jp', 'パンナコッタ  ', 'デザート ', 'いちごのコンポートをのせた自家製パンナコッタ 。', 1, 1637855309819, 1637855309819),
(13, 'th', 'พานาคอตต้า', 'ของหวาน', 'พานาคอตต้าโฮมเมดราดด้วยสตรอว์เบอร์รี่แช่อิ่ม ', 1, 1637855309819, 1637855309819),
(14, 'en', 'Green tea (Hot)', 'Beverage', 'Hot green tea import from Shizuoka.', 1, 1637855700281, 1637855700281),
(14, 'jp', '熱い緑茶', '飲料', '静岡から輸入した温かい緑茶、茶葉。', 1, 1637855700281, 1637855700281),
(14, 'th', 'ชาเขียวร้อน', 'เครื่องดื่ม', 'ชาเขียวร้อน ใบชานำเข้าจากชิสุโอกะ ', 1, 1637855700281, 1637855700281),
(15, 'en', 'Green tea (Cold)', 'Beverage', 'Cold green tea import from Shizuoka.', 1, 1637855860188, 1637855860188),
(15, 'jp', 'アイスティー ', '飲料', 'アイスティー、静岡から輸入した茶葉。', 1, 1637855860188, 1637855860188),
(15, 'th', 'ชาเขียวเย็น', 'เครื่องดื่ม', 'ชาเขียวเย็น ใบชานำเข้าจากชิสุโอกะ', 1, 1637855860188, 1637855860188),
(16, 'en', 'Coke', 'Beverage', '1 can of coke 325 mL.', 1, 1637855941603, 1637855941603),
(16, 'jp', 'コークス ', '飲料', 'コーラ325mlの1缶。', 1, 1637855941603, 1637855941603),
(16, 'th', 'โค้ก', 'เครื่องดื่ม', 'โค้ก1กระป๋อง ขนาด 325ml', 1, 1637855941603, 1637855941603),
(17, 'en', 'Coke zero', 'Beverage', '1 can of coke zero 325 mL.', 1, 1637856006802, 1637856006802),
(17, 'jp', 'コークス ', '飲料', 'コークスゼロ325mlの1缶。', 1, 1637856006802, 1637856006802),
(17, 'th', 'โค้ก ซีโร่', 'เครื่องดื่ม', 'โค้ก ซีโร่ 1กระป๋อง ขนาด 325ml', 1, 1637856006802, 1637856006802),
(18, 'en', 'Water', 'Beverage', '1 bottle of water 600ml.', 1, 1637856070278, 1637856070278),
(18, 'jp', '水 ', '飲料', 'ミネラルウォーター1本600ml 。', 1, 1637856070278, 1637856070278),
(18, 'th', 'น้ำเปล่า', 'เครื่องดื่ม', 'น้ำเปล่า1ขวด ขนาด 600ml', 1, 1637856070278, 1637856070278),
(19, 'en', 'Lean Chashu', 'Extra', 'Specially Selected Chashu Pork It\'s a small type, suitable for healthy people.', 1, 1637883096070, 1637883096070),
(19, 'jp', 'リトルチャーシューポーク', '特別な', '厳選されたチャーシューポーク 健康な方に適した小型タイプです。', 1, 1637883096070, 1637883096070),
(19, 'th', 'หมูชาชูมันน้อย', 'พิเศษ', 'หมูชาชูคัดสรรพิเศษ แบบมันน้อยเหมาะสำหรับสายเฮลตี้', 1, 1637883096070, 1637883096070),
(20, 'en', 'Fatty Chashu', 'Extra', 'Specially Selected Chashu Pork It\'s a lot. It\'s satisfying. It\'s delicious for sure.', 1, 1637883301136, 1637883301136),
(20, 'jp', '脂肪チャーシュー', '特別な', '厳選されたチャーシューポーク たくさんあり、満足です。確かに美味しいです。', 1, 1637883301136, 1637883301136),
(20, 'th', 'หมูชาชูมันเยอะ', 'พิเศษ', 'หมูชาชูคัดสรรพิเศษ แบบมันเยอะมันจุใจอร่อยชัวร์', 1, 1637883301136, 1637883301136),
(21, 'en', 'Spring Onion', 'Extra', 'Onions imported from Japan. Smells good and looks good.', 1, 1637883406226, 1637883406226),
(21, 'jp', 'ネギ', '特別な', '日本から輸入した玉ねぎ いいにおいがして、よく見えます。', 1, 1637883406226, 1637883406226),
(21, 'th', 'ต้มหอม', 'พิเศษ', 'ต้นหอมนำเข้าจากประเทศญี่ปุ่น กลิ่นหอมและดูดี', 1, 1637883406226, 1637883406226),
(22, 'en', 'Boil Egg', 'Extra', 'Onsen Boiled Egg Ripe on the outside, greasy on the inside.', 1, 1637884095946, 1637884095946),
(22, 'jp', 'ゆで卵', '特別な', '温泉ゆで卵 外側は熟しており、内側は脂っこい。', 1, 1637884095946, 1637884095946),
(22, 'th', 'ไข่ออนเซ็นต้ม', 'พิเศษ', 'ไข่ออนเซ็นต้ม ข้างนอกสุกข้างในเยิ้มๆ', 1, 1637884095946, 1637884095946),
(23, 'en', 'Jew\'s Ear Mushroom', 'Extra', 'Jew\'s Ear Mushroom special recipe for our shop. Until the Sir have to say that it\'s noble, very noble.', 1, 1637884198925, 1637884198925),
(23, 'jp', 'キクラゲ', '特別な', 'きのこ当店の特別レシピ。 足音がそれが高貴であると言わなければならないまで、非常に高貴です。', 1, 1637884198925, 1637884198925),
(23, 'th', 'เห็ดหูหนู', 'พิเศษ', 'เห็ดหูหนูสูตรพิเศษสำหรับร้านเรา จนไต้เท้าต้องบอกว่าประเสริฐ ประเสริฐมาก', 1, 1637884198925, 1637884198925),
(24, 'en', 'Seaweed', 'Extra', 'Add seaweed imported from the Andaman Sea, underwater 200 meters deep.', 1, 1637884296500, 1637884296500),
(24, 'jp', '海藻', '特別な', 'アンダマン海から輸入した海藻を深さ200メートルの水中に追加します。', 1, 1637884296500, 1637884296500),
(24, 'th', 'สาหร่าย', 'พิเศษ', 'เพิ่มสาหร่าย นำเข้าจากทะเลอันดามันใต้ทะเลลึก 200 เมตร', 1, 1637884296500, 1637884296500),
(25, 'en', 'Extra Noodle', 'Extra', 'Order more lines (please specify thickness)', 1, 1637884382702, 1637884382702),
(25, 'jp', '余分な麺', '特別な', 'より多くの行を注文する （厚さを指定してください）', 1, 1637884382702, 1637884382702),
(25, 'th', 'เพิ่มเส้น', 'พิเศษ', 'สั่งเส้นเพิ่ม (โปรดระบุความหนานุ่ม)', 1, 1637884382702, 1637884382702),
(26, 'en', 'Extra Soup', 'Extra', 'Order more soup to make your day fresh', 1, 1637884462121, 1637884462121),
(26, 'jp', '余分なスープ', '特別な', '心ゆくまで飲むためにもっとスープを注文してください。', 1, 1637884462121, 1637884462121),
(26, 'th', 'เพิ่มซุป', 'พิเศษ', 'สั่งซุปเพิ่มซดให้จุใจ (โปรดระบุรสชาติ)', 1, 1637884462121, 1637884462121),
(27, 'en', 'Tsukemen', 'Ramen', 'Ramen that will separate noodle with the broth', 1, 1637884701386, 1637884701386),
(27, 'jp', 'つけ麺', 'ラーメン', '麺と汁物を別々のボウルに分けたラーメンの一種。', 1, 1637884701386, 1637884701386),
(27, 'th', 'สึเกเม็ง', 'ราเมง', 'ราเม็งประเภทหนึ่งซึ่งจะแยกเส้นกับซุปออกไว้คนละชาม', 1, 1637884701386, 1637884701386),
(28, 'en', 'TomyumKungmen', 'Ramen', 'Ramen\'s broth made of Tom Yum flavour', 1, 1637884800128, 1637884800128),
(28, 'jp', 'トムヤムクン麺', 'ラーメン', 'トムヤムクン味のラーメンスープ', 1, 1637884800128, 1637884800128),
(28, 'th', 'ต้มยำกุ้งเม็ง', 'ราเมง', 'ราเม็งที่มีน้ำซุปรสต้มยำ', 1, 1637884800128, 1637884800128),
(29, 'en', 'Zaru Ramen', 'Ramen', 'Zaru Ramen is a chilled noodle dish made from buckwheat flour and served with soy sauce-based dipping sauce called Tsuyu.', 1, 1637884963651, 1637884963651),
(29, 'jp', 'ザル ら面', 'ラーメン', 'ざるそばは、そば粉を使った冷やし麺で、醤油ベースのツユというディップソースが添えられています。', 1, 1637884963651, 1637884963651),
(29, 'th', 'ซารุ ราเม็ง', 'ราเมง', 'ซารุราเม็งคืออาหารที่มีอุนหภูมิเย็นทำจากแป้งสาลี เสิร์ฟกับซอสถั่วเหลืองไว้สำหรับจิ้ม เรียนว่าซุยุ', 1, 1637884963651, 1637884963651),
(30, 'en', 'Tantanmen', 'Ramen', 'A ramen dish originating from Chinese Sichuan cuisine.', 1, 1637885066342, 1637885066342),
(30, 'jp', '担々麺', 'ラーメン', '中国の四川料理を起源とするラーメン料理。', 1, 1637885066342, 1637885066342),
(30, 'th', 'ตันตันเม็ง', 'ราเมง', 'ราเม็งที่มีต้นนำเกิดมาจากอาหารจีนเสฉวน', 1, 1637885066342, 1637885066342);

INSERT INTO `info_ramen_choices` (`choice_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'en', 'Shoyu Ramen', 'Broth', 'Clear broth made from chicken, pork bone, bonito, or kombu seaweed.', 1, 1637836882425, 1637836882425);
INSERT INTO `info_ramen_choices` (`choice_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'jp', '醤油ラーメン', 'スープ', '鶏肉、豚骨、かつお、昆布の透明なスープ。', 1, 1637836882425, 1637836882425);
INSERT INTO `info_ramen_choices` (`choice_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'th', 'โชยุ ราเมน', 'ซุป', 'น้ำซุปใสที่ปรุงจากโครงไก่ กระดูกหมู ปลาโอ หรือสาหร่ายคอมบุ', 1, 1637836882425, 1637836882425);
INSERT INTO `info_ramen_choices` (`choice_id`, `language`, `name`, `category`, `description`, `status`, `created_at`, `updated_at`) VALUES
(2, 'en', 'Miso Ramen', 'Broth', 'Flavored with pork and chicken broth.', 1, 1637836919875, 1637836919875),
(2, 'jp', '味噌ラーメン', 'スープ', '豚肉とチキンスープで味付け 。', 1, 1637836919875, 1637836919875),
(2, 'th', 'มิโซะ ราเมน', 'ซุป', 'น้ำซุปที่เต็มไปด้วยรสชาติจาก ไก่และหมู ', 1, 1637836919875, 1637836919875),
(3, 'en', 'Tonkotsu Ramen', 'Broth', 'Flavored with pork bones and other ingreidents.', 1, 1637837537147, 1637837537147),
(3, 'jp', '豚骨 ら面', 'スープ', '豚骨などの具材で味付け 。', 1, 1637837537147, 1637837537147),
(3, 'th', 'ทงคตสึ ราเมน', 'ซุป', 'น้ำซุปที่เต็มไปด้วยรสชาติจากกระดูกหมู ', 1, 1637837537147, 1637837537147),
(4, 'en', 'Shio Ramen', 'Broth', 'Flavored with chicken or pork bones, seafood, or dashi.', 1, 1637837792620, 1637837792620),
(4, 'jp', '豚骨 ら面', 'スープ', '鶏骨や豚骨、シーフード、だしで味付け。', 1, 1637837792620, 1637837792620),
(4, 'th', 'ชิโอะ ราเมน', 'ซุป', 'น้ำซุปที่เต็มไปด้วยรสชาติจากไก่, กระดูกหมู, อาหารทะเล และ ดาชิ ', 1, 1637837792620, 1637837792620),
(5, 'en', 'Yes', 'Spring Onion', ' ', 1, 1637838096407, 1637838096407),
(5, 'jp', '戦い ', 'ネギ', ' ', 1, 1637838096407, 1637838096407),
(5, 'th', 'เอา', 'ต้นหอม', ' ', 1, 1637838096407, 1637838096407),
(6, 'en', 'No', 'Spring Onion', ' ', 1, 1637838375840, 1637838375840),
(6, 'jp', '番号', 'ネギ', ' ', 1, 1637838375840, 1637838375840),
(6, 'th', 'ไม่เอา', 'ต้นหอม', ' ', 1, 1637838375840, 1637838375840),
(7, 'en', 'No', 'Garlic', ' ', 1, 1637846586653, 1637846586653),
(7, 'jp', '番号', 'ニンニク', ' ', 1, 1637846586653, 1637846586653),
(7, 'th', 'ไม่เอา', 'กระเทียม', ' ', 1, 1637846586653, 1637846586653),
(8, 'en', '1 tea spoon', 'Garlic', ' ', 1, 1637846642069, 1637846642069),
(8, 'jp', '小さじ1', 'ニンニク', ' ', 1, 1637846642069, 1637846642069),
(8, 'th', '1 ช้อนชา', 'กระเทียม', ' ', 1, 1637846642069, 1637846642069),
(9, 'en', '2 tea spoon', 'Garlic', ' ', 1, 1637846660976, 1637846660976),
(9, 'jp', '小さじ2', 'ニンニク', ' ', 1, 1637846660976, 1637846660976),
(9, 'th', '2 ช้อนชา', 'กระเทียม', ' ', 1, 1637846660976, 1637846660976),
(10, 'en', '3 tea spoon', 'Garlic', ' ', 1, 1637846704280, 1637846704280),
(10, 'jp', '小さじ3', 'ニンニク', ' ', 1, 1637846704280, 1637846704280),
(10, 'th', '3 ช้อนชา', 'กระเทียม', ' ', 1, 1637846704280, 1637846704280),
(11, 'en', 'Level 0', 'Spiciness Level', ' ', 1, 1637847020782, 1637847020782),
(11, 'jp', 'レベル0 ', 'スパイシーさ', ' ', 1, 1637847020782, 1637847020782),
(11, 'th', 'ระดับ 0', 'ระดับความเผ็ด', ' ', 1, 1637847020782, 1637847020782),
(12, 'en', 'Level 1', 'Spiciness Level', ' ', 1, 1637847042406, 1637847042406),
(12, 'jp', 'レベル1 ', 'スパイシーさ', ' ', 1, 1637847042406, 1637847042406),
(12, 'th', 'ระดับ 1', 'ระดับความเผ็ด', ' ', 1, 1637847042406, 1637847042406),
(13, 'en', 'Level 2', 'Spiciness Level', ' ', 1, 1637847055476, 1637847055476),
(13, 'jp', 'レベル2 ', 'スパイシーさ', ' ', 1, 1637847055476, 1637847055476),
(13, 'th', 'ระดับ 2', 'ระดับความเผ็ด', ' ', 1, 1637847055476, 1637847055476),
(14, 'en', 'Level 3', 'Spiciness Level', ' ', 1, 1637847070372, 1637847070372),
(14, 'jp', 'レベル3 ', 'スパイシーさ', ' ', 1, 1637847070372, 1637847070372),
(14, 'th', 'ระดับ 3', 'ระดับความเผ็ด', ' ', 1, 1637847070372, 1637847070372),
(15, 'en', 'Level 4', 'Spiciness Level', ' ', 1, 1637847091113, 1637847091113),
(15, 'jp', 'レベル4 ', 'スパイシーさ', ' ', 1, 1637847091113, 1637847091113),
(15, 'th', 'ระดับ 4', 'ระดับความเผ็ด', ' ', 1, 1637847091113, 1637847091113),
(16, 'en', 'No', 'Chashu', ' ', 1, 1637847592756, 1637847592756),
(16, 'jp', '番号', '茶種', ' ', 1, 1637847592756, 1637847592756),
(16, 'th', 'ไม่เอา', 'หมูชาชู', ' ', 1, 1637847592756, 1637847592756),
(17, 'en', 'Lean Chashu', 'Chashu', ' ', 1, 1637847675575, 1637847675575),
(17, 'jp', 'リーンチャーシュー', '茶種', ' ', 1, 1637847675575, 1637847675575),
(17, 'th', 'ชาชูแบบไขมันน้อย', 'หมูชาชู', ' ', 1, 1637847675575, 1637847675575),
(18, 'en', 'Fatty Chashu', 'Chashu', ' ', 1, 1637848201407, 1637848201407),
(18, 'jp', 'それに固執', '茶種', ' ', 1, 1637848201407, 1637848201407),
(18, 'th', 'ติดมัน', 'หมูชาชู', ' ', 1, 1637848201407, 1637848201407),
(19, 'en', 'Level 0', 'Richness Level', ' ', 1, 1637849803885, 1637849803885),
(19, 'jp', 'レベル0 ', '豊かさのレベル ', ' ', 1, 1637849803885, 1637849803885),
(19, 'th', 'ระดับ 0', 'ระดับความเข้มข้น', ' ', 1, 1637849803885, 1637849803885),
(20, 'en', 'Level 1', 'Richness Level', ' ', 1, 1637849832595, 1637849832595),
(20, 'jp', 'レベル1', '豊かさのレベル ', ' ', 1, 1637849832595, 1637849832595),
(20, 'th', 'ระดับ 1', 'ระดับความเข้มข้น', ' ', 1, 1637849832595, 1637849832595),
(21, 'en', 'Level 2', 'Richness Level', ' ', 1, 1637849847410, 1637849847410),
(21, 'jp', 'レベル2', '豊かさのレベル ', ' ', 1, 1637849847410, 1637849847410),
(21, 'th', 'ระดับ 2', 'ระดับความเข้มข้น', ' ', 1, 1637849847410, 1637849847410),
(22, 'en', 'Extra Soft', 'Noodle', ' ', 1, 1637850329012, 1637850329012),
(22, 'jp', 'バリやわ', '麺', ' ', 1, 1637850329012, 1637850329012),
(22, 'th', 'เส้นนุ่มพิเศษ', 'เส้น', ' ', 1, 1637850329012, 1637850329012),
(23, 'en', 'Soft', 'Noodle', ' ', 1, 1637850370193, 1637850370193),
(23, 'jp', 'やわ ', '麺', ' ', 1, 1637850370193, 1637850370193),
(23, 'th', 'เส้นนุ่ม', 'เส้น', ' ', 1, 1637850370193, 1637850370193),
(24, 'en', 'Medium', 'Noodle', ' ', 1, 1637850456992, 1637850456992),
(24, 'jp', 'ふつう ', '麺', ' ', 1, 1637850456992, 1637850456992),
(24, 'th', 'เส้นนุ่มระดับกลาง', 'เส้น', ' ', 1, 1637850456992, 1637850456992),
(25, 'en', 'Firm', 'Noodle', ' ', 1, 1637850665925, 1637850665925),
(25, 'jp', '方麺', '麺', ' ', 1, 1637850665925, 1637850665925),
(25, 'th', 'เส้นแข็ง', 'เส้น', ' ', 1, 1637850665925, 1637850665925),
(26, 'en', 'Extra Firm', 'Noodle', ' ', 1, 1637850698134, 1637850698134),
(26, 'jp', 'ばり方', '麺', ' ', 1, 1637850698134, 1637850698134),
(26, 'th', 'เส้นแข็งพิเศษ', 'เส้น', ' ', 1, 1637850698134, 1637850698134);

INSERT INTO `main_menus` (`product_id`, `image_url`, `price`, `status`, `created_at`, `updated_at`) VALUES
(1, '/images/menus/1637853454028-Karaage.jpeg', 79.00, 1, 1637853454061, 1637853454061);
INSERT INTO `main_menus` (`product_id`, `image_url`, `price`, `status`, `created_at`, `updated_at`) VALUES
(2, '/images/menus/1637853559495-SpicyChashuSalad.jpeg', 119.00, 1, 1637853559566, 1637853559566);
INSERT INTO `main_menus` (`product_id`, `image_url`, `price`, `status`, `created_at`, `updated_at`) VALUES
(3, '/images/menus/1637853680335-SeaweedSalad.jpeg', 29.00, 1, 1637853680341, 1637853680341);
INSERT INTO `main_menus` (`product_id`, `image_url`, `price`, `status`, `created_at`, `updated_at`) VALUES
(4, '/images/menus/1637853801303-Gyoza.jpeg', 59.00, 1, 1637853801310, 1637853801310),
(5, '/images/menus/1637853875380-Edamame.png', 29.00, 1, 1637853875465, 1637853875465),
(6, '/images/menus/1637854061837-40e2af2bcb65d8a428bdc59a7222895a.jpg', 59.00, 1, 1637854061844, 1637854061844),
(7, '/images/menus/1637854230561-Takoyaki.jpeg', 79.00, 1, 1637854230581, 1637854230581),
(8, '/images/menus/1637854310998-TeriyakiChic.jpeg', 79.00, 1, 1637854311023, 1637854311023),
(9, '/images/menus/1637854805349-pudding.jpg', 59.00, 1, 1637854805355, 1637854805355),
(10, '/images/menus/1637854904786-Matchamoji.jpeg', 59.00, 1, 1637854904794, 1637854904794),
(11, '/images/menus/1637855126718-MatchaIcecream.jpeg', 79.00, 1, 1637855126723, 1637855126723),
(12, '/images/menus/1637855236769-VanillaIcecream.jpeg', 79.00, 1, 1637855236772, 1637855236772),
(13, '/images/menus/1637855309768-PannaCotta.jpeg', 79.00, 1, 1637855309802, 1637855309803),
(14, '/images/menus/1637855700260-HotGreentea.jpg', 25.00, 1, 1637855700269, 1637855700269),
(15, '/images/menus/1637855860174-Greentea.jpeg', 29.00, 1, 1637855860178, 1637855860178),
(16, '/images/menus/1637855941581-Coke.jpeg', 25.00, 1, 1637855941595, 1637855941595),
(17, '/images/menus/1637856006782-Cokezero.jpeg', 25.00, 1, 1637856006790, 1637856006790),
(18, '/images/menus/1637856070267-Water.jpeg', 10.00, 1, 1637856070272, 1637856070272),
(19, '/images/menus/1637883096001-Lean_Chashu.png', 29.00, 1, 1637883096056, 1637883096056),
(20, '/images/menus/1637883301085-Fatty_Chashu.png', 29.00, 1, 1637883301126, 1637883301126),
(21, '/images/menus/1637883406182-Spring_Onion.png', 5.00, 1, 1637883406218, 1637883406218),
(22, '/images/menus/1637884095911-Boiled_Egg.jpg', 10.00, 1, 1637884095926, 1637884095926),
(23, '/images/menus/1637884198895-Jewear_mushroom.jpg', 15.00, 1, 1637884198912, 1637884198912),
(24, '/images/menus/1637884296476-Seaweed.jpg', 10.00, 1, 1637884296491, 1637884296491),
(25, '/images/menus/1637884382593-Noodle.png', 15.00, 1, 1637884382696, 1637884382696),
(26, '/images/menus/1637884462022-Soup.png', 10.00, 1, 1637884462112, 1637884462112),
(27, '/images/menus/1637884701352-Tsukemen.jpeg', 185.00, 1, 1637884701367, 1637884701367),
(28, '/images/menus/1637884800100-TomYamKung.jpeg', 219.00, 1, 1637884800117, 1637884800117),
(29, '/images/menus/1637884963622-Zaru_Ramen.png', 98.00, 1, 1637884963641, 1637884963641),
(30, '/images/menus/1637885066320-Tantummen.jpeg', 139.00, 1, 1637885066329, 1637885066329);

INSERT INTO `order_menus` (`order_menu_id`, `order_id`, `product_id`, `ramen_id`, `quantity`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, 2, NULL, 1, 1638545041902, 1638545041902);
INSERT INTO `order_menus` (`order_menu_id`, `order_id`, `product_id`, `ramen_id`, `quantity`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(2, 2, NULL, 1, 1, '', 1, 1638545111465, 1638545111465);
INSERT INTO `order_menus` (`order_menu_id`, `order_id`, `product_id`, `ramen_id`, `quantity`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(3, 3, 1, NULL, 1, NULL, 1, 1638545162420, 1638545162420);
INSERT INTO `order_menus` (`order_menu_id`, `order_id`, `product_id`, `ramen_id`, `quantity`, `comment`, `status`, `created_at`, `updated_at`) VALUES
(4, 3, 3, NULL, 1, NULL, 1, 1638545162420, 1638545162420),
(5, 3, NULL, 2, 1, '', 1, 1638545162428, 1638545162428),
(6, 4, 4, NULL, 1, NULL, 1, 1638545220799, 1638545220799),
(7, 4, 7, NULL, 1, NULL, 1, 1638545220799, 1638545220799),
(8, 5, 9, NULL, 1, NULL, 1, 1638545286262, 1638545286262),
(9, 5, 12, NULL, 1, NULL, 1, 1638545286262, 1638545286262),
(10, 5, 13, NULL, 1, 'ไม่ใส่แยม', 1, 1638545286262, 1638545286262),
(11, 6, 7, NULL, 1, NULL, 1, 1638545397417, 1638545397417),
(12, 6, 29, NULL, 1, NULL, 1, 1638545397417, 1638545397417),
(13, 6, 30, NULL, 1, NULL, 1, 1638545397417, 1638545397417),
(14, 6, 12, NULL, 1, NULL, 1, 1638545397417, 1638545397417),
(15, 6, 22, NULL, 1, NULL, 1, 1638545397417, 1638545397417),
(16, 6, 17, NULL, 2, NULL, 1, 1638545397417, 1638545397417),
(17, 7, 6, NULL, 1, NULL, 1, 1638546094895, 1638546094895),
(18, 8, 1, NULL, 1, NULL, 1, 1638546709674, 1638546709674),
(19, 9, NULL, 3, 1, '', 1, 1638546733933, 1638546733933),
(20, 10, 1, NULL, 1, NULL, 1, 1638546754401, 1638546754401),
(21, 10, NULL, 4, 1, '', 1, 1638546754414, 1638546754414);

INSERT INTO `orders` (`order_id`, `bill_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'served', 1638545041895, 1638545936757);
INSERT INTO `orders` (`order_id`, `bill_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 'served', 1638545111443, 1638545123892);
INSERT INTO `orders` (`order_id`, `bill_id`, `status`, `created_at`, `updated_at`) VALUES
(3, 1, 'served', 1638545162414, 1638545184719);
INSERT INTO `orders` (`order_id`, `bill_id`, `status`, `created_at`, `updated_at`) VALUES
(4, 1, 'cancel', 1638545220787, 1638546055068),
(5, 1, 'served', 1638545286256, 1638545517767),
(6, 2, 'served', 1638545397405, 1638547347813),
(7, 1, 'served', 1638546094883, 1638547339066),
(8, 3, 'served', 1638546709659, 1638546764988),
(9, 3, 'cancel', 1638546733915, 1638546785700),
(10, 3, 'served', 1638546754396, 1638546767667);

INSERT INTO `ramen_choices` (`choice_id`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(1, '/images/choices/1637836882383-Shoyu.png', 1, 1637836882411, 1637836882411);
INSERT INTO `ramen_choices` (`choice_id`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(2, '/images/choices/1637836919834-Miso.png', 1, 1637836919869, 1637836919869);
INSERT INTO `ramen_choices` (`choice_id`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(3, '/images/choices/1637837537091-Tonkotsu.png', 1, 1637837537141, 1637837537141);
INSERT INTO `ramen_choices` (`choice_id`, `image_url`, `status`, `created_at`, `updated_at`) VALUES
(4, '/images/choices/1637837792600-Shio.png', 1, 1637837792613, 1637837792613),
(5, '/images/choices/1637838096391-Spring_Onion.png', 1, 1637838096395, 1637838096395),
(6, '/images/choices/1637838375818-Empty.png', 1, 1637838375821, 1637838375821),
(7, '/images/choices/1637846586639-Empty.png', 1, 1637846586645, 1637846586645),
(8, '/images/choices/1637846642055-1Spoon.png', 1, 1637846642059, 1637846642059),
(9, '/images/choices/1637846660963-2Spoon.png', 1, 1637846660971, 1637846660971),
(10, '/images/choices/1637846704265-3Spoon.png', 1, 1637846704268, 1637846704268),
(11, '/images/choices/1637847020756-Empty.png', 1, 1637847020761, 1637847020761),
(12, '/images/choices/1637847042391-Spicy1.png', 1, 1637847042394, 1637847042394),
(13, '/images/choices/1637847055466-Spicy2.png', 1, 1637847055469, 1637847055469),
(14, '/images/choices/1637847070356-Spicy3.png', 1, 1637847070359, 1637847070359),
(15, '/images/choices/1637847091098-OhMyGodItSoSpicy.png', 1, 1637847091101, 1637847091101),
(16, '/images/choices/1637847592731-Empty.png', 1, 1637847592736, 1637847592736),
(17, '/images/choices/1637847675532-Pork.png', 1, 1637847675562, 1637847675562),
(18, '/images/choices/1637848201385-Fatty_Pork.png', 1, 1637848201398, 1637848201398),
(19, '/images/choices/1637849803852-Empty.png', 1, 1637849803868, 1637849803868),
(20, '/images/choices/1637849832570-Rich.png', 1, 1637849832582, 1637849832582),
(21, '/images/choices/1637849847392-ItSoRich.png', 1, 1637849847397, 1637849847397),
(22, '/images/choices/1637850328958-Noodle.png', 1, 1637850328994, 1637850328994),
(23, '/images/choices/1637850370159-Noodle.png', 1, 1637850370186, 1637850370186),
(24, '/images/choices/1637850456960-Noodle.png', 1, 1637850456978, 1637850456978),
(25, '/images/choices/1637850665906-Noodle.png', 1, 1637850665913, 1637850665913),
(26, '/images/choices/1637850698112-Noodle.png', 1, 1637850698120, 1637850698120);

INSERT INTO `tables` (`table_id`, `guest_uid`, `reserve`, `call_waiter`, `status`, `created_at`, `updated_at`) VALUES
(1, 'b284341f-3e5e-4b3f-b9d0-fe4405032862', 1, 0, 1, 1638544567859, 1638544869943);
INSERT INTO `tables` (`table_id`, `guest_uid`, `reserve`, `call_waiter`, `status`, `created_at`, `updated_at`) VALUES
(2, '7d751ea0-6a8e-44d7-9529-6f13b560bca8', 1, 1, 1, 1638544569915, 1638545413935);
INSERT INTO `tables` (`table_id`, `guest_uid`, `reserve`, `call_waiter`, `status`, `created_at`, `updated_at`) VALUES
(3, '3c5949f0-584e-4322-9f14-9f1c4a1bde68', 1, 0, 1, 1638544572052, 1638546689998);
INSERT INTO `tables` (`table_id`, `guest_uid`, `reserve`, `call_waiter`, `status`, `created_at`, `updated_at`) VALUES
(4, 'fc8b7ce8-e0d7-4def-9b94-5b729744a007', 0, 0, 1, 1638544573345, 1638544573345),
(5, '343cf149-89fc-420c-8534-91b36f0a91f2', 0, 0, 1, 1638544574444, 1638544574444),
(6, '66354b07-bfba-4f94-831c-c3043b0ba985', 0, 0, 1, 1638544575501, 1638544575501),
(7, '58703e2c-e4b5-4494-bf79-57a6ee7b5e15', 0, 0, 1, 1638544576731, 1638544576731),
(8, '9f88267c-0283-44ab-87b3-2e013942d335', 0, 0, 1, 1638544577787, 1638544577787),
(9, 'f162eb2f-8901-4c22-a5a9-16903771700a', 0, 0, 1, 1638544578935, 1638544578935),
(10, '6d8e0f67-cb8c-4844-abb6-9cbddaad1917', 0, 0, 1, 1638544579997, 1638544579997),
(11, '9545ee11-fbe6-4038-92ab-134353a30c77', 0, 0, 1, 1638544580901, 1638544580901),
(12, '6724a3b9-6d04-4d46-be7e-63e7ef73c990', 0, 0, 1, 1638544581839, 1638544581839),
(13, 'ffefd6c1-19a7-482c-bc1b-db7a0389a1ec', 0, 0, 1, 1638544582795, 1638544582795),
(14, '10476c30-a84e-4741-9633-133b70308f4a', 0, 0, 1, 1638544583710, 1638544583710),
(15, 'aabdf096-b317-46e3-9570-ff671192c1ca', 0, 0, 1, 1638544584576, 1638544584576),
(16, '30c856c6-cb02-4281-ad54-af8dc8bf7e8d', 0, 0, 1, 1638544585467, 1638544585467),
(17, '426ab265-79b5-4b9e-bf8b-5d049b7c98dd', 0, 0, 1, 1638544586356, 1638544586356),
(18, '020a8b18-129d-4457-88c9-825621a56bc1', 0, 0, 1, 1638544587246, 1638544587246),
(19, '5aba8cb4-2ed9-4c1c-babb-e1ba2a6c99e4', 0, 0, 1, 1638544588111, 1638544588111),
(20, '2c0a1f01-e235-4e9c-bf8d-cfef357288c5', 0, 0, 1, 1638544588983, 1638544588983),
(21, 'df2e1478-203c-4ef6-9d3a-155e3246dcdf', 0, 0, 1, 1638544589907, 1638544589907),
(22, '3df909b3-631f-4e2f-9cf3-b28777b66308', 0, 0, 1, 1638544590800, 1638544590800),
(23, 'e2918eb3-38d5-4c8f-b442-dda43e13b36a', 0, 0, 1, 1638544598888, 1638544598888),
(24, '1ca97ee7-8eb8-4195-a5df-fba8dda9cfba', 0, 0, 1, 1638544599867, 1638544599867),
(25, '26cd677f-bee2-4c24-b4c5-f254a0e29349', 0, 0, 1, 1638544600683, 1638544600683),
(26, '8a344aa1-8e50-4b14-8869-daf841611b61', 0, 0, 1, 1638544601545, 1638544601545),
(27, 'a80106dc-9732-4357-a077-216e563f9294', 0, 0, 1, 1638544602424, 1638544602424),
(28, 'ef7c080a-3e15-4a6d-8708-25c756036a70', 0, 0, 1, 1638544603206, 1638544603206),
(29, 'c65f3456-11a6-495b-bd69-258bbc5366c6', 0, 0, 1, 1638544604032, 1638544604032),
(30, '05aad455-5433-49ad-a961-e1b3d6da99c7', 0, 0, 1, 1638544611737, 1638544611737);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;