"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    static associate(models) {
      Worker.hasMany(models.Assessment, {
        foreignKey: "workerId",
        as: "assessments",
      });
    }
  }
  Worker.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Worker",
    }
  );
  return Worker;
};
