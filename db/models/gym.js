const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define("Gym", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Gym, {
    source: ["name"],
  });
  return Gym;
};
