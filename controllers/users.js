const { User, Class } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.fetchUser = async (userId, next) => {
  try {
    const userFound = await Gym.findByPk(userId, {
      include: [
        {
          model: Class,
          through: {
            attributes: [],
          },
          as: "classes",
          attributes: ["id"],
        },
      ],
    });
    return userFound;
  } catch (error) {
    next(error);
  }
};
exports.signup = async (req, res, next) => {
  const saltRounds = 10;

  try {
    console.log(req.body);
    console.log("Hi");
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    console.log("Req body", req.body);
    const user = await User.create(req.body);
    const payload = {
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    console.log("payload", payload);
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS, /// in milli-seconds
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.userList = async (req, res, next) => {
  try {
    const classes = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Class,
          through: {
            attributes: [],
          },
          as: "classes",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};
