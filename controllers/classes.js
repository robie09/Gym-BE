const { Class, Type, User } = require("../db/models");

exports.fetchClass = async (classId, next) => {
  try {
    const classFound = await Class.findByPk(classId, {
      include: [
        {
          model: User,
          through: {
            attributes: [],
          },
          as: "users",
          attributes: ["id"],
        },
        {
          model: Gym,
          as: "gym",
          attributes: ["id", "name", "slug", "image"],
        },
        {
          model: Type,
          as: "type",
          attributes: ["id", "name"],
        },
      ],
    });
    return classFound;
  } catch (error) {
    next(error);
  }
};

exports.ClassList = async (req, res, next) => {
  try {
    const classes = await Class.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          through: {
            attributes: [],
          },
          as: "users",
          attributes: ["id"],
        },
      ],

      //type list
      include: {
        model: Type,
        as: "type",
        attributes: ["id"],
      },
    });
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};

exports.classDetail = async (req, res, next) => {
  res.status(200).json(req.class);
};

exports.classUpdate = async (req, res, next) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.class.update(req.body);
  res.status(200).json(req.class);
};

exports.classDelete = async (req, res, next) => {
  await req.class.destroy();
  res.status(204).end();
};

exports.classTypeCreate = async (req, res, next) => {
  try {
    const admin = await User.findAll({
      where: { isAdmin: true },
    });
    if (admin) {
      if (req.user.id === req.class.userId) {
        // coming from route params middleware
        req.body.classId = req.class.id;
        if (req.file)
          req.body.image = `http://${req.get("host")}/media/${
            req.file.filename
          }`;
        const newType = await Type.create(req.body);
        res.status(201).json(newType);
      }
    } else {
      next({
        status: 401,
        message: "You Are Not Allowed to Creat On this Class !",
      });
    }
  } catch (error) {
    next(error);
  }
};
