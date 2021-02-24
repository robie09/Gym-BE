const SequelizeSlugify = require("sequelize-slugify");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
    },

    numberOfSeats: {
      type: DataTypes.INTEGER,
    },

    bookedSeats: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },

    date: {
      type: DataTypes.DATEONLY,
    },

    time: {
      type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isAfter: moment().add(23, "hours").format("LT") },
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Class, {
    source: ["name"],
  });
  return Class;
};
