"use strict";
const { Model } = require("sequelize");
// const Patient = require("./patient");

module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    static associate(models) {
      // Each Assessment belongs to a Patient. The foreignKey tells Sequelize
      // that the 'patientId' column in the Assessment model is the foreign key
      // for this relationship. 'as' creates an alias for the relationship
      this.belongsTo(models.Patient, {
        foreignKey: "patientId",
        as: "patient",
      });
      this.belongsTo(models.Worker, {
        foreignKey: "workerId",
        as: "worker",
      });
    }
  }
  Assessment.init(
    {
      patientId: DataTypes.INTEGER,
      workerId: DataTypes.INTEGER,
      medicalHistory: DataTypes.ARRAY(DataTypes.STRING),
      frameSize: DataTypes.ENUM("small", "medium", "large"),
      weightTrend: DataTypes.ENUM("loss", "stable", "gain"),
      acutePOIntake: DataTypes.ENUM(
        ">75% of needs",
        "<= 75% of needs",
        "<50% of needs"
      ),
      muscleMass: DataTypes.ENUM(
        "No depletion",
        "Mild depletion in 1-3 areas",
        "Moderate depletion in 1-3 areas",
        "Severe depletion in 1-3 areas"
      ),
      fatMass: DataTypes.ENUM(
        "No depletion",
        "Mild depletion in 1-3 areas",
        "Moderate depletion in 1-3 areas",
        "Severe depletion in 1-3 areas"
      ),
      hospitalizedLast30Days: DataTypes.ENUM("Yes", "No"),
      skinIntegrity: DataTypes.STRING,
      comment: DataTypes.STRING,
      recommendations: DataTypes.STRING,
      date: DataTypes.DATE,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Assessment",
    }
  );

  // Assessment.afterCreate(async (assessment) => {
  //   console.log("in afterUPDATEEEEEE");
  //   if (assessment.completed) {
  //     const patient = await Patient.modelManager.Model.Patient.findOne({
  //       where: {
  //         id: assessment.patientId,
  //       },
  //     });

  //     if (patient) {
  //       await patient.update({ seen: true });
  //     }
  //   }
  // });
  return Assessment;
};
