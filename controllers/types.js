const { Type, Class, User } = require("../db/models");

exports.fetchType = async (typeId, next) => {
  try {
    const typeFound = await Type.findByPk(typeId);
    if (typeFound) return typeFound;
    else next({ message: "This Type does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.typeList = async (req, res, next) => {
  try {
    const types = await Product.findAll({
      attributes: { exclude: ["classId", "createdAt", "updatedAt"] },
      include: {
        model: Class,
        as: "class",
        attributes: ["id"],
      },
    });
    res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};
exports.typeDetail = async (req, res, next) => {
  res.status(200).json(req.type);
};

exports.typeDelete = async (req, res, next) => {
  res.status(200).json(req.type);
};

exports.typeUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.type.update(req.body);
  res.status(200).json(req.type);
};

exports.typeDelete = async (req, res, next) => {
  await req.type.destroy();
  res.status(204).end();
  console.log("This Type Deleting!");
};
