"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_game_biodata.belongsTo(models.User_game, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  User_game_biodata.init(
    {
      user_id: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User_game_biodata",
    }
  );

  return User_game_biodata;
};
