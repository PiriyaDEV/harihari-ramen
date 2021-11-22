const Menu = require("../models/menu.model");

exports.addMain = async (req, res) => {
  const menu = {
    image_url: req.body.image_url,
    price: req.body.price,
  };

  let info = req.body.info;

  try {
    let menuResult = await Menu.createMainMenu(menu);
    let infoArr = [];

    infoArr = info.map((info) => [
      menuResult.product_id,
      info.language,
      info.name,
      info.category,
      info.description,
      true,
      Date.now(),
      Date.now(),
    ]);

    let infoResult = await Menu.createInfoMainMenu(infoArr);

    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      name: infoResult.name,
      language: infoResult.inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addChoice = async (req, res) => {
  const choice = {
    image_url: req.body.image_url,
  };

  const info = req.body.info;

  try {
    let choiceResult = await Menu.createChoice(choice);
    let infoArr = [];

    infoArr = info.map((info) => [
      choiceResult.choice_id,
      info.language,
      info.name,
      info.category,
      info.description,
      true,
      Date.now(),
      Date.now(),
    ]);

    let infoResult = await Menu.createInfoChoice(infoArr);

    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      name: infoResult.name,
      language: infoResult.inserted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMainMenus = async (req, res) => {
  const base_url = process.env.BASE_URL;

  try {
    let result = await Menu.getMainMenus();

    result.map((menu) => (menu.image_url = `${base_url}${menu.image_url}`));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCustomRamen = async (req, res) => {
  const base_url = process.env.BASE_URL;

  try {
    let result = await Menu.getCustomRamen();

    result.map(
      (choice) => (choice.image_url = `${base_url}${choice.image_url}`)
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
