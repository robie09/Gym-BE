const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Type", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  });
  SequelizeSlugify.slugifyModel(Type, {
    source: ["name"],
  });
  return Type;
};
