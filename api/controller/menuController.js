const Menu = require("./../model/menuModel");

exports.getMenu = async function (req, res) {
  try {
    const menu = await Menu.find();
    res.status(200).json({
      status: "success",
      data: {
        menu: menu,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createMenu = async function (req, res) {
  try {
    const newMenu = await Menu.create(req.body);
    res.status(201).json({
      status: "success",
      menu: newMenu,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
