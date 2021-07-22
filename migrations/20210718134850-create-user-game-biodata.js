"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User_game_biodata", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "User_games",
          key: "id",
          as: "user_id",
        },
      },
      full_name: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User_game_biodata");
  },
};
