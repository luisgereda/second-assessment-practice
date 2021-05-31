"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      space.hasMany(models.story);
      space.belongsTo(models.user);
    }
  }
  space.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      backgroundColor: { type: DataTypes.STRING, defaultValue: "#ffffff" },
      color: { type: DataTypes.STRING, defaultValue: "#000000" },
    },
    {
      sequelize,
      modelName: "space",
    }
  );
  return space;
};
