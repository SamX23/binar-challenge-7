"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_game_history.belongsTo(models.User_game, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  User_game_history.init(
    {
      user_id: DataTypes.INTEGER,
      win: DataTypes.INTEGER,
      lose: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_game_history",
    }
  );

  return User_game_history;
};
