"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User_game extends Model {
    static associate(models) {
      User_game.hasMany(models.User_game_biodata, {
        foreignKey: "user_id",
      });
      User_game.hasMany(models.User_game_history, {
        foreignKey: "user_id",
      });
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword });
    };

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username,
        is_admin: this.is_admin,
      };
      const rahasia = "secretsamitoken";
      const token = jwt.sign(payload, rahasia);
      return token;
    };

    static authenticate = async ({ username, password }) => {
      try {
        const user = await this.findOne({ where: { username } });
        if (!user) return Promise.reject("User not found!");
        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong password");
        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  User_game.init(
    {
      user_id: DataTypes.INTEGER,
      username: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
          isLowercase: true,
          min: 4,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      is_admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User_game",
    }
  );

  return User_game;
};
