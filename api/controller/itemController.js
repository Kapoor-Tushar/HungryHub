const Item = require("./../model/ItemModel");

exports.getAllItem = async function (req, res) {
  try {
    const items = await Item.find();
    res.status(200).json({
      status: "success",
      results: items.length,
      data: {
        items: items,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createItem = async function (req, res) {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json({
      status: "success",
      item: newItem,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
