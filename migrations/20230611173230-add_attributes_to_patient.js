"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Patients", "height", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Patients", "weight", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Patients", "dietOrder", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Patients", "fluidRestriction", {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Patients", "height");
    await queryInterface.removeColumn("Patients", "weight");
    await queryInterface.removeColumn("Patients", "dietOrder");
    await queryInterface.removeColumn("Patients", "fluidRestriction");
  },
};
