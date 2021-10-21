const Menu = require("../models/menu.model");

exports.addMain = async (req, res) => {
  let menu = {
    image_url: req.body.image_url,
    price: req.body.price,
    status: true,
  }

  let info = req.body.info;

  try {
    let menuResult = await Menu.createMainMenu(menu);

    info.forEach((info) => {
      info.product_id = menuResult.product_id;
      info.status = true;
    })
    
    let infoResult = await Menu.createInfoMainMenu(info);
    
    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      name: menuResult.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  return res.send(req.body);
};

exports.addChoice = async (req, res) => {
  return res.send(req.body);
};
