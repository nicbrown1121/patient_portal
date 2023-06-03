"use strict";
const { Model } = require("sequelize");
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
      date: DataTypes.DATE,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Assessment",
    }
  );
  return Assessment;
};
