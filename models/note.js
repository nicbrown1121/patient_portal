"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
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
  Note.init(
    {
      workerId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
