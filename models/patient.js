"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.hasMany(models.Assessment, {
        foreignKey: "patientId",
        as: "assessments",
      });
    }
  }
  Patient.init(
    {
      name: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      dateOfAdmission: DataTypes.DATE,
      location: DataTypes.STRING,
      diagnosis: DataTypes.STRING,
      seen: DataTypes.BOOLEAN,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      dietOrder: DataTypes.STRING,
      fluidRestriction: DataTypes.INTEGER,
      reassessmentDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
