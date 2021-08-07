"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      player_one: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      player_two: {
        type: Sequelize.STRING,
        defaultValue: "Com",
      },
      result: {
        type: Sequelize.STRING,
        defaultValue: "Unfinished",
      },
      times: {
        type: Sequelize.STRING,
        defaultValue: "Unfinished",
      },
      room: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
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
    await queryInterface.dropTable("Games");
  },
};
