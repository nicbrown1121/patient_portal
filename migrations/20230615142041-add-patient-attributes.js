"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Assessments", "medicalHistory", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "frameSize", {
      type: Sequelize.ENUM("small", "medium", "large"),
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "weightTrend", {
      type: Sequelize.ENUM("loss", "stable", "gain"),
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "acutePOIntake", {
      type: Sequelize.ENUM(">75% of needs", "<= 75% of needs", "<50% of needs"),
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "muscleMass", {
      type: Sequelize.ENUM(
        "No depletion",
        "Mild depletion in 1-3 areas",
        "Moderate depletion in 1-3 areas",
        "Severe depletion in 1-3 areas"
      ),
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "fatMass", {
      type: Sequelize.ENUM(
        "No depletion",
        "Mild depletion in 1-3 areas",
        "Moderate depletion in 1-3 areas",
        "Severe depletion in 1-3 areas"
      ),
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "hospitalizedLast30Days", {
      type: Sequelize.ENUM("Yes", "No"),
      allowNull: true,
    });

    await queryInterface.addColumn("Assessments", "skinIntegrity", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Assessments", "comment", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Assessments", "recommendations", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Assessments", "medicalHistory");
    await queryInterface.removeColumn("Assessments", "frameSize");
    await queryInterface.removeColumn("Assessments", "weightTrend");
    await queryInterface.removeColumn("Assessments", "acutePOIntake");
    await queryInterface.removeColumn("Assessments", "muscleMass");
    await queryInterface.removeColumn("Assessments", "fatMass");
    await queryInterface.removeColumn("Assessments", "hospitalizedLast30Days");
    await queryInterface.removeColumn("Assessments", "skinIntegrity");
    await queryInterface.removeColumn("Assessments", "comment");
    await queryInterface.removeColumn("Assessments", "recommendations");
  },
};
