"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// class and type Relations 1=>M

db.Type.hasMany(db.Class, { foreignKey: "typeId", as: "classes" });
db.Class.belongsTo(db.Type, { foreignKey: "typeId", as: "type" });

// user and class Relations M=>M

//User-Classes
db.User.belongsToMany(db.Class, {
  through: "User-Classes",
  foreignKey: "userId",
  as: "classes",
});
db.Class.belongsToMany(db.User, {
  through: "User-Classes",
  foreignKey: "classId",
  as: "users",
});

// gym and class Relations 1=>M

db.Gym.hasMany(db.Class, { foreignKey: "gymId", as: "classes" });
db.Type.belongsTo(db.Gym, { foreignKey: "gymId", as: "gym" });
