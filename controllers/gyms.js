const { Class, Gym, User } = require("../db/models");

exports.fetchGym = async (gymId, next) => {
  try {
    const gyms = await Gym.findByPk(gymId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.json(gyms);
    return gyms;
  } catch (error) {
    next(error);
  }
};

exports.gymList = async (req, res, next) => {
  try {
    const gyms = await Gym.findAll({
      attributes: req.body,

      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.status(200).json(gyms);
  } catch (error) {
    next(error);
  }
};

exports.classCreate = async (req, res, next) => {
  try {
    console.log("Hiiiiiiiiiii");
    req.body.gymId = req.gym.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newClass = await Class.create(req.body);
    console.log(newClass);
    res.status(201).json(newClass);

    next({
      status: 401,
      message: "You Are Not Allowed to Creat On this Class !",
    });
  } catch (error) {
    next(error);
  }
};

exports.gymCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (error) {
    next(error);
  }
};
