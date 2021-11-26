const Menu = require("../models/menu.model");

// add a new main menu to system
exports.addMain = async (req, res) => {
  // get menu info
  const menu = {
    image_url: req.body.image_url,
    price: req.body.price,
  };

  let info = req.body.info;

  try {
    // insert a main menu
    let menuResult = await Menu.createMainMenu(menu);
    let infoArr = [];

    // prepare menu info for multi-language
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

    // insert menu info
    let infoResult = await Menu.createInfoMainMenu(infoArr);

    // response the result
    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      name: infoResult.name,
      language: infoResult.inserted,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// add a custom ramen choice to system
exports.addChoice = async (req, res) => {
  // get custom ramen choice info
  const choice = {
    image_url: req.body.image_url,
  };

  const info = req.body.info;

  try {
    // insert a custom ramen choice
    let choiceResult = await Menu.createChoice(choice);
    let infoArr = [];

    // prepare custom ramen choice info for multi-language
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

    // insert custom ramen choice info
    let infoResult = await Menu.createInfoChoice(infoArr);

    // response the result
    return res.status(201).json({
      success: true,
      message: "Created Successfully",
      name: infoResult.name,
      language: infoResult.inserted,
    });
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all main menus
exports.getMainMenus = async (req, res) => {
  // base url for menu image
  const base_url = process.env.BASE_URL;

  try {
    // get data
    let result = await Menu.getMainMenus();

    // add base url to image path
    result.map((menu) => (menu.image_url = `${base_url}${menu.image_url}`));

    // response the result
    return res.status(200).json(result);
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all custom ramen choice details
exports.getCustomRamen = async (req, res) => {
  // base url for custom ramen choice image
  const base_url = process.env.BASE_URL;

  try {
    // get data
    let result = await Menu.getCustomRamen();

    // add base url to image path
    result.map(
      (choice) => (choice.image_url = `${base_url}${choice.image_url}`)
    );

    // response the result
    return res.status(200).json(result);
  } catch (error) {
    // return if error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
