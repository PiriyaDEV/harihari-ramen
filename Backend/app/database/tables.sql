-- Hari Hari Ramen Database Tables --

-- Create Tables Table
CREATE TABLE IF NOT EXISTS tables(
  table_id                INT             NOT NULL  AUTO_INCREMENT,
  guest_uid               VARCHAR(36)     NOT NULL  UNIQUE,
  reserve                 BOOLEAN         NOT NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (table_id)
);

-- Create Bills Table
CREATE TABLE IF NOT EXISTS bills(
  bill_id                 INT             NOT NULL  AUTO_INCREMENT,
  table_id                INT             NOT NULL,
  subtotal                DECIMAL(12,2)   NOT NULL,
  status                  BOOLEAN         NOT NULL,
  checkout_at             BIGINT          NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (bill_id)
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders(
  order_id                INT             NOT NULL  AUTO_INCREMENT,
  bill_id                 INT             NOT NULL,
  status                  VARCHAR(10)     NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (order_id)
);

-- Create Order_menus Table
CREATE TABLE IF NOT EXISTS order_menus(
  order_menu_id           INT             NOT NULL  AUTO_INCREMENT,
  order_id                INT             NOT NULL,
  product_id              INT             NULL,
  ramen_id                INT             NULL,
  quantity                INT             NOT NULL,
  comment                 VARCHAR(255)    NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (order_menu_id)
);

-- Create Main_menus Table
CREATE TABLE IF NOT EXISTS main_menus(
  product_id              INT             NOT NULL  AUTO_INCREMENT,
  image_url               VARCHAR(255)    NOT NULL,
  price                   DECIMAL(12,2)   NOT NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (product_id)
);

-- Create Info_main_menus Table
CREATE TABLE IF NOT EXISTS info_main_menus(
  product_id              INT             NOT NULL,
  language                VARCHAR(2)      NOT NULL,
  name                    VARCHAR(255)    NOT NULL,
  category                VARCHAR(255)    NOT NULL,
  description             VARCHAR(255)    NOT NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (product_id, language)
);

-- Create Custom_ramens Table
CREATE TABLE IF NOT EXISTS custom_ramens(
  ramen_id                INT             NOT NULL AUTO_INCREMENT,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (ramen_id)
);

-- Create Custom_ramen_details Table
CREATE TABLE IF NOT EXISTS custom_ramen_details(
  ramen_id                INT             NOT NULL,
  choice_id               INT             NOT NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (ramen_id, choice_id)
);

-- Create Ramen_choices Table
CREATE TABLE IF NOT EXISTS ramen_choices(
  choice_id               INT             NOT NULL  AUTO_INCREMENT,
  image_url               VARCHAR(255)    NOT NULL,
  price                   DECIMAL(12,2)   NOT NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (choice_id)
);

-- Create Info_ramen_choices Table
CREATE TABLE IF NOT EXISTS info_ramen_choices(
  choice_id               INT             NOT NULL,
  language                VARCHAR(2)      NOT NULL,
  name                    VARCHAR(255)    NOT NULL,
  category                VARCHAR(255)    NOT NULL,
  description             VARCHAR(255)    NOT NULL,
  status                  BOOLEAN         NOT NULL,
  created_at              BIGINT          NOT NULL,
  updated_at              BIGINT          NOT NULL,
  PRIMARY KEY (choice_id, language)
);