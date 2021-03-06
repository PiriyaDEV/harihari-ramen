-- Hari Hari Ramen Database Foreign Keys --

-- Add Foreign Key To Bills Table
ALTER TABLE bills
  ADD FOREIGN KEY (table_id)    REFERENCES tables(table_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Orders Table
ALTER TABLE orders
  ADD FOREIGN KEY (bill_id)     REFERENCES bills(bill_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Order_menus Table
ALTER TABLE order_menus
  ADD FOREIGN KEY (order_id)    REFERENCES orders(order_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (product_id)  REFERENCES main_menus(product_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (ramen_id)    REFERENCES custom_ramens(ramen_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Info_main_menus Table
ALTER TABLE info_main_menus
  ADD FOREIGN KEY (product_id)  REFERENCES main_menus(product_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Custom_ramens Table
ALTER TABLE custom_ramens
  ADD FOREIGN KEY (soup_type)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (noodle)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (spring_onion)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (garlic)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (spice)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (chashu)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  ADD FOREIGN KEY (richness)  REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Info_ramen_choices Table
ALTER TABLE info_ramen_choices
  ADD FOREIGN KEY (choice_id)   REFERENCES ramen_choices(choice_id)
    ON UPDATE CASCADE ON DELETE CASCADE;